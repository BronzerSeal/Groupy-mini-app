"use server"

import prisma from "@/utils/prisma"
import { COLORS as CATEGORY_COLORS } from "../consts/colors"
import { getCurrentMonthRange } from "./get-current-month-range"

export type CategoryBreakdown = {
  category: string
  amount: number
  color: string
  subcategories: {
    name: string
    amount: number
  }[]
}

type GetTransactionsSuccess = {
  status: "success"
  code: 200
  transactions: CategoryBreakdown[]
}

type GetTransactionsError = {
  status: "error"
  message: string
}

export type GetTransactionsResponse =
  | GetTransactionsSuccess
  | GetTransactionsError

export const getTransactions = async (
  userId: string
): Promise<GetTransactionsResponse> => {
  try {
    const { monthStart, nextMonthStart } = getCurrentMonthRange()

    const transactions = await (prisma.transaction.findMany as any)({
      where: {
        userId,
        type: "expense",
        createdAt: {
          gte: monthStart,
          lt: nextMonthStart,
        },
      },
      select: {
        category: true,
        merchant: true,
        merchantInfo: true,
        amount: true,
      },
    })

    const breakdownMap = new Map<
      string,
      {
        amount: number
        merchants: Map<string, number>
      }
    >()

    transactions.forEach(
      (transaction: {
        category: string
        merchant: string
        merchantInfo?: string | null
        amount: number
      }) => {
        const categoryName = transaction.category || "Other"
        const merchantName =
          transaction.merchant?.trim() ||
          transaction.merchantInfo?.trim() ||
          "Unknown payment"

        const categoryEntry = breakdownMap.get(categoryName) ?? {
          amount: 0,
          merchants: new Map<string, number>(),
        }

        categoryEntry.amount += transaction.amount
        categoryEntry.merchants.set(
          merchantName,
          (categoryEntry.merchants.get(merchantName) ?? 0) + transaction.amount
        )

        breakdownMap.set(categoryName, categoryEntry)
      }
    )

    const categoryBreakdowns: CategoryBreakdown[] = Array.from(
      breakdownMap.entries()
    )
      .map(([category, data], index) => ({
        category,
        amount: data.amount,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
        subcategories: Array.from(data.merchants.entries())
          .map(([name, amount]) => ({
            name,
            amount,
          }))
          .sort((a, b) => b.amount - a.amount),
      }))
      .sort((a, b) => b.amount - a.amount)

    return {
      status: "success",
      code: 200,
      transactions: categoryBreakdowns,
    }
  } catch (error) {
    console.error("Error getting user transactions:", error)

    return {
      status: "error",
      message: `Error getting user transactions: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

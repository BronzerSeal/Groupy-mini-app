"use server"

import prisma from "@/utils/prisma"

export type MonthComparison = {
  category: string
  thisMonth: number
  lastMonth: number
}

type GetAmountComparisonSuccess = {
  status: "success"
  code: 200
  comparisons: MonthComparison[]
}

type GetAmountComparisonError = {
  status: "error"
  message: string
}

export type GetAmountComparisonResponse =
  | GetAmountComparisonSuccess
  | GetAmountComparisonError

const getMonthComparisonRange = () => {
  const now = new Date()
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  return {
    thisMonthStart,
    nextMonthStart,
    lastMonthStart,
  }
}

export const getAmountComparison = async (
  userId: string
): Promise<GetAmountComparisonResponse> => {
  try {
    const { thisMonthStart, nextMonthStart, lastMonthStart } =
      getMonthComparisonRange()

    const comparisons = await (prisma.transaction.findMany as any)({
      where: {
        userId,
        type: "expense",
        createdAt: {
          gte: lastMonthStart,
          lt: nextMonthStart,
        },
      },
      select: {
        category: true,
        amount: true,
        createdAt: true,
      },
    })

    const comparisonsMap = new Map<string, MonthComparison>()

    comparisons.forEach(
      (transaction: {
        category: string
        amount: number
        createdAt: Date
      }) => {
        const categoryName = transaction.category || "Other"
        const entry = comparisonsMap.get(categoryName) ?? {
          category: categoryName,
          thisMonth: 0,
          lastMonth: 0,
        }

        if (transaction.createdAt >= thisMonthStart) {
          entry.thisMonth += transaction.amount
        } else {
          entry.lastMonth += transaction.amount
        }

        comparisonsMap.set(categoryName, entry)
      }
    )

    return {
      status: "success",
      code: 200,
      comparisons: Array.from(comparisonsMap.values()).sort(
        (a, b) =>
          b.thisMonth + b.lastMonth - (a.thisMonth + a.lastMonth)
      ),
    }
  } catch (error) {
    console.error("Error getting comparisons:", error)

    return {
      status: "error",
      message: `Error getting comparisons: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

"use server"

import { FullTransaction } from "@/shared/types/db.types"
import prisma from "@/utils/prisma"

export type TransactionFilters = {
  search?: string
  category?: string
  status?: "all" | FullTransaction["status"]
  type?: "all" | FullTransaction["type"]
}

type GetUserTransactionsSuccess = {
  status: "success"
  code: 200
  transactions: FullTransaction[]
  nextCursor: string | undefined
}

type GetUserTransactionsError = {
  status: "error"
  message: string
  transactions: []
}

type GetUserTransactionsResponse =
  | GetUserTransactionsSuccess
  | GetUserTransactionsError

const RES_SIZE = 12

const buildTransactionWhere = (
  userId: string,
  filters?: TransactionFilters
) => {
  const search = filters?.search?.trim()

  return {
    userId,
    ...(filters?.category &&
      filters.category !== "all" && {
        category: filters.category,
      }),
    ...(filters?.status &&
      filters.status !== "all" && {
        status: filters.status,
      }),
    ...(filters?.type &&
      filters.type !== "all" && {
        type: filters.type,
      }),
    ...(search && {
      OR: [
        { merchant: { contains: search, mode: "insensitive" as const } },
        { transactionId: { contains: search, mode: "insensitive" as const } },
        { category: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  }
}

export const GetUserTransactionsById = async (
  userId: string,
  options?: {
    cursor?: string
    filters?: TransactionFilters
  }
): Promise<GetUserTransactionsResponse> => {
  try {
    const transactions = await (prisma.transaction.findMany as any)({
      where: buildTransactionWhere(userId, options?.filters),

      take: RES_SIZE + 1,

      ...(options?.cursor && {
        cursor: {
          id: options.cursor,
        },
        skip: 1,
      }),

      orderBy: {
        createdAt: "desc",
      },
    })

    let nextCursor: string | undefined = undefined

    if (transactions.length > RES_SIZE) {
      const nextItem = transactions.pop()
      nextCursor = nextItem?.id
    }

    return {
      status: "success",
      code: 200,
      transactions,
      nextCursor,
    }
  } catch (error) {
    return {
      status: "error",
      message: `Error: ${error instanceof Error ? error.message : error}`,
      transactions: [],
    }
  }
}

export const GetUserTransactionCategories = async (userId: string) => {
  try {
    const categories = await (prisma.transaction.findMany as any)({
      where: {
        userId,
      },
      distinct: ["category"],
      select: {
        category: true,
      },
      orderBy: {
        category: "asc",
      },
    })

    return {
      status: "success" as const,
      categories: categories.map((item: { category: string }) => item.category),
    }
  } catch (error) {
    return {
      status: "error" as const,
      message: `Error: ${error instanceof Error ? error.message : error}`,
      categories: [] as string[],
    }
  }
}

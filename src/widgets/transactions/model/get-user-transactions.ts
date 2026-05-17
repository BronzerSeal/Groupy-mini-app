"use server"

import { AccountCard } from "@/shared/types/db.types"
import prisma from "@/utils/prisma"

type GetUserTransactionsSuccess = {
  status: "success"
  code: 200
  transactions: AccountCard[]
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

export const GetUserTransactionsById = async (
  userId: string,
  cursor?: string
): Promise<GetUserTransactionsResponse> => {
  try {
    const transactions = await (prisma.transaction.findMany as any)({
      where: {
        userId,
      },

      take: RES_SIZE + 1,

      ...(cursor && {
        cursor: {
          id: cursor,
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

"use server"

import prisma from "@/utils/prisma"

type GetUserBalanceSuccess = {
  status: "success"
  code: 200
  balance: number
}

type GetUserBalanceError = {
  status: "error"
  message: string
}

export type GetUserBalanceResponse = GetUserBalanceSuccess | GetUserBalanceError

export const getUserBalanceById = async (
  userId: string
): Promise<GetUserBalanceResponse> => {
  try {
    const result = await (prisma.card.aggregate as any)({
      where: {
        userId,
      },
      _sum: {
        balance: true,
      },
    })

    return {
      status: "success",
      code: 200,
      balance: result._sum.balance ?? 0,
    }
  } catch (error) {
    console.error("Error getting user balance:", error)

    return {
      status: "error",
      message: `Error getting user balance: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

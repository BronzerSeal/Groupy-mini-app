"use server"

import prisma from "@/utils/prisma"

type GetUserSuccess = {
  status: "success"
  code: 200
}

type GetUserError = {
  status: "error"
  message: string
}

export type GetUserResponse = GetUserSuccess | GetUserError

export const IncreaseUserBalance = async (
  userId: string,
  cardId: string,
  amount: number
): Promise<GetUserResponse> => {
  try {
    await prisma.card.update({
      where: {
        id: cardId,
        userId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    })
    return { code: 200, status: "success" }
  } catch (error) {
    console.error("Error updating balance:", error)
    return {
      status: "error",
      message: `Error updating balance: ${error instanceof Error ? error.message : error}`,
    }
  }
}

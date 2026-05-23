"use server"

import prisma from "@/utils/prisma"

type GetUserSuccess = {
  status: "success"
  code: 200
  cards: {
    id: string
    label: string
    balance: number
  }[]
}

type GetUserError = {
  status: "error"
  message: string
}

export type GetUserResponse = GetUserSuccess | GetUserError

export const GetUserCardsByUserId = async (
  userId: string
): Promise<GetUserResponse> => {
  try {
    const cardsName = await (prisma.card.findMany as any)({
      where: {
        userId,
      },
      select: {
        id: true,
        label: true,
        balance: true,
      },
    })
    return { code: 200, status: "success", cards: cardsName }
  } catch (error) {
    console.error("Error finding cards:", error)
    return {
      status: "error",
      message: `Error finding cards: ${error instanceof Error ? error.message : error}`,
    }
  }
}

"use server"

import { AccountCard } from "@/shared/types/db.types"
import prisma from "@/utils/prisma"

type GetUserCardsSuccess = {
  status: "success"
  code: 200
  cards: AccountCard[]
}

type GetUserCardsError = {
  status: "error"
  message: string
}

export type GetUserCardsResponse = GetUserCardsSuccess | GetUserCardsError

export const GetUserCardsById = async (
  userId: number
): Promise<GetUserCardsResponse> => {
  try {
    const accountCards = await (prisma.card.findMany as any)({
      where: {
        userId,
      },
    })
    return { code: 200, status: "success", cards: accountCards }
  } catch (error) {
    console.error("Error finding user cards:", error)
    return {
      status: "error",
      message: `Error finding user cards: ${error instanceof Error ? error.message : error}`,
    }
  }
}

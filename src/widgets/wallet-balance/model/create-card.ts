"use server"

import prisma from "@/utils/prisma"
import { CardVariant } from "../consts/cardStyles"

export type CreateCardInput = {
  label: string
  balance: number
  currency: string
  last4: string
  variant: CardVariant
  userId: number
}

type CreateCardSuccess = {
  status: "success"
  code: 200
  card: CreateCardInput
}

type CreateCardError = {
  status: "error"
  message: string
}

export type CreateCardResponse = CreateCardSuccess | CreateCardError

export const CreateCard = async (
  card: CreateCardInput
): Promise<CreateCardResponse> => {
  try {
    const newCard = await prisma.card.create({
      data: card,
    })
    return { code: 200, status: "success", card: newCard }
  } catch (error) {
    console.error("Error creating card:", error)
    return {
      status: "error",
      message: `Error creating card: ${error instanceof Error ? error.message : error}`,
    }
  }
}

"use server"

import prisma from "@/utils/prisma"
import { RecentRecipientDto, recentRecipientsSelect } from "./types"

type GetUserRecepientsSuccess = {
  status: "success"
  code: 200
  recepients: RecentRecipientDto[]
}

type GetUserRecepientsError = {
  status: "error"
  message: string
}

export type GetUserRecepientsResponse =
  | GetUserRecepientsSuccess
  | GetUserRecepientsError

export const getUserRecepientsById = async (
  userId: string
): Promise<GetUserRecepientsResponse> => {
  try {
    const recepients = await (prisma.recentRecipient.findMany as any)({
      where: {
        senderId: userId,
      },

      ...recentRecipientsSelect,

      take: 6,
    })

    return {
      status: "success",
      code: 200,
      recepients,
    }
  } catch (error) {
    console.error("Error getting user recepients:", error)

    return {
      status: "error",
      message: `Error getting user recepients: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

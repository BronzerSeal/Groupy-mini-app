"use server"

import prisma from "@/utils/prisma"
import { Recipient, recipientSelect } from "./types"

type GetUserRecepientsSuccess = {
  status: "success"
  code: 200
  recepients: Recipient[]
  nextCursor: string | undefined
}

type GetUserRecepientsError = {
  status: "error"
  message: string
  recepients: []
}

export type GetUserRecepientsResponse =
  | GetUserRecepientsSuccess
  | GetUserRecepientsError

export const getUserRecepientsById = async (
  userId: string,
  options?: {
    cursor?: string
  }
): Promise<GetUserRecepientsResponse> => {
  const RES_SIZE = 10
  try {
    const recepients = await (prisma.recentRecipient.findMany as any)({
      where: {
        senderId: userId,
      },
      select: { ...recipientSelect },
      orderBy: {
        sendCount: "desc",
      },

      take: RES_SIZE + 1,

      ...(options?.cursor && {
        cursor: {
          id: options.cursor,
        },
        skip: 1,
      }),
    })

    let nextCursor: string | undefined = undefined

    if (recepients.length > RES_SIZE) {
      const nextItem = recepients.pop()
      nextCursor = nextItem?.id
    }

    return {
      status: "success",
      code: 200,
      recepients,
      nextCursor,
    }
  } catch (error) {
    console.error("Error getting user balance:", error)

    return {
      status: "error",
      message: `Error getting user balance: ${
        error instanceof Error ? error.message : String(error)
      }`,
      recepients: [],
    }
  }
}

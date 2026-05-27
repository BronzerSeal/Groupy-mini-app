"use server"

import prisma from "@/utils/prisma"
import { ChatMessage } from "./types"

type GetChatMessagesSuccess = {
  status: "success"
  code: 200
  messages: ChatMessage[]
}

type GetChatMessagesError = {
  status: "error"
  message: string
}

export type GetChatMessagesResponse =
  | GetChatMessagesSuccess
  | GetChatMessagesError

export const getChatMessages = async (
  userId: string
): Promise<GetChatMessagesResponse> => {
  try {
    const messages = await (prisma.chatMessage.findMany as any)({
      where: {
        userId,
      },
    })

    return {
      status: "success",
      code: 200,
      messages,
    }
  } catch (error) {
    console.error("Error getting chat messages:", error)

    return {
      status: "error",
      message: `Error getting chat messages: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

"use server"

import prisma from "@/utils/prisma"
import { ChatMessage } from "./types"

type CreateChatMessageSuccess = {
  status: "success"
  code: 200
  message: ChatMessage
}

type CreateChatMessageError = {
  status: "error"
  message: string
}

export type CreateChatMessageResponse =
  | CreateChatMessageSuccess
  | CreateChatMessageError

export const CreateChatMessage = async (
  userId: string,
  sender: "user" | "bot",
  text: string
): Promise<CreateChatMessageResponse> => {
  try {
    const message = await (prisma.chatMessage.create as any)({
      data: {
        userId,
        sender,
        text,
      },
    })

    return {
      status: "success",
      code: 200,
      message,
    }
  } catch (error) {
    console.error("Error creating chat message:", error)

    return {
      status: "error",
      message: `Error creating chat message: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

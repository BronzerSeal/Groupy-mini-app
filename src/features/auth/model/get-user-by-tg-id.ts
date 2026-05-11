"use server"

import { UserFromDB } from "@/shared/types/db.types"
import prisma from "@/utils/prisma"

type GetUserSuccess = {
  status: "success"
  code: 200
  user: UserFromDB
}

type GetUserError = {
  status: "error"
  message: string
}

export type GetUserResponse = GetUserSuccess | GetUserError

export const GetUserInfoById = async (
  userId: number
): Promise<GetUserResponse> => {
  try {
    const user = await (prisma.user.findUnique as any)({
      where: {
        tgId: userId,
      },
    })
    return { code: 200, status: "success", user }
  } catch (error) {
    console.error("Error finding user:", error)
    return {
      status: "error",
      message: `Error finding user: ${error instanceof Error ? error.message : error}`,
    }
  }
}

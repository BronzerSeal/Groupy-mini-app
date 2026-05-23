"use server"

import { Prisma } from "@/generated/prisma/client"
import { UserFromDB } from "@/shared/types/db.types"
import prisma from "@/utils/prisma"

type UserWithCards = Prisma.UserGetPayload<{
  include: {
    cards: true
  }
}>

type GetUserSuccess<T> = {
  status: "success"
  code: 200
  user: T
}

type GetUserError = {
  status: "error"
  message: string
}

export type GetUserResponse<T> = GetUserSuccess<T> | GetUserError

export const GetUserInfoById = async <T extends boolean = false>(
  userId: string,
  withCards?: T
): Promise<GetUserResponse<T extends true ? UserWithCards : UserFromDB>> => {
  try {
    const user = await (prisma.user.findFirst as any)({
      where: {
        OR: [{ tgId: String(userId) }, { id: String(userId) }],
      },

      include: withCards
        ? {
            cards: true,
          }
        : undefined,
    })

    if (!user) {
      return {
        status: "error",
        message: "User not found",
      }
    }

    return {
      code: 200,
      status: "success",
      user,
    } as GetUserSuccess<T extends true ? UserWithCards : UserFromDB>
  } catch (error) {
    console.error("Error finding user:", error)

    return {
      status: "error",
      message: `Error finding user: ${
        error instanceof Error ? error.message : error
      }`,
    }
  }
}

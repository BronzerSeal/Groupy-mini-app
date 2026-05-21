"use server"

import { UserFromDB } from "@/shared/types/db.types"
import prisma from "@/utils/prisma"

type GetUserSuccess = {
  status: "success"
  code: 200
  users: UserFromDB[]
}

type GetUserError = {
  status: "error"
  message: string
  users: []
}

export type GetUserResponse = GetUserSuccess | GetUserError

export const GetUsersByName = async (
  name: string,
  searcherId: string
): Promise<GetUserResponse> => {
  try {
    const normalizedName = name.trim()
    const findManyUsers = prisma.user.findMany as any
    const excludeCurrentUser = {
      NOT: {
        tgId: searcherId,
      },
    }

    if (!normalizedName) {
      return { message: "no username", status: "error", users: [] }
    }

    const usernameUsers = await findManyUsers({
      where: {
        ...excludeCurrentUser,
        username: {
          contains: normalizedName,
          mode: "insensitive",
        },
      },

      take: 3,
    })

    if (usernameUsers.length > 0) {
      return { code: 200, status: "success", users: usernameUsers }
    }

    const firstNameUsers = await findManyUsers({
      where: {
        ...excludeCurrentUser,
        firstName: {
          contains: normalizedName,
          mode: "insensitive",
        },
      },
      take: 3,
    })

    if (firstNameUsers.length > 0) {
      return { code: 200, status: "success", users: firstNameUsers }
    }

    const lastNameUsers = await findManyUsers({
      ...excludeCurrentUser,
      where: {
        lastName: {
          contains: normalizedName,
          mode: "insensitive",
        },
      },
      take: 3,
    })

    return { code: 200, status: "success", users: lastNameUsers }
  } catch (error) {
    console.error("Error finding cards:", error)
    return {
      status: "error",
      message: `Error finding cards: ${error instanceof Error ? error.message : error}`,
      users: [],
    }
  }
}

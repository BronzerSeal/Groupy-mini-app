"use server"

import prisma from "@/utils/prisma"

type DataItem = {
  amount: number
  date: string
}

type GetSpendingUserDataSuccess = {
  status: "success"
  code: 200
  data: DataItem[] | []
}

type GetSpendingUserDataError = {
  status: "error"
  message: string
}

export type GetSpendingUserDataResponse =
  | GetSpendingUserDataSuccess
  | GetSpendingUserDataError

export const getSpendingUserData = async (
  userId: string
): Promise<GetSpendingUserDataResponse> => {
  try {
    const result = await (prisma.transaction.findMany as any)({
      where: {
        userId,
      },
      select: {
        amount: true,
        date: true,
      },
    })

    const map = new Map<string, number>()

    for (const item of result) {
      const day = item.date.split("T")[0]

      map.set(day, (map.get(day) ?? 0) + item.amount)
    }

    const formattedData = Array.from(map.entries()).map(([date, amount]) => ({
      date,
      amount,
    }))

    return {
      status: "success",
      code: 200,
      data: formattedData,
    }
  } catch (error) {
    console.error("Error getting user transactions:", error)

    return {
      status: "error",
      message: `Error getting user transactions: ${
        error instanceof Error ? error.message : String(error)
      }`,
    }
  }
}

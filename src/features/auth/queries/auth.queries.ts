"use client"
import { useQuery } from "@tanstack/react-query"
import { GetUserInfoById } from "../model/get-user-by-tg-id"

export const UseUserInfoById = <T extends boolean = false>(
  userId: string,
  withCards?: T,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["user-info", userId, withCards],

    queryFn: () => GetUserInfoById(userId, withCards),

    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }

      return data.user
    },

    enabled,
  })
}

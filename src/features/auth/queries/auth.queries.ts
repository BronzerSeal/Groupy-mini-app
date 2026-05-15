"use client"
import { useQuery } from "@tanstack/react-query"
import { GetUserInfoById } from "../model/get-user-by-tg-id"

export const UseUserInfoById = (userId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["user-info", userId],
    queryFn: () => GetUserInfoById(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.user
    },
    enabled,
  })
}

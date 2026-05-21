import { useQuery } from "@tanstack/react-query"
import { GetUserCardsByUserId } from "../model/get-user-cards-by-user-id"

export const useUserCardsName = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userCards-name", userId],
    queryFn: () => GetUserCardsByUserId(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.cards
    },
    enabled,
  })
}

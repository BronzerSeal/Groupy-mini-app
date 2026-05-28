import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../model/get-user-transactions"

export const useUserTransactions = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userDonutTransactions", userId],
    queryFn: () => getTransactions(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.transactions
    },
    enabled,
  })
}

import { useQuery } from "@tanstack/react-query"
import { getSpendingUserData } from "../model/get-spending-user-data"

export const useUserSpendingData = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userTransactions", userId],
    queryFn: () => getSpendingUserData(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.data
    },
    enabled,
  })
}

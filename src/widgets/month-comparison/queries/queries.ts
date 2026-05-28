import { useQuery } from "@tanstack/react-query"
import { getAmountComparison } from "../model/get-amount-comparisons"

export const useAmountComparisons = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userComparisons", userId],
    queryFn: () => getAmountComparison(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.comparisons
    },
    enabled,
  })
}

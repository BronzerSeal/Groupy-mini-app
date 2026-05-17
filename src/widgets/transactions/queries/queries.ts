import { useInfiniteQuery } from "@tanstack/react-query"
import { GetUserTransactionsById } from "../model/get-user-transactions"

export const useUserTransactions = (userId: string, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["userTransactions", userId],

    initialPageParam: undefined as string | undefined,

    queryFn: ({ pageParam }) => GetUserTransactionsById(userId, pageParam),

    getNextPageParam: (lastPage) => {
      if (lastPage.status === "error") return undefined

      return lastPage.nextCursor
    },
    select: (result) => result.pages.flatMap((page) => page.transactions),

    enabled,
  })
}

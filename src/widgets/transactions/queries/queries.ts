import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import {
  GetUserTransactionCategories,
  GetUserTransactionsById,
  TransactionFilters,
} from "../model/get-user-transactions"

export const useUserTransactions = (
  userId: string,
  filters: TransactionFilters,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey: ["userTransactions", userId, filters],

    initialPageParam: undefined as string | undefined,

    queryFn: ({ pageParam }) =>
      GetUserTransactionsById(userId, {
        cursor: pageParam,
        filters,
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.status === "error") return undefined

      return lastPage.nextCursor
    },
    select: (result) => result.pages.flatMap((page) => page.transactions),

    enabled,
  })
}

export const useTransactionCategories = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userTransactionCategories", userId],
    queryFn: () => GetUserTransactionCategories(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }

      return data.categories
    },
    enabled,
  })
}

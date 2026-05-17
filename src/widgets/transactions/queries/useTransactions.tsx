"use client"

import { useCallback, useRef } from "react"
import { TransactionFilters } from "../model/get-user-transactions"
import { useTransactionCategories, useUserTransactions } from "./queries"
import { initData, useSignal } from "@tma.js/sdk-react"
import { TransactionsLoader } from "../ui/transactions-loader"

export const useTransactionsForTable = (filters: TransactionFilters) => {
  const user = useSignal(initData.state)
  const userId = String(user?.user?.id)
  const enabled = !!user?.user?.id

  const {
    data: transactions,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserTransactions(userId, filters, enabled)

  const { data: categories = [] } = useTransactionCategories(userId, enabled)

  const cursorRef = useIntersection(() => {
    fetchNextPage()
  })

  const cursor = (
    <div ref={cursorRef}>
      {isFetchingNextPage && <TransactionsLoader variant="inline" />}
      {/* {!hasNextPage && (
        <div className="mt-2 text-2xl" color="danger">
          that's all transactions
        </div>
      )} */}
    </div>
  )

  return {
    transactions,
    isLoading,
    isRefreshing: isFetching && !isFetchingNextPage,
    categories,
    cursor,
  }
}

export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => {})

  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect()
        }
      })
    })

    if (el) {
      observer.observe(el)
      unsubscribe.current = () => observer.disconnect()
    } else {
      unsubscribe.current()
    }
  }, [])
}

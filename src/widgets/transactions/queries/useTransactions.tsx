"use client"

import { useCallback, useRef } from "react"
import { useUserTransactions } from "./queries"
import { initData, useSignal } from "@tma.js/sdk-react"

export const useTransactionsForTable = () => {
  const user = useSignal(initData.state)

  const {
    data: transactions,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useUserTransactions(String(user?.user?.id), !!user?.user?.id)

  const cursorRef = useIntersection(() => {
    fetchNextPage()
  })

  const cursor = (
    <div ref={cursorRef}>
      {/* {isFetchingNextPage && <UserPostSkeleton />} */}
      {isFetchingNextPage && <div>Loading</div>}
      {!hasNextPage && (
        <div className="mt-2 text-2xl" color="danger">
          No transactions yet
        </div>
      )}
    </div>
  )

  return { transactions, isLoading, cursor }
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

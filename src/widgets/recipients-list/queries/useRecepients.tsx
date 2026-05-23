"use client"

import { useCallback, useRef } from "react"
import { initData, useSignal } from "@tma.js/sdk-react"
import { useUserRecepients } from "./queries"

export const useRecepients = () => {
  const user = useSignal(initData.state)
  const userId = String(user?.user?.id)
  const enabled = !!user?.user?.id

  const {
    data: recepients,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useUserRecepients(userId, enabled)

  const cursorRef = useIntersection(() => {
    fetchNextPage()
  })

  const cursor = (
    <div ref={cursorRef}>{isFetchingNextPage && <div>loading </div>}</div>
  )

  return {
    recepients,
    isLoading,
    isRefreshing: isFetching && !isFetchingNextPage,
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

"use client"

import { PropsWithChildren, useEffect } from "react"

import { bootstrapTelegram } from "shared/lib/telegram/bootstrap"

export function TelegramProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    bootstrapTelegram().catch((error) => {
      console.error("Telegram bootstrap failed", error)
    })
  }, [])

  return <>{children}</>
}

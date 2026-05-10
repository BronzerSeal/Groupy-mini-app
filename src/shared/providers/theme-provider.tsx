"use client"

import dynamic from "next/dynamic"
import { PropsWithChildren } from "react"

const TelegramThemeSync = dynamic(
  () => import("./telegram-theme-sync").then((mod) => mod.TelegramThemeSync),
  { ssr: false }
)

export function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <>
      <TelegramThemeSync />
      {children}
    </>
  )
}

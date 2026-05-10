"use client"
import { queryClient } from "@/utils/query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "./theme-provider"
import { useEffect } from "react"
import { initTelegram } from "../lib/tma-init"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initTelegram()
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

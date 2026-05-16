"use client"

import { PropsWithChildren } from "react"

import { TelegramProvider } from "./telegram-provider"
import { ThemeProvider } from "./theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/utils/query-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { AuthBootstrap } from "./auth-bootstrap"
import { Toaster } from "sonner"

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <TelegramProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthBootstrap>
            <Toaster position={"top-right"} />
            {children}
          </AuthBootstrap>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </TelegramProvider>
  )
}

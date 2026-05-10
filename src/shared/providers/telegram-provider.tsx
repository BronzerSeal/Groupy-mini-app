"use client"

import { PropsWithChildren, useEffect, useState } from "react"

import { bootstrapTelegram } from "shared/lib/telegram/bootstrap"

export function TelegramProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    bootstrapTelegram()
      .then(() => {
        setStatus("ready")
      })
      .catch((error) => {
        console.error("Telegram bootstrap failed", error)
        setStatus("error")
      })
  }, [])

  if (status === "loading") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <section className="space-y-4">
          <div className="inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-[var(--secondary)] px-2.5 py-1 text-xs font-medium text-[var(--secondary-foreground)]">
            Preparing Telegram context
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
            Loading the client-side Telegram shell.
          </h1>
        </section>
      </main>
    )
  }

  if (status === "error") {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
        <section className="space-y-4">
          <div className="inline-flex w-fit items-center rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
            Telegram bootstrap failed
          </div>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
            The app could not initialize Telegram SDK.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
            Check the browser console for the bootstrap error details.
          </p>
        </section>
      </main>
    )
  }

  return <>{children}</>
}

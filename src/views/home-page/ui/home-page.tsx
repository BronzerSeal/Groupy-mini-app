"use client"

import { useEffect, useState } from "react"

import { HomeClient } from "./home-client"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
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

  return <HomeClient />
}

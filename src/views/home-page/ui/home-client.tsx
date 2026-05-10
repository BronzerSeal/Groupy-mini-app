"use client"

import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from "@tma.js/sdk-react"

import { BackButtonHandler } from "shared/ui/telegram/back-button-handler"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"

function ThemeStatus() {
  const isDark = useSignal(miniApp.isDark)
  const user = useSignal(initData.user)
  const launchParams = useLaunchParams()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Driven by `miniApp.isDark` from Telegram SDK.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge>{isDark ? "dark" : "light"}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User</CardTitle>
          <CardDescription>Read from restored `initData.user`.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>{user?.first_name ?? "Unknown user"}</p>
          <p>{user?.last_name ?? "Unknown user"}</p>
          <p className="text-[var(--muted-foreground)]">
            {user?.language_code ?? "No locale"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform</CardTitle>
          <CardDescription>
            Resolved from Telegram launch params.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Badge>{launchParams.tgWebAppPlatform}</Badge>
        </CardContent>
      </Card>
    </div>
  )
}

export function HomeClient() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <BackButtonHandler enabled={false} />

      <section className="space-y-4">
        <Badge>Next.js App Router + shadcn/ui style shell</Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-6xl">
          Telegram Mini App init was moved into a clean provider-based layer.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
          This page keeps the UI independent from Telegram-specific components
          while still reading theme, user, viewport, and launch params from the
          SDK.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>Primary action</Button>
          <Button className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">
            Secondary action
          </Button>
        </div>
      </section>

      <ThemeStatus />

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>What was intentionally not copied</CardTitle>
          <CardDescription>
            `@telegram-apps/telegram-ui`, template demo pages, and TON Connect
            were kept out so the new site can stay fully aligned with
            `shadcn/ui` patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm leading-6 text-[var(--muted-foreground)]">
          <p>Telegram SDK startup lives in `src/lib/telegram`.</p>
          <p>`TelegramProvider` runs bootstrap once on the client.</p>
          <p>
            `ThemeProvider` maps Telegram theme and locale into the document
            shell.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

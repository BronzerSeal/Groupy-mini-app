"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { themeParams, useSignal } from "@tma.js/sdk-react"
import { cn } from "@/lib/utils"
import { NAV_PAGES } from "../consts/consts"
import { BottomNavigationSkeleton } from "./bottom-navigation-skeleton"
import { useColors } from "../hooks/useColors"

const BottomNavigation = () => {
  const pathname = usePathname()
  const colors = useSignal(themeParams.state)

  if (!colors.bg_color) {
    return <BottomNavigationSkeleton />
  }

  const { navStyle, activeItemStyle, inactiveItemStyle } = useColors(colors)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 flex justify-center px-4">
      <nav
        style={navStyle}
        className="pointer-events-auto w-full max-w-[23rem] rounded-[2rem] border p-2 shadow-[0_24px_80px_rgba(0,0,0,0.32)] backdrop-blur-xl"
      >
        <section className="flex items-center justify-between gap-1">
          {NAV_PAGES.map((page) => {
            const isActive = page.exact
              ? pathname === page.href
              : pathname.startsWith(page.href)
            const Icon = page.icon

            return (
              <Link
                key={page.href}
                href={page.href}
                aria-label={page.label}
                style={isActive ? activeItemStyle : inactiveItemStyle}
                className={cn(
                  "group flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out",
                  "focus-visible:ring-2 focus-visible:ring-[color:var(--tg-theme-button-color,var(--primary))] focus-visible:ring-offset-2 focus-visible:outline-hidden",
                  isActive
                    ? ""
                    : "opacity-75 hover:-translate-y-0.5 hover:opacity-100"
                )}
              >
                <Icon
                  className={cn(
                    "h-[1.15rem] w-[1.15rem] transition-transform duration-300",
                    isActive ? "scale-100" : "scale-95 group-hover:scale-100"
                  )}
                  strokeWidth={2.2}
                />
                <span className="sr-only">{page.label}</span>
              </Link>
            )
          })}
        </section>
      </nav>
    </div>
  )
}

export default BottomNavigation

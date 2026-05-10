import { Skeleton } from "@/shared/ui/skeleton"
import { NAV_PAGES } from "../consts/consts"
import { cn } from "@/lib/utils"

export const BottomNavigationSkeleton = () => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-50 flex justify-center px-4">
      <div className="w-full max-w-[23rem] rounded-[2rem] border border-[var(--border)] bg-[var(--secondary)]/90 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-1">
          {NAV_PAGES.map((page, index) => (
            <Skeleton
              key={page.href}
              className={cn(
                "h-12 w-12 shrink-0 rounded-full",
                index === 0 ? "bg-[var(--primary)]/25" : "bg-[var(--muted)]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

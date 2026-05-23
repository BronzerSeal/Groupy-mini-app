import { Skeleton } from "@/shared/ui/skeleton"

export const WalletBalanceLoader = () => {
  return (
    <div className="space-y-2 pt-5">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 rounded-full bg-[var(--muted)]/70" />
        <Skeleton className="h-12 w-52 rounded-2xl bg-[var(--muted)]/80 sm:h-14 sm:w-60" />
      </div>
    </div>
  )
}

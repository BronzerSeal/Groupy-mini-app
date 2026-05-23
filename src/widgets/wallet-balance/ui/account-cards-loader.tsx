import { Skeleton } from "@/shared/ui/skeleton"
import { Card, CardContent } from "@/shared/ui/card"

export const AccountCardsLoader = () => {
  return (
    <Card className="bg-transparent shadow-none ring-0">
      <CardContent className="flex flex-col gap-5 pt-6">
        <Skeleton className="h-40 w-full rounded-[1.75rem] bg-[var(--muted)]/80" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20 rounded-full bg-[var(--muted)]/70" />
          <Skeleton className="h-7 w-7 rounded-full bg-[var(--muted)]/80" />
        </div>
      </CardContent>
    </Card>
  )
}

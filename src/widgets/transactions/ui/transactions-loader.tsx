import { Skeleton } from "@/shared/ui/skeleton"
import { cn } from "@/lib/utils"

type TransactionsLoaderProps = {
  variant?: "table" | "inline"
  rows?: number
}

export const TransactionsLoader = ({
  variant = "table",
  rows = 6,
}: TransactionsLoaderProps) => {
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-2">
          <Skeleton className="size-2 rounded-full bg-primary/60" />
          <Skeleton className="h-3 w-20 rounded-full bg-muted/80" />
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
      <div className="border-b bg-muted/20 px-4 py-3">
        <div className="grid grid-cols-[40px_minmax(180px,1.6fr)_minmax(120px,1.1fr)_minmax(90px,.8fr)] gap-4 md:grid-cols-[40px_minmax(180px,1.6fr)_minmax(120px,1.1fr)_minmax(90px,.8fr)_minmax(110px,.9fr)] lg:grid-cols-[40px_minmax(180px,1.6fr)_minmax(120px,1.1fr)_minmax(90px,.8fr)_minmax(110px,.9fr)_minmax(100px,.8fr)_40px]">
          <Skeleton className="h-4 w-4 rounded-sm bg-muted/70" />
          <Skeleton className="h-4 w-20 rounded-full bg-muted/70" />
          <Skeleton className="hidden h-4 w-24 rounded-full bg-muted/70 sm:block" />
          <Skeleton className="ml-auto h-4 w-16 rounded-full bg-muted/70" />
          <Skeleton className="hidden h-4 w-16 rounded-full bg-muted/70 md:block" />
          <Skeleton className="hidden h-4 w-16 rounded-full bg-muted/70 lg:block" />
          <Skeleton className="hidden h-4 w-4 rounded-full bg-muted/70 lg:block" />
        </div>
      </div>

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "grid items-center gap-4 px-4 py-4",
              "grid-cols-[40px_minmax(180px,1.6fr)_minmax(120px,1.1fr)_minmax(90px,.8fr)]",
              "md:grid-cols-[40px_minmax(180px,1.6fr)_minmax(120px,1.1fr)_minmax(90px,.8fr)_minmax(110px,.9fr)]",
              "lg:grid-cols-[40px_minmax(180px,1.6fr)_minmax(120px,1.1fr)_minmax(90px,.8fr)_minmax(110px,.9fr)_minmax(100px,.8fr)_40px]"
            )}
          >
            <Skeleton className="h-4 w-4 rounded-sm bg-muted/80" />

            <div className="flex items-center gap-3">
              <Skeleton className="size-8 rounded-lg bg-muted/80" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded-full bg-muted/80" />
                <Skeleton className="h-3 w-16 rounded-full bg-muted/70" />
              </div>
            </div>

            <Skeleton className="hidden h-4 w-24 rounded-full bg-muted/75 sm:block" />
            <Skeleton className="ml-auto h-4 w-16 rounded-full bg-muted/80" />
            <Skeleton className="hidden h-4 w-20 rounded-full bg-muted/75 md:block" />
            <Skeleton className="hidden h-6 w-18 rounded-full bg-muted/80 lg:block" />
            <Skeleton className="hidden h-8 w-8 rounded-full bg-muted/75 lg:block" />
          </div>
        ))}
      </div>
    </div>
  )
}

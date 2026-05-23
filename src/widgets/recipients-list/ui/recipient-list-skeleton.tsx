import { Skeleton } from "@/shared/ui/skeleton"

export const RecipientsListSkeleton = () => {
  return (
    <section className="mt-3 flex flex-col gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="flex items-center justify-between rounded-xl bg-[#f3f6fb] p-2 dark:bg-[#141c2e]"
          key={index}
        >
          <div className="min-w-0 space-y-2">
            <Skeleton className="h-5 w-32 rounded-full bg-muted/70 dark:bg-muted/50" />
            <Skeleton className="h-4 w-24 rounded-full bg-muted/55 dark:bg-muted/40" />
          </div>
          <Skeleton className="size-12 rounded-full bg-muted/70 dark:bg-muted/50" />
        </div>
      ))}
    </section>
  )
}

import { Skeleton } from "@/shared/ui/skeleton"
import { Card, CardContent, CardHeader } from "shared/ui/card"

const barRows = Array.from({ length: 6 }, (_, index) => index)

export const MonthComparisonSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-7 w-44 rounded-full bg-muted/75" />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-2 rounded-full bg-muted/80" />
              <Skeleton className="h-4 w-28 rounded-full bg-muted/70" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-2 rounded-full bg-muted/70" />
              <Skeleton className="h-4 w-28 rounded-full bg-muted/60" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-w-0">
        <div className="flex h-[280px] items-end gap-4 px-3 pb-7 pt-4">
          {barRows.map((row) => (
            <div key={row} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-full items-end gap-1.5">
                <Skeleton
                  className="w-4 rounded-t-md bg-muted/45"
                  style={{ height: `${44 + ((row * 13) % 36)}%` }}
                />
                <Skeleton
                  className="w-4 rounded-t-md bg-muted/75"
                  style={{ height: `${56 + ((row * 11) % 32)}%` }}
                />
              </div>
              <Skeleton className="h-3 w-10 rounded-full bg-muted/65" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { Skeleton } from "@/shared/ui/skeleton"
import { Card, CardContent, CardHeader } from "shared/ui/card"

const legendItems = Array.from({ length: 6 }, (_, index) => index)

export const CategoryDonutSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-7 w-44 rounded-full bg-muted/75" />
          <Skeleton className="h-7 w-24 rounded-full bg-muted/65" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative flex h-[280px] w-full items-center justify-center">
            <Skeleton className="size-[220px] rounded-full bg-muted/60" />
            <div className="absolute flex size-[124px] flex-col items-center justify-center rounded-full bg-card">
              <Skeleton className="h-7 w-20 rounded-full bg-muted/70" />
              <Skeleton className="mt-3 h-3 w-16 rounded-full bg-muted/60" />
            </div>
          </div>

          <div className="mt-3 grid w-full grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {legendItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Skeleton className="size-2.5 rounded-full bg-muted/80" />
                <Skeleton className="h-3 flex-1 rounded-full bg-muted/65" />
                <Skeleton className="h-3 w-14 rounded-full bg-muted/75" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "shared/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "shared/ui/chart"
import { useAmountComparisons } from "../queries/queries"
import { initData, useSignal } from "@tma.js/sdk-react"
import type { MonthComparison } from "../model/get-amount-comparisons"
import { chartConfig } from "../consts/chart-config"
import { createChangeLabel } from "../model/create-change-label"
import { MonthComparisonSkeleton } from "./month-comparison-skeleton"

export function MonthComparison() {
  const user = useSignal(initData.state)

  const { data: monthComparisons, isLoading } = useAmountComparisons(
    String(user?.user?.id),
    !!user?.user?.id
  )

  const totals = useMemo(() => {
    const thisMonth = monthComparisons?.reduce((s, r) => s + r.thisMonth, 0)
    const lastMonth = monthComparisons?.reduce((s, r) => s + r.lastMonth, 0)
    return { thisMonth, lastMonth }
  }, [monthComparisons])

  const ChangeLabel = useMemo(() => {
    if (!monthComparisons) return () => null
    return createChangeLabel(monthComparisons)
  }, [monthComparisons])

  if (isLoading || !monthComparisons) return <MonthComparisonSkeleton />

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Month vs Last Month</CardTitle>
            <CardDescription>
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-primary" />
                  This Month{" "}
                  <span className="font-medium text-foreground tabular-nums">
                    ${totals?.thisMonth?.toLocaleString()}
                  </span>
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-muted-foreground/30" />
                  Last Month{" "}
                  <span className="font-medium text-foreground tabular-nums">
                    ${totals?.lastMonth?.toLocaleString()}
                  </span>
                </span>
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-w-0">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart
            data={monthComparisons}
            margin={{ top: 24, right: 8, bottom: 0, left: -20 }}
            barGap={4}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
              strokeOpacity={0.5}
            />

            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={8}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v: string) =>
                v.length > 8 ? v.slice(0, 7) + "..." : v
              }
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={8}
              stroke="var(--color-muted-foreground)"
              tickFormatter={(v: number) => `$${v}`}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
                />
              }
            />

            <Bar
              dataKey="lastMonth"
              fill="var(--color-muted-foreground)"
              fillOpacity={0.3}
              radius={[4, 4, 0, 0]}
              barSize={18}
            />

            <Bar
              dataKey="thisMonth"
              fill="var(--color-primary)"
              radius={[4, 4, 0, 0]}
              barSize={18}
            >
              <LabelList dataKey="thisMonth" content={<ChangeLabel />} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

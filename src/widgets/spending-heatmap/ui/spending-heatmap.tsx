"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "shared/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "shared/ui/tooltip"
import { useUserSpendingData } from "../queries/queries"
import { initData, useSignal } from "@tma.js/sdk-react"
import { useSpendingHeatmap } from "../model/use-spending-heatmap"
import { intensityClass } from "../model/intensity-class"
import {
  CELL_SIZE,
  DAY_LABELS,
  TOTAL,
  TOUCH_TARGET_OFFSET,
  TOUCH_TARGET_SIZE,
} from "../consts/constants"

export function SpendingHeatmap() {
  const user = useSignal(initData.state)
  const [selectedCell, setSelectedCell] = useState<{
    amount: number
    date: string
  } | null>(null)

  const { data: spendingHeatmapData } = useUserSpendingData(
    String(user?.user?.id),
    !!user?.user?.id
  )

  const safeData = spendingHeatmapData ?? []

  const { grid, monthLabels, yearTotal, max } = useSpendingHeatmap(safeData)

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Spending Activity</CardTitle>
            <CardDescription>
              <span className="font-medium text-foreground tabular-nums">
                ${yearTotal.toLocaleString()}
              </span>{" "}
              total spent this year
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span>Less</span>
            <span className="inline-block size-3 rounded-sm bg-muted/40" />
            <span className="inline-block size-3 rounded-sm bg-primary/10" />
            <span className="inline-block size-3 rounded-sm bg-primary/25" />
            <span className="inline-block size-3 rounded-sm bg-primary/45" />
            <span className="inline-block size-3 rounded-sm bg-primary/70" />
            <span>More</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <TooltipProvider delayDuration={0}>
            <svg
              width={53 * TOTAL + 32}
              height={7 * TOTAL + 24}
              className="text-muted-foreground"
            >
              {/* Month labels */}
              {monthLabels.map((m) => (
                <text
                  key={`${m.label}-${m.col}`}
                  x={m.col * TOTAL + 32}
                  y={10}
                  className="fill-muted-foreground text-[10px]"
                >
                  {m.label}
                </text>
              ))}

              {/* Day labels */}
              {DAY_LABELS.map((label, i) =>
                label ? (
                  <text
                    key={i}
                    x={0}
                    y={i * TOTAL + 28}
                    className="fill-muted-foreground text-[10px]"
                    dominantBaseline="middle"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {/* Day cells */}
              {grid.map((cell) => (
                <Tooltip key={cell.date}>
                  <TooltipTrigger asChild>
                    <g
                      className="cursor-pointer"
                      onClick={() => setSelectedCell(cell)}
                    >
                      <rect
                        x={cell.col * TOTAL + 32 - TOUCH_TARGET_OFFSET}
                        y={cell.row * TOTAL + 18 - TOUCH_TARGET_OFFSET}
                        width={TOUCH_TARGET_SIZE}
                        height={TOUCH_TARGET_SIZE}
                        rx={6}
                        fill="transparent"
                      />
                      <rect
                        x={cell.col * TOTAL + 32}
                        y={cell.row * TOTAL + 18}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2}
                        pointerEvents="none"
                        className={`${intensityClass(cell.amount, max)} transition-colors hover:stroke-foreground/30 hover:stroke-1 ${
                          selectedCell?.date === cell.date
                            ? "stroke-foreground stroke-1"
                            : ""
                        }`}
                      />
                    </g>
                  </TooltipTrigger>

                  <TooltipContent>
                    <span className="tabular-nums">
                      ${cell.amount.toLocaleString()}
                    </span>{" "}
                    on{" "}
                    {new Date(cell.date + "T12:00:00").toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </svg>
          </TooltipProvider>
        </div>

        <div className="mt-4 rounded-lg bg-muted/30 sm:hidden">
          {selectedCell ? (
            <p className="text-sm text-foreground">
              <span className="font-medium tabular-nums">
                ${selectedCell.amount.toLocaleString()}
              </span>{" "}
              on{" "}
              {new Date(selectedCell.date + "T12:00:00").toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Tap a day to see the amount.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

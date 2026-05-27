"use client"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import { motion } from "motion/react"
import { useMemo } from "react"
import {
  statusColors,
  statusLabels,
  systemStatus,
} from "../consts/status-constants"

export default function StatusTab() {
  const allOperational = systemStatus.every((s) => s.status === "operational")

  // Generate fake uptime data for 90 days
  const uptimeData = useMemo(() => {
    return Array.from({ length: 90 }, (_, i) => {
      if (i === 52) return "outage"
      if (i === 53 || i === 67) return "degraded"
      return "operational" as const
    })
  }, [])

  const uptimePct = (
    (uptimeData.filter((d) => d === "operational").length / uptimeData.length) *
    100
  ).toFixed(2)

  return (
    <div className="mb-17 space-y-4">
      {/* Overall status banner */}
      <Card
        className={
          allOperational
            ? "ring-1 ring-emerald-500/20"
            : "ring-1 ring-amber-500/20"
        }
      >
        <CardContent className="flex items-center gap-4 p-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={cn(
              "flex size-14 items-center justify-center rounded-2xl",
              allOperational
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
          >
            {allOperational ? (
              <CheckCircle2Icon className="size-7" />
            ) : (
              <AlertCircleIcon className="size-7" />
            )}
          </motion.div>
          <div>
            <p className="text-lg font-semibold">
              {allOperational
                ? "All Systems Operational"
                : "Partial System Degradation"}
            </p>
            <p className="text-sm text-muted-foreground">
              {allOperational
                ? "All services running smoothly"
                : "Some services experiencing issues"}
            </p>
          </div>
          <div className="ml-auto hidden text-right sm:block">
            <p className="text-2xl font-bold tabular-nums">{uptimePct}%</p>
            <p className="text-xs text-muted-foreground">90-day uptime</p>
          </div>
        </CardContent>
      </Card>

      {/* Service list with live indicator bars */}
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {systemStatus.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-lg border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{service.name}</p>
              </div>

              {/* Mini uptime bars (last 30 days) */}
              <TooltipProvider>
                <div className="hidden items-center gap-[1.5px] md:flex">
                  {uptimeData.slice(-30).map((status, j) => (
                    <Tooltip key={j}>
                      <TooltipTrigger asChild>
                        <div
                          className="h-6 w-[4px] rounded-sm transition-colors"
                          style={{
                            backgroundColor:
                              service.status === "operational"
                                ? statusColors[status]
                                : statusColors[service.status],
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="text-xs tabular-nums">
                          {30 - j} days ago &middot; {statusLabels[status]}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>

              <div className="flex items-center gap-2">
                <motion.span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: statusColors[service.status] }}
                  animate={
                    service.status === "operational"
                      ? {}
                      : { opacity: [1, 0.4, 1] }
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span
                  className={cn(
                    "min-w-[80px] text-xs font-medium",
                    service.status === "operational"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : service.status === "degraded"
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {statusLabels[service.status]}
                </span>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Full 90-day uptime bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Uptime &mdash; Last 90 Days</CardTitle>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-sm bg-emerald-500" /> Up
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-sm bg-amber-500" /> Degraded
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-sm bg-rose-500" /> Down
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="flex gap-[1.5px]">
              {uptimeData.map((status, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 32 }}
                      transition={{ delay: i * 0.008, duration: 0.3 }}
                      className="flex-1 rounded-sm"
                      style={{ backgroundColor: statusColors[status] }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs tabular-nums">
                      {90 - i} days ago &middot; {statusLabels[status]}
                    </span>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>90 days ago</span>
            <span className="font-medium text-foreground tabular-nums">
              {uptimePct}% uptime
            </span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

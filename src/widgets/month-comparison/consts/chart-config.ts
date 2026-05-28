import { ChartConfig } from "@/shared/ui/chart"

export const chartConfig = {
  thisMonth: {
    label: "This Month",
    color: "var(--color-primary)",
  },
  lastMonth: {
    label: "Last Month",
    color: "var(--color-muted-foreground)",
  },
} satisfies ChartConfig

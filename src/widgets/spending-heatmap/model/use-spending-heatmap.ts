import { useMemo } from "react"

type DataItem = {
  amount: number
  date: string
}

export function useSpendingHeatmap(data: DataItem[]) {
  return useMemo(() => {
    if (!data.length) {
      return {
        grid: [],
        monthLabels: [],
        yearTotal: 0,
        max: 0,
      }
    }

    const max = Math.max(...data.map((d) => d.amount))
    const yearTotal = data.reduce((s, d) => s + d.amount, 0)

    const firstDate = new Date(data[0].date)
    const startDay = firstDate.getDay()

    const gridStart = new Date(firstDate)
    gridStart.setDate(gridStart.getDate() - startDay)

    const lookup = new Map(data.map((d) => [d.date, d.amount]))

    const weeks: any[] = []
    const months: any[] = []
    const seenMonths = new Set<string>()

    for (let col = 0; col < 53; col++) {
      for (let row = 0; row < 7; row++) {
        const d = new Date(gridStart)
        d.setDate(d.getDate() + col * 7 + row)

        const key = d.toISOString().split("T")[0]
        const amount = lookup.get(key) ?? 0

        weeks.push({ date: key, amount, col, row })

        const monthKey = `${d.getFullYear()}-${d.getMonth()}`
        if (!seenMonths.has(monthKey) && row === 0) {
          seenMonths.add(monthKey)

          months.push({
            label: d.toLocaleDateString("en-US", { month: "short" }),
            col,
          })
        }
      }
    }

    return {
      grid: weeks,
      monthLabels: months,
      yearTotal,
      max,
    }
  }, [data])
}

import { MonthComparison } from "./get-amount-comparisons"

export function createChangeLabel(monthComparisons: MonthComparison[]) {
  return function ChangeLabel(props: any) {
    const { x, y, width, index } = props

    const row = monthComparisons?.[index]
    if (!row || row.lastMonth === 0) return null

    const pct = Math.round(
      ((row.thisMonth - row.lastMonth) / row.lastMonth) * 100
    )

    if (pct === 0) return null

    const isUp = pct > 0

    return (
      <text
        x={x + width / 2}
        y={y - 6}
        textAnchor="middle"
        className={`text-[10px] font-medium tabular-nums ${
          isUp ? "fill-rose-500" : "fill-emerald-500"
        }`}
      >
        {isUp ? "+" : ""}
        {pct}%
      </text>
    )
  }
}

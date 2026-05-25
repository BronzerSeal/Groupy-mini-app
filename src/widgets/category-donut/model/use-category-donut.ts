import { useMemo } from "react"
import type { ChartConfig } from "@/shared/ui/chart"
import { CategoryBreakdown } from "./get-user-transactions"
import { COLORS as SUBCATEGORY_COLORS } from "../consts/colors"

export function useCategoryDonut(
  categoryBreakdowns: CategoryBreakdown[],
  selected: string | null
) {
  const total = useMemo(
    () => categoryBreakdowns.reduce((s, c) => s + c.amount, 0),
    [categoryBreakdowns]
  )

  const selectedCategory = useMemo(
    () => categoryBreakdowns.find((c) => c.category === selected) ?? null,
    [selected, categoryBreakdowns]
  )

  const chartConfig = useMemo<ChartConfig>(() => {
    if (selectedCategory) {
      const config: ChartConfig = {}

      selectedCategory.subcategories.forEach((sub, i) => {
        config[sub.name] = {
          label: sub.name,
          color: SUBCATEGORY_COLORS[i % SUBCATEGORY_COLORS.length],
        }
      })

      return config
    }

    const config: ChartConfig = {}

    categoryBreakdowns.forEach((c, index) => {
      config[c.category] = {
        label: c.category,
        color: c.color ?? SUBCATEGORY_COLORS[index % SUBCATEGORY_COLORS.length],
      }
    })

    return config
  }, [selectedCategory, categoryBreakdowns])

  const pieData = useMemo(() => {
    if (selectedCategory) {
      return selectedCategory.subcategories.map((sub, i) => ({
        name: sub.name,
        value: sub.amount,
        fill: SUBCATEGORY_COLORS[i % SUBCATEGORY_COLORS.length],
      }))
    }

    return categoryBreakdowns.map((c, index) => ({
      name: c.category,
      value: c.amount,
      fill: c.color ?? SUBCATEGORY_COLORS[index % SUBCATEGORY_COLORS.length],
    }))
  }, [selectedCategory, categoryBreakdowns])

  const centerAmount = selectedCategory ? selectedCategory.amount : total

  return {
    total,
    selectedCategory,
    chartConfig,
    pieData,
    centerAmount,
  }
}

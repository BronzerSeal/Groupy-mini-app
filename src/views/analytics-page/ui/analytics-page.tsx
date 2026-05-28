import { SquigglyText } from "@/shared/ui/squiggly-text"
import CategoryDonut from "@/widgets/category-donut"
import { MonthComparison } from "@/widgets/month-comparison"
import { SpendingHeatmap } from "@/widgets/spending-heatmap"

const AnalyticsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">
        <SquigglyText steps={12} stepDuration={120} scale={[3, 5]}>
          Analytics
        </SquigglyText>
      </h1>

      <section className="mt-2">
        <SpendingHeatmap />
      </section>

      <section className="mt-2 mb-17 grid gap-4 lg:grid-cols-2">
        <CategoryDonut />
        <MonthComparison />
      </section>
    </>
  )
}

export default AnalyticsPage

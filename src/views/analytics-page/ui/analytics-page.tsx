import CategoryDonut from "@/widgets/category-donut"
import { SpendingHeatmap } from "@/widgets/spending-heatmap"

const AnalyticsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Analytics</h1>

      <section className="mt-2">
        <SpendingHeatmap />
      </section>

      <section className="mt-2 mb-17">
        <CategoryDonut />
      </section>
    </>
  )
}

export default AnalyticsPage

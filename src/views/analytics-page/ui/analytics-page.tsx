import { SpendingHeatmap } from "@/widgets/spending-heatmap"

const AnalyticsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Analytics</h1>

      <section className="mt-2">
        <SpendingHeatmap />
      </section>
    </>
  )
}

export default AnalyticsPage

export const statusColors = {
  operational: "#10b981",
  degraded: "#f59e0b",
  outage: "#ef4444",
}
export const statusLabels = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
}

export const systemStatus = [
  { name: "Wallet Balance & Cards", status: "operational" as const },
  { name: "Money Transfers", status: "operational" as const },
  { name: "Quick Send & Recipients", status: "operational" as const },
  { name: "Transactions History", status: "operational" as const },
  { name: "Spending Insights", status: "degraded" as const },
  { name: "Support Chat", status: "operational" as const },
]

"use client"

import { useState } from "react"

import { TransactionFilters } from "./transaction-filters"
import { TransactionsLoader } from "./transactions-loader"
import { TransactionTable } from "./transaction-table"
import { TransactionActions } from "./transaction-actions"
import { useTransactionsForTable } from "../queries/useTransactions"

export function TransactionsPageClient() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  //BD LOGIC
  const {
    transactions: serverTransactions,
    isLoading,
    isRefreshing,
    categories,
    cursor,
  } = useTransactionsForTable({
    search,
    category: categoryFilter,
    status: statusFilter as "all" | "completed" | "pending" | "failed",
    type: typeFilter as "all" | "expense" | "income",
  })

  const transactions = serverTransactions ?? []

  //-------------------------------------

  function handleExport() {
    const selected = transactions.filter((t) => selectedIds.has(t.id))
    const header = "Merchant,Transaction ID,Amount,Date,Status,Type"
    const rows = selected.map(
      (t) =>
        `"${t.merchant}","${t.transactionId}",${t.amount},"${t.date}","${t.status}","${t.type}"`
    )
    const csv = [header, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transactions.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-4">
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categories={categories}
      />

      {isLoading || isRefreshing ? (
        <TransactionsLoader />
      ) : (
        <TransactionTable
          transactions={transactions}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
        />
      )}

      <TransactionActions
        selectedCount={selectedIds.size}
        onExport={handleExport}
        onClear={() => setSelectedIds(new Set())}
      />
      {cursor}
    </div>
  )
}

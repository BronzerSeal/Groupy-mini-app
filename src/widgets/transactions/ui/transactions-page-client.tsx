"use client"

import { useMemo, useState } from "react"

// import { fullTransactions, type FullTransaction } from "../consts/seed"
import { TransactionFilters } from "./transaction-filters"
import { TransactionTable } from "./transaction-table"
import { TransactionActions } from "./transaction-actions"
import { seedDb } from "../model/seed-db"
import { useTransactionsForTable } from "../queries/useTransactions"
import { FullTransaction } from "@/shared/types/db.types"

export function TransactionsPageClient() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [expandedId, setExpandedId] = useState<string | null>(null)

  //TEST BD LOGIC
  const {
    transactions: fullTransactions,
    isLoading,
    cursor,
  } = useTransactionsForTable()
  console.log(fullTransactions)
  const transactions = fullTransactions ?? []

  const handleSeed = async () => {
    const res = await seedDb()
    console.log("RES: ", res)
  }
  //-------------------------------------

  const categories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category))
    return Array.from(cats).sort()
  }, [transactions])

  const filteredData = useMemo(() => {
    let data: FullTransaction[] = transactions

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(
        (t) =>
          t.merchant.toLowerCase().includes(q) ||
          t.transactionId.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }

    if (categoryFilter !== "all") {
      data = data.filter((t) => t.category === categoryFilter)
    }

    if (statusFilter !== "all") {
      data = data.filter((t) => t.status === statusFilter)
    }

    if (typeFilter !== "all") {
      data = data.filter((t) => t.type === typeFilter)
    }

    return data
  }, [transactions, search, categoryFilter, statusFilter, typeFilter])

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

  // console.log(filteredData)
  if (isLoading) return <div>Loading</div>
  return (
    <div className="flex flex-col gap-4">
      <button
        className="cursor-pointer rounded bg-white text-black"
        onClick={handleSeed}
      >
        SEED DB
      </button>

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

      <TransactionTable
        transactions={filteredData}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
      />

      <TransactionActions
        selectedCount={selectedIds.size}
        onExport={handleExport}
        onClear={() => setSelectedIds(new Set())}
      />
      {cursor}
    </div>
  )
}

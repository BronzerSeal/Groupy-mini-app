import { LucideIcon } from "lucide-react"

export interface UserFromDB {
  createdAt: Date
  firstName: string | null
  id: string
  lastName: string | null
  photoUrl: null | string
  tgId: string
  updatedAt: Date
  username: string | null
}

export type AccountCard = {
  id: string
  label: string
  balance: number
  currency: string
  last4: string
  variant: "default" | "dark" | "primary" | "savings" | "business" | "travel"
}

export type CardPreset = {
  style: string
  chipColor?: string
  icon: LucideIcon
}

export type FullTransaction = {
  id: string
  userId: string
  merchant: string
  transactionId: string
  amount: number
  date: string
  logo: string
  category: string
  status: "completed" | "pending" | "failed"
  type: "expense" | "income"
  notes?: string
  merchantInfo?: string
  cardLast4?: string
}

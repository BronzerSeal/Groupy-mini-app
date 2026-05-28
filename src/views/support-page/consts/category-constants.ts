import type { LucideIcon } from "lucide-react"
import {
  CreditCardIcon,
  HelpCircleIcon,
  MailIcon,
  ShieldIcon,
  WalletIcon,
} from "lucide-react"
import { FaqItem } from "./faq-seed"

export const categoryIcons: Record<FaqItem["category"], LucideIcon> = {
  account: WalletIcon,
  payments: CreditCardIcon,
  security: ShieldIcon,
  billing: MailIcon,
  general: HelpCircleIcon,
}

export const categoryColors: Record<FaqItem["category"], string> = {
  account: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  payments: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  security: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  billing: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  general: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
}

export const categoryFilters = [
  "all",
  "account",
  "payments",
  "security",
  "billing",
  "general",
] as const

import type { LucideIcon } from "lucide-react"
import {
  ChartColumnIncreasing,
  CircleHelp,
  House,
  Settings,
  User,
} from "lucide-react"

export type NavPage = {
  label: string
  href: string
  icon: LucideIcon
  exact?: boolean
}

export const NAV_PAGES: NavPage[] = [
  { label: "Home", href: "/", icon: House, exact: true },
  { label: "Friends", href: "/friends", icon: User },
  { label: "Analytics", href: "/analytics", icon: ChartColumnIncreasing },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Support", href: "/support", icon: CircleHelp },
]

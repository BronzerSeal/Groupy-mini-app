import type { LucideIcon } from "lucide-react"
import { MessageSquarePlusIcon, BookOpenIcon, ActivityIcon } from "lucide-react"

import { TabId } from "../model/types"

export const tabs: {
  id: TabId
  label: string
  icon: LucideIcon
}[] = [
  {
    id: "faq",
    label: "FAQ",
    icon: BookOpenIcon,
  },
  {
    id: "contact",
    label: "Contact Us",
    icon: MessageSquarePlusIcon,
  },
  {
    id: "status",
    label: "System Status",
    icon: ActivityIcon,
  },
]

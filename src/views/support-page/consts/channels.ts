import {
  HeadphonesIcon,
  MailIcon,
  MessageCircleIcon,
  type LucideIcon,
} from "lucide-react"

type channel = {
  icon: LucideIcon
  label: string
  desc: string
  badge: string
  badgeColor: string
  color: string
}

export const channels = [
  {
    icon: MessageCircleIcon,
    label: "Live Chat",
    desc: "Avg. wait: 2 min",
    badge: "Online",
    badgeColor: "bg-emerald-500",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: MailIcon,
    label: "Email Support",
    desc: "Response within 24h",
    badge: null,
    badgeColor: "",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: HeadphonesIcon,
    label: "Phone",
    desc: "Mon-Fri, 9am-6pm",
    badge: null,
    badgeColor: "",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
] as channel[]

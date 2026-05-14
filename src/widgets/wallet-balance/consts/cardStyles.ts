import {
  EuroIcon,
  BitcoinIcon,
  ChartLineIcon,
  CreditCardIcon,
  TrendingUpIcon,
} from "lucide-react"

export const CARD_VARIANTS = {
  default: {
    style: "bg-muted text-foreground",
    chipColor: "bg-foreground/10",
    icon: EuroIcon,
  },

  dark: {
    style: "bg-primary text-primary-foreground",
    chipColor: "bg-primary-foreground/20",
    icon: BitcoinIcon,
  },

  primary: {
    style: "bg-card text-card-foreground ring-1 ring-border",
    chipColor: "bg-foreground/10",
    icon: ChartLineIcon,
  },

  savings: {
    style: "bg-emerald-600 text-white",
    chipColor: "bg-white/20",
    icon: TrendingUpIcon,
  },
  business: {
    style: "bg-violet-600 text-white",
    chipColor: "bg-white/20",
    icon: CreditCardIcon,
  },
  travel: {
    style: "bg-amber-600 text-white",
    chipColor: "bg-white/20",
    icon: EuroIcon,
  },
} as const

export type CardVariant = keyof typeof CARD_VARIANTS

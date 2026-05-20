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
    icon: EuroIcon,
  },

  dark: {
    style: "bg-primary text-primary-foreground",
    icon: BitcoinIcon,
  },

  primary: {
    style: "bg-card text-card-foreground ring-1 ring-border",
    icon: ChartLineIcon,
  },

  savings: {
    style: "bg-emerald-600 text-white",
    icon: TrendingUpIcon,
  },
  business: {
    style: "bg-violet-600 text-white",
    icon: CreditCardIcon,
  },
  travel: {
    style: "bg-amber-600 text-white",
    icon: EuroIcon,
  },
} as const

export type CardVariant = keyof typeof CARD_VARIANTS

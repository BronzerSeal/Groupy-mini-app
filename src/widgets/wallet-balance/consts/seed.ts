export const walletBalance = {
  amount: 84765.0,
  changePercent: 12.4,
  changeDirection: "up" as const,
}

export type AccountCard = {
  id: string
  label: string
  balance: string
  currency: string
  variant: "default" | "dark" | "primary"
}

export const accountCards: AccountCard[] = [
  {
    id: "1",
    label: "Euro Account",
    balance: "42,500",
    currency: "€",
    variant: "default",
  },
  {
    id: "2",
    label: "Crypto Wallet",
    balance: "1.24",
    currency: "BTC",
    variant: "dark",
  },
  {
    id: "3",
    label: "Investment Portfolio",
    balance: "28,300",
    currency: "$",
    variant: "primary",
  },
]

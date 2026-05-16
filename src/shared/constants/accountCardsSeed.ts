import { AccountCard } from "../types/db.types"

export const accountCards: Omit<AccountCard, "id">[] = [
  {
    label: "Euro Account",
    balance: 0,
    currency: "€",
    last4: "4589",
    variant: "default",
  },
  {
    label: "Crypto Wallet",
    balance: 0,
    currency: "BTC",
    last4: "7321",
    variant: "dark",
  },
  {
    label: "Investment Portfolio",
    balance: 0,
    currency: "$",
    last4: "9012",
    variant: "primary",
  },
]

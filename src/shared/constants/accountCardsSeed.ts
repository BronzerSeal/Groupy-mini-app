import { AccountCard } from "../types/db.types"
import { v4 as uuidv4 } from "uuid"

export const accountCards: AccountCard[] = [
  {
    id: uuidv4(),
    label: "Euro Account",
    balance: 0,
    currency: "€",
    last4: "4589",
    variant: "default",
  },
  {
    id: uuidv4(),
    label: "Crypto Wallet",
    balance: 0,
    currency: "BTC",
    last4: "7321",
    variant: "dark",
  },
  {
    id: uuidv4(),
    label: "Investment Portfolio",
    balance: 0,
    currency: "$",
    last4: "9012",
    variant: "primary",
  },
]

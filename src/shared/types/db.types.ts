export interface UserFromDB {
  createdAt: Date
  firstName: string
  id: string
  lastName: string
  photoUrl: null | string
  tgId: string
  updatedAt: Date
  username: string
}

export type AccountCard = {
  id: string
  label: string
  balance: number
  currency: string
  last4: string
  variant: "default" | "dark" | "primary"
}

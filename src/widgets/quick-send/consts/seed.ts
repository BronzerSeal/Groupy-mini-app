// Avatar URLs (local)
const avatar = (id: number) => `/avatars/${id}.jpg`

export const contacts = [
  { id: "1", name: "Sarah Chen", avatar: avatar(1) },
  { id: "2", name: "Marcus Johnson", avatar: avatar(3) },
  { id: "3", name: "Elena Rodriguez", avatar: avatar(5) },
  { id: "4", name: "James Wilson", avatar: avatar(8) },
  { id: "5", name: "Aisha Patel", avatar: avatar(9) },
  { id: "6", name: "David Kim", avatar: avatar(11) },
  { id: "7", name: "Olivia Brown", avatar: avatar(16) },
  { id: "8", name: "Liam Murphy", avatar: avatar(12) },
]

export type TransferRecord = {
  id: string
  type: "sent" | "received" | "scheduled"
  contactName: string
  contactAvatar: string
  amount: number
  date: string
  status: "completed" | "pending" | "scheduled"
  note?: string
}

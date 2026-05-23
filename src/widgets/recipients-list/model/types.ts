import { Prisma } from "@/generated/prisma/client"

export const recipientSelect = {
  id: true,

  recipient: {
    select: {
      firstName: true,
      lastName: true,
      photoUrl: true,
      tgId: true,
      username: true,
    },
  },
} satisfies Prisma.RecentRecipientSelect

export type Recipient = Prisma.RecentRecipientGetPayload<{
  select: typeof recipientSelect
}>

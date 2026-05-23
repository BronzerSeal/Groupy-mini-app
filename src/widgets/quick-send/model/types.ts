import { Prisma } from "@/generated/prisma/client"

export const recentRecipientsSelect = {
  select: {
    id: true,
    senderId: true,
    recipientId: true,
    sendCount: true,

    recipient: {
      select: {
        tgId: true,
        username: true,
        firstName: true,
        lastName: true,
        photoUrl: true,
      },
    },
  },
} satisfies Prisma.RecentRecipientFindManyArgs

export type RecentRecipientDto = Prisma.RecentRecipientGetPayload<
  typeof recentRecipientsSelect
>

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { useRecepients } from "../queries/useRecepients"
import { RecipientsListSkeleton } from "./recipient-list-skeleton"

const RecipientsList = () => {
  const { recepients: recepientsFromDB, isLoading, cursor } = useRecepients()

  if (isLoading) {
    return <RecipientsListSkeleton />
  }

  if (!recepientsFromDB?.length) {
    return null
  }
  console.log(recepientsFromDB)
  const recipients = recepientsFromDB.map((r) => r.recipient)

  return (
    <section className="mt-3 flex flex-col gap-2">
      {recipients.map((recipient) => (
        <div
          className="flex items-center justify-between rounded-sm rounded-xl bg-[#f3f6fb] p-2 dark:bg-[#141c2e]"
          key={recipient.tgId}
        >
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight">
              {recipient.firstName ?? "name"} {recipient.lastName ?? "lastname"}
            </h1>

            <p className="truncate text-sm text-muted-foreground">
              @{recipient.username ?? "username"}
            </p>
          </div>
          <Avatar size="lg">
            <AvatarImage src={recipient.photoUrl ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ))}
      {cursor}
    </section>
  )
}

export default RecipientsList

"use client"

import { UserRound } from "lucide-react"
import type { UserFromDB } from "@/shared/types/db.types"
import { Card, CardContent } from "@/shared/ui/card"
import { getUserDisplayName } from "../lib/get-user-display-name"

type Props = {
  user: UserFromDB
}

export const SearchUserCard = ({ user }: Props) => {
  const displayName = getUserDisplayName(
    user.firstName,
    user.lastName,
    user.username
  )

  return (
    <Card className="cursor-pointer overflow-hidden border-border/60 bg-card/85 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <CardContent className="flex items-center gap-4 p-4">
        {user.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={displayName}
            className="size-12 rounded-2xl object-cover ring-1 ring-border/60"
          />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-1 ring-primary/15">
            <UserRound className="size-5" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-semibold text-foreground">
              {displayName}
            </p>
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              TG
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted/80">
              {user.username ? `@${user.username}` : "no username"}
            </span>
            <span className="rounded-full bg-muted/60 px-2.5 py-1">
              ID: {user.tgId}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

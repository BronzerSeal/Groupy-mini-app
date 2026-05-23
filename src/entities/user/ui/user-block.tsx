"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { themeParams, useSignal } from "@tma.js/sdk-react"
import { FC } from "react"
import { cn } from "@/lib/utils"

interface Props {
  firstName: string | null | undefined
  lastName: string | null | undefined
  userName: string | null | undefined
  photoUrl: string | null | undefined
}

const UserBlock: FC<Props> = ({ firstName, lastName, userName, photoUrl }) => {
  const colors = useSignal(themeParams.state)

  const bgColor = colors?.secondary_bg_color ?? colors?.bg_color ?? "#18181b"

  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={cn(
        "flex items-center justify-between",
        "rounded-3xl border border-white/5",
        "px-4 py-3",
        "shadow-sm backdrop-blur-sm"
      )}
    >
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold tracking-tight">
          {firstName} {lastName}
        </h1>

        <p className="truncate text-sm text-muted-foreground">@{userName}</p>
      </div>

      <Avatar className="size-14 border border-white/10 shadow-sm">
        <AvatarImage
          src={photoUrl ?? undefined}
          alt={userName ?? "User avatar"}
        />

        <AvatarFallback className="text-sm font-medium">
          {initials || userName?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
    </div>
  )
}

export default UserBlock

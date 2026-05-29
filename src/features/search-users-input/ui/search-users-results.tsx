"use client"

import { Search } from "lucide-react"
import type { UserFromDB } from "@/shared/types/db.types"
import { Card, CardContent } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { SearchUserCard } from "./search-user-card"
import Link from "next/link"

type Props = {
  hasSearch: boolean
  isError: boolean
  isLoading: boolean
  users: UserFromDB[] | undefined
}

export const SearchUsersResults = ({
  hasSearch,
  isError,
  isLoading,
  users,
}: Props) => {
  if (isLoading && hasSearch) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className="overflow-hidden border-border/60 bg-card/80 shadow-sm backdrop-blur-sm"
          >
            <CardContent className="flex items-center gap-3 p-4">
              <Skeleton className="size-12 rounded-2xl bg-[var(--muted)]/80" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 rounded-full bg-[var(--muted)]/80" />
                <Skeleton className="h-3 w-24 rounded-full bg-[var(--muted)]/65" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!isLoading && isError && hasSearch) {
    return (
      <Card className="border-destructive/20 bg-destructive/5 shadow-sm">
        <CardContent className="flex items-center gap-3 p-4 text-sm text-foreground/80">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <Search className="size-4" />
          </div>
          <p>Couldn&apos;t load users right now. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  if (!isLoading && !isError && hasSearch && users?.length === 0) {
    return (
      <Card className="border-dashed border-border/70 bg-card/60 shadow-none">
        <CardContent className="flex items-center gap-3 p-4 text-sm text-foreground/70">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Search className="size-4" />
          </div>
          <div>
            <p className="font-medium text-foreground">No users found</p>
            <p>Try another username, first name, or last name.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!isLoading && !isError && hasSearch && users && users.length > 0) {
    return (
      <div className="flex flex-col space-y-3">
        {users.map((user) => (
          <Link href={`/transaction/${user.id}`} key={user.id}>
            <SearchUserCard user={user} />
          </Link>
        ))}
      </div>
    )
  }

  return null
}

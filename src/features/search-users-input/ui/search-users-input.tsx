"use client"

import { useState } from "react"
import { PlaceholdersAndVanishInput } from "@/shared/ui/placeholder-vanish-input"
import { searchUsersPlaceholders } from "../consts/consts"
import { useUsersByName } from "../queries/queries"
import { SearchUsersResults } from "./search-users-results"
import { initData, useSignal } from "@tma.js/sdk-react"

const SearchUsersInput = ({ className }: { className?: string }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const user = useSignal(initData.state)
  const {
    data: users,
    isLoading,
    isError,
  } = useUsersByName(searchTerm, String(user?.user?.id), !!user?.user?.id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      setSearchTerm("")
    }
  }

  const onSubmit = async (value: string) => {
    setSearchTerm(value)
  }

  const hasSearch = searchTerm.trim().length > 0

  return (
    <div className={className}>
      <PlaceholdersAndVanishInput
        placeholders={searchUsersPlaceholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      <div className="mt-4">
        <SearchUsersResults
          hasSearch={hasSearch}
          isError={isError}
          isLoading={isLoading}
          users={users}
        />
      </div>
    </div>
  )
}

export default SearchUsersInput

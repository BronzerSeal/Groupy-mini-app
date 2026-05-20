"use client"

import { useState } from "react"
import { PlaceholdersAndVanishInput } from "@/shared/ui/placeholder-vanish-input"
import { searchUsersPlaceholders } from "../consts/consts"
import { useUsersByName } from "../queries/queries"
import { SearchUsersResults } from "./search-users-results"

const SearchUsersInput = ({ className }: { className?: string }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data: users, isLoading, isError } = useUsersByName(searchTerm, true)

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

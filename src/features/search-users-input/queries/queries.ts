import { useQuery } from "@tanstack/react-query"
import { GetUsersByName } from "../model/get-users-by-name"

export const useUsersByName = (searchTerm: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["users-by-name", searchTerm],
    queryFn: () => GetUsersByName(searchTerm),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.users
    },
    enabled: enabled && searchTerm.trim().length > 0,
  })
}

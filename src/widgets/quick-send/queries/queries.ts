import { useQuery } from "@tanstack/react-query"
import { getUserRecepientsById } from "../model/get-last-recepients"

export const useUserRecepients = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userQuickRecepients", userId],
    queryFn: () => getUserRecepientsById(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.recepients
    },
    enabled,
  })
}

import { useInfiniteQuery } from "@tanstack/react-query"
import { getUserRecepientsById } from "../model/get-user-recepients"

export const useUserRecepients = (userId: string, enabled: boolean) => {
  return useInfiniteQuery({
    queryKey: ["userRecepients", userId],

    initialPageParam: undefined as string | undefined,

    queryFn: ({ pageParam }) =>
      getUserRecepientsById(userId, {
        cursor: pageParam,
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.status === "error") return undefined

      return lastPage.nextCursor
    },
    select: (result) => result.pages.flatMap((page) => page.recepients),

    enabled,
  })
}

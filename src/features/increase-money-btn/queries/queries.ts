import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetUserCardsName } from "../model/get-user-cards-name"
import { IncreaseUserBalance } from "../model/increase-user-balance"

export const useUserCardsName = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userCards-name", userId],
    queryFn: () => GetUserCardsName(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.cards
    },
    enabled,
  })
}

export const useUpdateCardBalance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["increase-user-balance"],
    mutationFn: ({
      userId,
      cardId,
      amount,
    }: {
      userId: string
      cardId: string
      amount: number
    }) => IncreaseUserBalance(userId, cardId, amount),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userCards", variables.userId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userBalance", variables.userId],
      })
    },
    retry: 1,
  })
}

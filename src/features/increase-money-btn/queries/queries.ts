import { useMutation, useQueryClient } from "@tanstack/react-query"
import { IncreaseUserBalance } from "../model/increase-user-balance"

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

      queryClient.invalidateQueries({
        queryKey: ["userCards-name", variables.userId],
      })
    },
    retry: 1,
  })
}

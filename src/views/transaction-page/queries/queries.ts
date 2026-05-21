import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SendMoney } from "../model/send-money"

export const useSendMoney = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["send-money"],
    mutationFn: ({
      senderId,
      senderCardId,
      amount,
      category,
      merchantLogo,
      merchantId,
      merchantCardId,
      notes,
      cardLast4,
    }: {
      senderId: string
      senderCardId: string
      amount: number
      category?: string
      merchantLogo: string | null
      merchantId: string
      merchantCardId: string
      notes: string | null
      cardLast4?: string
    }) =>
      SendMoney(
        senderId,
        senderCardId,
        amount,
        category,
        merchantLogo,
        merchantId,
        merchantCardId,
        notes,
        cardLast4
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userCards", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userBalance", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userTransactions", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userTransactions", variables.merchantId],
      })
    },
    retry: 1,
  })
}

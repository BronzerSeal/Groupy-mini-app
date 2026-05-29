import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SendMoney } from "../model/send-money"

export const useSendMoneyMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["send-money"],
    mutationFn: ({
      senderId,
      senderCardId,
      amount,
      category,
      merchantId,
      merchantCardId,
      notes,
    }: {
      senderId: string
      senderCardId: string
      amount: number
      category?: string
      merchantId: string
      merchantCardId: string
      notes: string | null
    }) =>
      SendMoney(
        senderId,
        senderCardId,
        amount,
        category,
        merchantId,
        merchantCardId,
        notes
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
        refetchType: "all",
      })

      queryClient.invalidateQueries({
        queryKey: ["userTransactions", variables.merchantId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userRecepients", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userQuickRecepients", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userRecepients", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userCards-name", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userDonutTransactions", variables.senderId],
      })

      queryClient.invalidateQueries({
        queryKey: ["userComparisons", variables.senderId],
      })
    },
    retry: 1,
  })
}

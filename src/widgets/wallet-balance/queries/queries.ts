import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetUserCardsById } from "../model/get-user-cards"
import { CreateCard, CreateCardInput } from "../model/create-card"
import { getUserBalanceById } from "../model/get-user-balance"

export const useUserCards = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userCards", userId],
    queryFn: () => GetUserCardsById(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.cards
    },
    enabled,
  })
}

export const useCreateCard = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["createCard"],

    mutationFn: (card: CreateCardInput) => CreateCard(card),

    onSuccess: (_, variables) => {
      ;(queryClient.invalidateQueries({
        queryKey: ["userCards", String(variables.userId)],
      }),
        queryClient.invalidateQueries({
          queryKey: ["userCards-name", String(variables.userId)],
        }))
    },
  })
}

export const useUserBalance = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["userBalance", userId],
    queryFn: () => getUserBalanceById(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.balance
    },
    enabled,
  })
}

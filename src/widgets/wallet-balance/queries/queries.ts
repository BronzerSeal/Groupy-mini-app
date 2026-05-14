import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { GetUserCardsById } from "../model/get-user-cards"
import { CreateCard, CreateCardInput } from "../model/create-card"

export const useUserCards = (userId: number, enabled: boolean) => {
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
      queryClient.invalidateQueries({
        queryKey: ["userCards", variables.userId],
      })
    },
  })
}

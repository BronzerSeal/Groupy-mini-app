import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getChatMessages } from "../model/get-chat-messages"
import { CreateChatMessage } from "../model/create-chat-message"

export const useChatMessages = (userId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["chatMessages", userId],
    queryFn: () => getChatMessages(userId),
    select: (data) => {
      if (data.status === "error") {
        throw new Error(data.message)
      }
      return data.messages
    },
    enabled,
  })
}

export const useCreateChatMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["create-chat-message"],
    mutationFn: ({
      userId,
      sender,
      text,
    }: {
      userId: string
      sender: "user" | "bot"
      text: string
    }) => CreateChatMessage(userId, sender, text),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chatMessages", variables.userId],
      })
    },
    retry: 1,
  })
}

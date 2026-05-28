import { ChatMessage } from "../model/types"

export const botResponses = [
  "Thanks for reaching out! Let me look into that for you.",
  "I can see your account. Let me pull up the relevant details.",
  "I've escalated this to our specialist team. You should hear back within 2 hours.",
  "Is there anything else I can help you with today?",
]

export const botWelcome = [
  {
    id: "welcome",
    userId: "1",
    sender: "bot",
    text: "Hi there! I'm Vault Assistant. How can I help you today?",
  },
] as ChatMessage[]

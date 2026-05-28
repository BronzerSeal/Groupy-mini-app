export type TabId = "faq" | "contact" | "status"

export type ChatMessage = {
  id: string
  sender: "user" | "bot"
  userId: string
  text: string
}

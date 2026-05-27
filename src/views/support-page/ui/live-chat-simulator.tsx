import { useEffect, useRef, useState } from "react"
import { ChatMessage } from "../model/types"
import { AnimatePresence, motion } from "motion/react"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Card } from "@/shared/ui/card"
import { BotIcon, SendIcon, UserIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { botResponses, botWelcome } from "../consts/bot-constants"
import { useChatMessages, useCreateChatMessage } from "../queries/queries"
import { initData, useSignal } from "@tma.js/sdk-react"

export default function LiveChatSimulator() {
  // const [messages, setMessages] = useState<ChatMessage[]>(botWelcome)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const responseIdx = useRef(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  //BD LOGIC
  const user = useSignal(initData.state)
  const { data: messages } = useChatMessages(
    String(user?.user?.id),
    !!user?.user?.id
  )
  const { mutate: createMessage } = useCreateChatMessage()

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, typing])

  async function handleSend() {
    if (!input.trim()) return
    if (!user?.user?.id) return
    const userMsg = {
      userId: String(user?.user?.id),
      sender: "user" as "user" | "bot",
      text: input.trim(),
    }

    setInput("")

    await createMessage(userMsg)

    setTyping(true)

    setTimeout(
      () => {
        const botText = botResponses[responseIdx.current % botResponses.length]
        responseIdx.current++
        setTyping(false)
        const botMsg = {
          userId: String(user?.user?.id),
          sender: "bot" as "user" | "bot",
          text: botText,
        }
        createMessage(botMsg)
      },
      1200 + Math.random() * 800
    )
  }
  // console.log(messages)
  return (
    <Card className="overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between gap-3 border-b bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BotIcon className="size-4" />
            </div>
            <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div>
            <p className="text-sm font-semibold">Vault Assistant</p>
            <p className="text-[11px] text-muted-foreground">
              Online &middot; Avg. reply: 30s
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400">Mocked</p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[280px] space-y-3 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages?.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex gap-2",
                msg.sender === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  msg.sender === "bot"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.sender === "bot" ? (
                  <BotIcon className="size-3.5" />
                ) : (
                  <UserIcon className="size-3.5 text-muted-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                  msg.sender === "bot"
                    ? "rounded-tl-sm bg-muted"
                    : "rounded-tr-sm bg-primary text-primary-foreground"
                )}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <BotIcon className="size-3.5" />
              </div>
              <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-muted px-3.5 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-1.5 rounded-full bg-muted-foreground/50"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="border-t p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            disabled={typing}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || typing}>
            <SendIcon className="size-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}

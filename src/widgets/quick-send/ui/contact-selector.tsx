"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { LoaderCircleIcon, SendIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "shared/ui/avatar"
import { Button } from "shared/ui/button"
import { Input } from "shared/ui/input"
import type { RecentRecipientDto } from "../model/types"
import { SelectUserCard } from "@/features/select-cards"
import { useUserCardsName } from "@/entities/card"
import { useSendMoney } from "@/features/send-money"
import { initData, useSignal } from "@tma.js/sdk-react"

export type SendState = "idle" | "sending" | "success"

export type SuccessfulSendPayload = {
  recipientName: string
  amount: number
}

type ContactSelectorProps = {
  contacts: RecentRecipientDto[]
  sendState: SendState
  setSendState: (value: SendState) => void
  onSuccess: (payload: SuccessfulSendPayload) => void
}

const ContactSelector = ({
  contacts,
  sendState,
  setSendState,
  onSuccess,
}: ContactSelectorProps) => {
  const user = useSignal(initData.state)
  const { submit } = useSendMoney()
  const [selectedContact, setSelectedContact] = useState(contacts[0]?.id)
  const [selectCardId, setSelectedCardId] = useState<string | undefined>(
    undefined
  )
  const [maxBalance, setMaxBalance] = useState(0)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")

  const selected = contacts.find((contact) => contact.id === selectedContact)
  const { data: recipientCards } = useUserCardsName(
    selected?.recipientId!,
    !!selected?.recipientId
  )
  const firstRecipientCard = recipientCards?.[0]

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleSend = async () => {
    if (
      sendState !== "idle" ||
      !amount ||
      parseFloat(amount) <= 0 ||
      !selected
    ) {
      return
    }

    setSendState("sending")

    if (!user?.user?.id) {
      setSendState("idle")
      return
    }

    const parsedAmount = parseFloat(amount)
    const recipientName = selected.recipient.firstName
      ? `${selected.recipient.firstName} ${selected.recipient.lastName}`
      : (selected.recipient.username ?? "")

    const result = await submit({
      amount: parsedAmount,
      maxBalance,
      selectCardId,
      selectMerchantCardId: firstRecipientCard?.id,
      userId: user?.user.id,
      merchantId: selected.recipientId,
      senderId: String(user?.user.id),
      senderCardId: selectCardId ?? "",
      notes: note,
      pushToHome: false,
    })

    if (!result.success) {
      setSendState("idle")
      return
    }

    timeoutRef.current = setTimeout(() => {
      onSuccess({
        recipientName,
        amount: parsedAmount,
      })

      setAmount("")
      setNote("")
    }, 1500)
  }

  return (
    <motion.div
      key="form"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4 lg:flex-row lg:items-end"
    >
      <div>
        <label className="mb-1.5 block text-xs text-muted-foreground">To</label>
        <div className="flex items-center gap-1 pt-1">
          {contacts.map((contact) => {
            const isSelected = selectedContact === contact.id

            return (
              <motion.button
                key={contact.id}
                onClick={() => {
                  if (sendState === "idle") setSelectedContact(contact.id)
                }}
                className="relative shrink-0 rounded-full"
                animate={{
                  scale: isSelected ? 1 : 0.85,
                  opacity: isSelected ? 1 : 0.6,
                }}
                whileHover={{
                  scale: isSelected ? 1 : 0.95,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <Avatar
                  className={
                    isSelected ? "size-9 ring-2 ring-primary" : "size-8"
                  }
                >
                  <AvatarImage
                    src={contact.recipient.photoUrl ?? undefined}
                    alt={
                      contact.recipient.firstName ??
                      contact.recipient.lastName ??
                      contact.recipient.username ??
                      undefined
                    }
                  />
                  <AvatarFallback className="text-[10px]">
                    {contact.recipient.firstName?.slice(0, 1) ??
                      contact.recipient.lastName?.slice(0, 1) ??
                      contact.recipient.username?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </motion.button>
            )
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedContact}
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.12 }}
            className="text-xs text-muted-foreground"
          >
            Sending to{" "}
            <span className="font-medium text-foreground">
              {selected?.recipient.firstName
                ? `${selected.recipient.firstName} ${selected.recipient.lastName}`
                : selected?.recipient.username}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex-1 space-y-1.5 lg:max-w-[160px]">
        <label className="text-xs text-muted-foreground">Amount</label>
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
            $
          </span>
          <Input
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={sendState === "sending"}
            className="h-9 pl-7 tabular-nums"
            min={1}
            max={maxBalance}
            required
          />
        </div>
      </div>

      <div className="flex-1 space-y-1.5 lg:max-w-[200px]">
        <label className="text-xs text-muted-foreground">
          Choose your card
        </label>
        <SelectUserCard
          selectCardId={selectCardId}
          setSelectedCardId={setSelectedCardId}
          setMaxBalance={setMaxBalance}
        />
      </div>

      <div className="flex-1 space-y-1.5 lg:max-w-[200px]">
        <label className="text-xs text-muted-foreground">
          Note <span className="text-muted-foreground/60">(optional)</span>
        </label>
        <Input
          type="text"
          placeholder="What's it for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={sendState === "sending"}
          className="h-9"
        />
      </div>

      <Button
        className="h-9 gap-2 px-6"
        disabled={sendState === "sending" || !amount || parseFloat(amount) <= 0}
        onClick={handleSend}
      >
        {sendState === "sending" ? (
          <LoaderCircleIcon className="size-4 animate-spin" />
        ) : (
          <SendIcon className="size-4" />
        )}
        {sendState === "sending" ? "Sending..." : "Send"}
      </Button>
    </motion.div>
  )
}

export default ContactSelector

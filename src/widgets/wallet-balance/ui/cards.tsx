"use client"

import { useState, useEffect, useCallback } from "react"
import { CreditCardIcon, PlusIcon } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { AnimatePresence } from "motion/react"
import StackedCards from "./stacked-cards"
import NewCard from "./new-card"
import { initData, useSignal } from "@tma.js/sdk-react"
import { useCreateCard, useUserCards } from "../queries/queries"
import { CARD_VARIANTS, CardVariant } from "../consts/cardStyles"
import { newCardOptions } from "../consts/newCardOptions"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { AccountCardsLoader } from "./account-cards-loader"

type AddState = "idle" | "form" | "adding" | "success"

export function AccountCards() {
  //create card
  const [addState, setAddState] = useState<AddState>("idle")
  const [newCardType, setNewCardType] = useState("savings")
  const [newCardName, setNewCardName] = useState("")

  //bd cards
  const [order, setOrder] = useState<number[]>([])
  const { mutate: createCard } = useCreateCard()
  const user = useSignal(initData.user)
  const { data: bdCards, isLoading } = useUserCards(String(user?.id!), !!user?.id)
  const cards =
    bdCards?.map((card) => {
      const preset = CARD_VARIANTS[card?.variant]

      return {
        ...card,
        ...preset,
      }
    }) ?? []

  useEffect(() => {
    setOrder(cards.map((_, i) => i))
  }, [cards.length])

  // Cycle cards every 5 seconds
  const cycle = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev]
      const front = next.pop()!
      next.unshift(front)
      return next
    })
  }, [])

  useEffect(() => {
    if (addState !== "idle") return
    const id = setInterval(cycle, 5000)
    return () => clearInterval(id)
  }, [cycle, addState])

  const handleAdd = async () => {
    if (!user?.id) return

    const option = newCardOptions.find((o) => o.value === newCardType)!
    const newCard = {
      id: uuidv4(),
      label: newCardName || option.label,
      balance: 0,
      currency: option.currency,
      variant: option.value as CardVariant,
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      userId: String(user.id),
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200))
      await createCard(newCard)

      setAddState("success")

      setTimeout(() => {
        setAddState("idle")
        setNewCardName("")
        setNewCardType("savings")
      }, 1200)
    } catch (error) {
      setAddState("form")
      console.error(error)
      toast.error(
        "Something went wrong while adding the card. Please try again."
      )
    }
  }

  if (isLoading) {
    return <AccountCardsLoader />
  }

  return (
    <Card className="bg-transparent shadow-none ring-0">
      <CardContent className="flex flex-col gap-5 pt-6">
        <AnimatePresence mode="wait">
          {addState === "idle" ? (
            <StackedCards order={order} cards={cards} cycle={cycle} />
          ) : (
            <NewCard
              addState={addState}
              newCardName={newCardName}
              newCardType={newCardType}
              setNewCardName={setNewCardName}
              handleAdd={handleAdd}
              newCardOptions={newCardOptions}
              setAddState={setAddState}
              setNewCardType={setNewCardType}
            />
          )}
        </AnimatePresence>

        {/* Card count + add */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CreditCardIcon className="size-3.5" />
            <span>{cards.length} cards</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-7 rounded-full"
            onClick={() => addState === "idle" && setAddState("form")}
          >
            <PlusIcon className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

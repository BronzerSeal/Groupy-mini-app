"use client"

import { useState, useEffect, useCallback } from "react"
import { accountCards } from "../consts/seed"
import {
  CreditCardIcon,
  PlusIcon,
  TrendingUpIcon,
  EuroIcon,
  BitcoinIcon,
  ChartLineIcon,
} from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { AnimatePresence } from "motion/react"
import StackedCards from "./stacked-cards"
import NewCard from "./new-card"

type AddState = "idle" | "form" | "adding" | "success"

const initialCards = [
  {
    ...accountCards[0],
    style: "bg-muted text-foreground",
    icon: <EuroIcon className="size-5 opacity-30" />,
    chipColor: "bg-foreground/10",
    last4: "4589",
  },
  {
    ...accountCards[1],
    style: "bg-primary text-primary-foreground",
    icon: <BitcoinIcon className="size-5 opacity-30" />,
    chipColor: "bg-primary-foreground/20",
    last4: "7321",
  },
  {
    ...accountCards[2],
    style: "bg-card text-card-foreground ring-1 ring-border",
    icon: <ChartLineIcon className="size-5 opacity-30" />,
    chipColor: "bg-foreground/10",
    last4: "9012",
  },
]

const newCardOptions = [
  {
    value: "savings",
    label: "Savings Account",
    currency: "$",
    style: "bg-emerald-600 text-white",
    icon: <TrendingUpIcon className="size-5 opacity-30" />,
    chipColor: "bg-white/20",
  },
  {
    value: "business",
    label: "Business Account",
    currency: "$",
    style: "bg-violet-600 text-white",
    icon: <CreditCardIcon className="size-5 opacity-30" />,
    chipColor: "bg-white/20",
  },
  {
    value: "travel",
    label: "Travel Card",
    currency: "€",
    style: "bg-amber-600 text-white",
    icon: <EuroIcon className="size-5 opacity-30" />,
    chipColor: "bg-white/20",
  },
]

export function AccountCards() {
  const [cards, setCards] = useState(initialCards)
  const [order, setOrder] = useState(() => initialCards.map((_, i) => i))
  const [addState, setAddState] = useState<AddState>("idle")
  const [newCardType, setNewCardType] = useState("savings")
  const [newCardName, setNewCardName] = useState("")

  console.log(cards)

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

  const handleAdd = () => {
    setAddState("adding")
    setTimeout(() => {
      const option = newCardOptions.find((o) => o.value === newCardType)!
      const newCard = {
        id: String(cards.length + 1),
        label: newCardName || option.label,
        balance: "0",
        currency: option.currency,
        variant: "default" as const,
        style: option.style,
        icon: option.icon,
        chipColor: option.chipColor,
        last4: String(Math.floor(1000 + Math.random() * 9000)),
      }
      setCards((prev) => [...prev, newCard])
      setOrder((prev) => [...prev, prev.length])
      setAddState("success")
      setTimeout(() => {
        setAddState("idle")
        setNewCardName("")
      }, 1500)
    }, 1200)
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

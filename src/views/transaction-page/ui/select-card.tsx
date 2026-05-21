"use client"

import { useUserCardsName } from "@/entities/card"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/coss-select"
import { initData, useSignal } from "@tma.js/sdk-react"

import { Dispatch, FC, SetStateAction, useEffect } from "react"

interface Props {
  selectCardId: string | undefined
  setSelectedCardId: Dispatch<SetStateAction<string | undefined>>
  setMaxBalance: Dispatch<SetStateAction<number>>
}

const SelectCard: FC<Props> = ({
  selectCardId,
  setSelectedCardId,
  setMaxBalance,
}) => {
  const user = useSignal(initData.user)

  const {
    data: userCards,
    isLoading,
    isError,
  } = useUserCardsName(String(user?.id), !!user?.id)

  const firstCard = userCards?.[0]

  useEffect(() => {
    if (!selectCardId && firstCard) {
      setSelectedCardId(firstCard.id)
      setMaxBalance(firstCard.balance)
    }
  }, [firstCard, selectCardId, setMaxBalance, setSelectedCardId])

  if (isLoading) return null
  if (!userCards?.length) return <div>no cards</div>

  const selectedCard = userCards.find((card) => card.id === selectCardId) ?? userCards[0]

  return (
    <>
      <Select
        aria-label="Select card"
        value={selectedCard}
        onValueChange={(card) => {
          setSelectedCardId(card?.id)
          setMaxBalance(card?.balance ?? 0)
        }}
        itemToStringValue={(card) => card.label}
      >
        <SelectTrigger className="py-1">
          <SelectValue>
            {(card) => (
              <span className="flex flex-col">
                <span className="truncate">{card?.label}</span>

                <span className="truncate text-xs text-muted-foreground">
                  {card?.balance}
                </span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectPopup>
          {userCards.map((card) => (
            <SelectItem key={card.id} value={card}>
              <span className="flex flex-col">
                <span className="truncate">{card.label}</span>

                <span className="truncate text-xs text-muted-foreground">
                  balance: {card.balance}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>

      {isError && (
        <div className="p-4 text-center text-red-500">
          Error loading cards. Please try again later.
        </div>
      )}
    </>
  )
}

export default SelectCard

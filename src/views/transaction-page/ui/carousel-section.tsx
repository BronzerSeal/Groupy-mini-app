import CardBlock from "@/entities/card"
import { AccountCard } from "@/shared/types/db.types"
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel"
import { CARD_VARIANTS } from "../consts/CARD_VARIANTS"
import { Dispatch, SetStateAction } from "react"

const CarouselSection = ({
  cards,
  selectedCardId,
  setSelectedCardId,
}: {
  cards: AccountCard[] | undefined
  selectedCardId: string | undefined
  setSelectedCardId: Dispatch<SetStateAction<string | undefined>>
}) => {
  if (cards === undefined) return
  const fullCards =
    cards?.map((card) => {
      const preset = CARD_VARIANTS[card?.variant]

      return {
        ...card,
        ...preset,
      }
    }) ?? []

  return (
    <Carousel>
      <CarouselContent className="-ml-2">
        {fullCards.map((card) => (
          <CarouselItem
            key={card.id}
            onClick={() => setSelectedCardId(card.id)}
            className={"basis-[85%] pl-2 sm:basis-1/2 md:basis-1/3"}
          >
            <CardBlock selectedCardId={selectedCardId} card={card} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselSection

import CardBlock from "@/entities/card-block"
import { AccountCard } from "@/shared/types/db.types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel"
import { CARD_VARIANTS } from "../consts/CARD_VARIANTS"

const CarouselSection = ({ cards }: { cards: AccountCard[] | undefined }) => {
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
            className="basis-[85%] pl-2 sm:basis-1/2 md:basis-1/3"
          >
            <CardBlock card={card} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselSection

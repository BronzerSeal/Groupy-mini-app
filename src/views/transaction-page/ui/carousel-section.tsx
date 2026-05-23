import CardBlock from "@/entities/card"
import { AccountCard } from "@/shared/types/db.types"
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel"
import { Skeleton } from "@/shared/ui/skeleton"
import { CARD_VARIANTS } from "../consts/CARD_VARIANTS"
import { Dispatch, SetStateAction } from "react"

const skeletonItems = Array.from({ length: 3 }, (_, index) => index)

const CarouselCardSkeleton = () => {
  return (
    <div className="w-full overflow-hidden rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="size-11 shrink-0 rounded-xl" />

        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="mt-2 h-3 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

const CarouselSection = ({
  cards,
  selectedCardId,
  setSelectedCardId,
}: {
  cards: AccountCard[] | undefined
  selectedCardId: string | undefined
  setSelectedCardId: Dispatch<SetStateAction<string | undefined>>
}) => {
  if (cards === undefined) {
    return (
      <Carousel>
        <CarouselContent className="-ml-2">
          {skeletonItems.map((item) => (
            <CarouselItem
              key={item}
              className={"basis-[85%] pl-2 sm:basis-1/2 md:basis-1/3"}
            >
              <CarouselCardSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }

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

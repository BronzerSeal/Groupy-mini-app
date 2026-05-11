import { cn } from "@/lib/utils"
import { NfcIcon } from "lucide-react"
import { motion } from "motion/react"
import { ReactNode } from "react"

interface Props {
  order: number[]
  cycle: () => void
  cards: {
    style: string
    icon: ReactNode
    chipColor: string
    last4: string
    id: string
    label: string
    balance: string
    currency: string
    variant: "default" | "dark" | "primary"
  }[]
}

const StackedCards: React.FC<Props> = ({ order, cards, cycle }) => {
  return (
    <motion.div
      key="cards"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Stacked cards */}
      <div className="relative h-[200px]">
        {order.map((cardIndex, stackPos) => {
          const c = cards[cardIndex]
          if (!c) return null
          const isFront = stackPos === order.length - 1
          const maxOffset = 48 / Math.max(order.length - 1, 1)
          return (
            <motion.button
              key={c.id}
              onClick={cycle}
              layout
              animate={{
                y: stackPos * Math.min(maxOffset, 16),
                scale:
                  1 -
                  (order.length - 1 - stackPos) *
                    (0.12 / Math.max(order.length - 1, 1)),
                zIndex: stackPos,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 28,
              }}
              className={cn(
                "absolute inset-x-0 flex h-[152px] cursor-pointer flex-col justify-between rounded-2xl px-5 py-4",
                c.style,
                isFront ? "shadow-xl" : "shadow-md"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wide">
                  {c.label}
                </span>
                {c.icon}
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("h-7 w-10 rounded-md", c.chipColor)} />
                <NfcIcon className="size-4 opacity-20" />
              </div>
              <div className="flex items-end justify-between">
                <span className="font-mono text-[10px] tracking-widest opacity-40">
                  **** {c.last4}
                </span>
                <p className="text-xl font-bold tracking-tight tabular-nums">
                  {c.currency === "BTC"
                    ? `${c.balance} ${c.currency}`
                    : `${c.currency}${c.balance}`}
                </p>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

export default StackedCards

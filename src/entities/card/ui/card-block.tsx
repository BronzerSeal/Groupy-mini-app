import { cn } from "@/lib/utils"
import { AccountCard, CardPreset } from "@/shared/types/db.types"

const CardBlock = ({
  card,
  selectedCardId,
}: {
  card: AccountCard & CardPreset
  selectedCardId: string | undefined
}) => {
  const Icon = card.icon
  return (
    <button
      className={cn(
        "relative w-full overflow-hidden rounded-2xl",
        "p-4",
        "transition-all duration-200",
        "active:scale-[0.98]",
        "shadow-sm",
        selectedCardId === card.id && "border border-blue-300",
        card.style
      )}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          <Icon className="size-5 opacity-90" />
        </div>

        <div className="min-w-0 flex-1 text-left">
          <h2 className="truncate text-sm font-semibold">{card.label}</h2>

          <p className="mt-0.5 text-xs tracking-[0.2em] opacity-70">
            •••• {card.last4}
          </p>
        </div>
      </div>
    </button>
  )
}

export default CardBlock

"use client"

import { initData, useSignal } from "@tma.js/sdk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  ArrowLeft,
  Banknote,
  Check,
  ChevronRight,
  Gift,
  LoaderCircle,
  MessageSquareText,
  SendHorizontal,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { UseUserInfoById } from "@/features/auth"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { BackButtonHandler } from "@/shared/ui/telegram/back-button-handler"
import { CARD_VARIANTS } from "@/widgets/wallet-balance/consts/cardStyles"
import { useUserCards } from "@/widgets/wallet-balance/queries/queries"
import { SendMoney } from "../model/send-money"

const QUICK_AMOUNTS = [1000, 2000, 5000]

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("ru-RU").format(amount)

const getDisplayName = ({
  firstName,
  lastName,
  username,
}: {
  firstName: string | null
  lastName: string | null
  username: string | null
}) => {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim()

  if (fullName) return fullName
  if (username) return `@${username}`

  return "Unknown user"
}

const TransactionPage = () => {
  const router = useRouter()
  const params = useParams<{ userId: string }>()
  const queryClient = useQueryClient()
  const telegramUser = useSignal(initData.user)
  const senderTgId = telegramUser?.id ? String(telegramUser.id) : ""
  const recipientId = typeof params.userId === "string" ? params.userId : ""

  const [transferKind, setTransferKind] = useState<"send" | "gift">("send")
  const [selectedCardId, setSelectedCardId] = useState("")
  const [amountInput, setAmountInput] = useState("")
  const [message, setMessage] = useState("")

  const { data: recipient, isLoading: isRecipientLoading } = UseUserInfoById(
    recipientId,
    !!recipientId
  )

  const { data: senderCards = [], isLoading: isCardsLoading } = useUserCards(
    senderTgId,
    !!senderTgId
  )

  useEffect(() => {
    if (!selectedCardId && senderCards.length > 0) {
      setSelectedCardId(senderCards[0].id)
    }
  }, [selectedCardId, senderCards])

  const selectedCard =
    senderCards.find((card) => card.id === selectedCardId) ?? senderCards[0]

  const amount = Number(amountInput.replace(/[^\d]/g, "")) || 0

  const sendMoneyMutation = useMutation({
    mutationKey: ["send-money", senderTgId, recipientId],
    mutationFn: async () => {
      if (!selectedCard) {
        throw new Error("Select a card to send money from")
      }

      if (!recipient) {
        throw new Error("Recipient is not loaded yet")
      }

      return SendMoney(
        senderTgId,
        selectedCard.id,
        amount,
        transferKind,
        recipient.photoUrl,
        recipient.id,
        message.trim() || null,
        selectedCard.last4
      )
    },
    onSuccess: async (result) => {
      if (result.status === "error") {
        toast.error(result.message)
        return
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["userCards", senderTgId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["userTransactions", senderTgId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["userBalance", senderTgId],
        }),
      ])

      toast.success(`Transfer completed: ${formatCurrency(amount)} ₽`)
      router.push("/")
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to send money"
      )
    },
  })

  const handleAmountChange = (value: string) => {
    const digitsOnly = value.replace(/[^\d]/g, "")
    setAmountInput(digitsOnly)
  }

  const handleQuickAmount = (value: number) => {
    setAmountInput(String(value))
  }

  const handleSubmit = () => {
    if (!senderTgId) {
      toast.error("Current user is not available")
      return
    }

    if (!recipient) {
      toast.error("Recipient is not available")
      return
    }

    if (!selectedCard) {
      toast.error("Choose a card first")
      return
    }

    if (amount <= 0) {
      toast.error("Enter transfer amount")
      return
    }

    sendMoneyMutation.mutate()
  }

  return (
    <>
      <BackButtonHandler />

      <div className="mx-auto flex min-h-[100svh] w-full max-w-md flex-col bg-background px-4 pb-8 pt-4 text-foreground">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex size-11 items-center justify-center rounded-full bg-card/70 text-foreground transition-colors hover:bg-card"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div>
            <p className="text-2xl font-semibold tracking-tight">
              Новый перевод
            </p>
            <p className="text-sm text-muted-foreground">
              Отправка денег внутри Groupy
            </p>
          </div>
        </div>

        <Card className="border-border/60 bg-card/80 shadow-none backdrop-blur-sm">
          <CardContent className="flex items-center gap-4 p-4">
            <Avatar size="lg" className="size-14 ring-1 ring-border/60">
              <AvatarImage src={recipient?.photoUrl ?? undefined} />
              <AvatarFallback className="bg-primary/15 font-semibold text-primary">
                {getDisplayName({
                  firstName: recipient?.firstName ?? null,
                  lastName: recipient?.lastName ?? null,
                  username: recipient?.username ?? null,
                })
                  .slice(0, 1)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-lg font-semibold">
                {isRecipientLoading
                  ? "Loading recipient..."
                  : recipient
                    ? getDisplayName(recipient)
                    : "Recipient not found"}
              </p>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {recipient?.username
                  ? `@${recipient.username}`
                  : recipient?.tgId
                    ? `Telegram ID: ${recipient.tgId}`
                    : "Open from the friends search to pick a user"}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setTransferKind("send")}
            className={cn(
              "flex h-14 items-center justify-center gap-3 rounded-2xl border text-lg font-semibold transition-all",
              transferKind === "send"
                ? "border-white bg-white text-black shadow-[0_12px_30px_rgba(255,255,255,0.14)]"
                : "border-border/50 bg-card/75 text-foreground/85"
            )}
          >
            <Banknote className="size-5" />
            Деньги
          </button>

          <button
            type="button"
            onClick={() => setTransferKind("gift")}
            className={cn(
              "flex h-14 items-center justify-center gap-3 rounded-2xl border text-lg font-semibold transition-all",
              transferKind === "gift"
                ? "border-white bg-white text-black shadow-[0_12px_30px_rgba(255,255,255,0.14)]"
                : "border-border/50 bg-card/75 text-foreground/85"
            )}
          >
            <Gift className="size-5" />
            Подарок
          </button>
        </div>

        <section className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Выберите карту
            </p>
            <p className="text-xs text-muted-foreground">
              {senderCards.length} доступно
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1">
            {senderCards.map((card) => {
              const preset =
                CARD_VARIANTS[
                  card.variant as keyof typeof CARD_VARIANTS
                ] ?? CARD_VARIANTS.default
              const Icon = preset.icon
              const isSelected = selectedCard?.id === card.id

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedCardId(card.id)}
                  className={cn(
                    "min-w-[164px] rounded-[26px] border p-4 text-left transition-all",
                    preset.style,
                    isSelected
                      ? "border-emerald-400 ring-2 ring-emerald-400/70"
                      : "border-transparent opacity-85"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-black/15 backdrop-blur-sm">
                        <Icon className="size-5" />
                      </div>
                      {isSelected ? (
                        <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Check className="size-4" />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <p className="mt-5 text-xl font-semibold">
                    {formatCurrency(card.balance)} ₽
                  </p>
                  <p className="mt-1 text-sm opacity-80">{card.label}</p>
                  <p className="mt-1 text-xs opacity-65">•• {card.last4}</p>
                </button>
              )
            })}
          </div>
        </section>

        <Card className="mt-5 border-border/60 bg-card/85 shadow-none">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Сколько</p>
            <div className="mt-2 flex items-end gap-2">
              <Input
                type="text"
                inputMode="numeric"
                value={amountInput}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder="0"
                className="h-auto border-none bg-transparent px-0 py-0 text-4xl font-semibold shadow-none focus-visible:ring-0"
              />
              <span className="pb-1 text-3xl font-semibold">₽</span>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex flex-wrap gap-3">
          {QUICK_AMOUNTS.map((quickAmount) => (
            <button
              key={quickAmount}
              type="button"
              onClick={() => handleQuickAmount(quickAmount)}
              className={cn(
                "rounded-full px-5 py-3 text-base font-semibold transition-colors",
                amount === quickAmount
                  ? "bg-white text-black"
                  : "bg-card/80 text-foreground/90 hover:bg-card"
              )}
            >
              {formatCurrency(quickAmount)} ₽
            </button>
          ))}
        </div>

        <Card className="mt-5 border-border/60 bg-card/85 shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">Откуда</p>
              <p className="mt-2 text-3xl font-semibold">
                {selectedCard ? `${formatCurrency(selectedCard.balance)} ₽` : "0 ₽"}
              </p>
              <p className="mt-2 truncate text-base text-muted-foreground">
                {selectedCard
                  ? `${selectedCard.label} •• ${selectedCard.last4}`
                  : "Выберите карту"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-lime-300 via-emerald-400 to-green-500 p-3 text-black shadow-[0_10px_35px_rgba(52,211,153,0.35)]">
                <SendHorizontal className="size-5" />
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 border-border/60 bg-card/85 shadow-none">
          <CardContent className="p-5">
            <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MessageSquareText className="size-4" />
              Сообщение
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                transferKind === "gift"
                  ? "Напиши пару тёплых слов"
                  : "Сообщение к переводу"
              }
              className="min-h-24 w-full resize-none rounded-2xl border border-border/50 bg-background/30 px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </CardContent>
        </Card>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={
            sendMoneyMutation.isPending ||
            isCardsLoading ||
            isRecipientLoading ||
            !recipient ||
            !selectedCard ||
            amount <= 0
          }
          className="mt-8 h-16 rounded-[24px] bg-emerald-600 text-xl font-semibold text-white shadow-[0_20px_45px_rgba(22,163,74,0.35)] hover:bg-emerald-500"
        >
          {sendMoneyMutation.isPending ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              Переводим...
            </>
          ) : (
            `Перевести ${formatCurrency(amount)} ₽`
          )}
        </Button>
      </div>
    </>
  )
}

export default TransactionPage

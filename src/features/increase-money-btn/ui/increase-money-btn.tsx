import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { initData, themeParams, useSignal } from "@tma.js/sdk-react"
import { BadgePlus } from "lucide-react"
import { useUpdateCardBalance } from "../queries/queries"
import { ChangeEvent, useEffect, useState } from "react"
import { toast } from "sonner"
import { IncreaseMoneyBtnLoader } from "./increase-money-btn-loader"
import { useUserCardsName } from "@/entities/card"

const IncreaseMoneyBtn = () => {
  const user = useSignal(initData.state)
  const { button_color, button_text_color } = useSignal(themeParams.state)
  const {
    data: cards,
    isLoading,
    isError,
  } = useUserCardsName(String(user?.user?.id!), !!user?.user?.id)

  //update Balance
  const { mutateAsync, isPending } = useUpdateCardBalance()
  const [selectCardId, setSelectedCardId] = useState(cards?.[0]?.id)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (!selectCardId && cards?.length) {
      setSelectedCardId(cards[0].id)
    }
  }, [cards, selectCardId])

  const handleUpdateBalance = async () => {
    if (!user?.user?.id || !selectCardId) return

    try {
      const result = await mutateAsync({
        userId: String(user?.user.id),
        cardId: selectCardId,
        amount,
      })

      if (result.status === "error") {
        toast.error(result.message)
        return
      }

      setSelectedCardId(undefined)
      setAmount(0)
      toast.success("Succesfull updated")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Try again later")
    }
  }

  if (!button_color || !button_text_color) {
    return <IncreaseMoneyBtnLoader />
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex h-13 w-full max-w-100 items-center justify-center gap-2 rounded-3xl px-4 py-2"
          style={{ backgroundColor: button_color, color: button_text_color }}
        >
          <BadgePlus size={28} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Increase your money</DialogTitle>
          <DialogDescription>
            P.s: This is just a demo logic button for test.
          </DialogDescription>
        </DialogHeader>

        <Select
          disabled={isLoading || isError}
          value={selectCardId}
          onValueChange={setSelectedCardId}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a card" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cards</SelectLabel>
              {cards?.map((card) => (
                <SelectItem key={card.id} value={card.id}>
                  {card.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isError && (
          <div className="p-4 text-center text-red-500">
            Error loading cards. Please try again later.
          </div>
        )}

        <Input
          placeholder="Enter amount"
          type="number"
          max={10000}
          min={1}
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(Number(e.target.value))
          }
        />

        <DialogFooter className="flex-row justify-end">
          <DialogClose asChild>
            <Button
              className="w-fit"
              style={{
                backgroundColor: button_color,
                color: button_text_color,
              }}
              variant="outline"
              disabled={isPending}
              onClick={handleUpdateBalance}
            >
              Send
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default IncreaseMoneyBtn

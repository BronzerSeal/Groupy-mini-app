"use client"
import { UseUserInfoById } from "@/features/auth"
import UserBlock from "@/entities/user"
import { useParams, useRouter } from "next/navigation"
import CarouselSection from "./carousel-section"
import { Input } from "@/shared/ui/input"

import { ChangeEvent, useState } from "react"
import SelectCard from "./select-card"
import { Textarea } from "@/shared/ui/textarea"
import { NoiseBackground } from "@/shared/ui/noise-bg"
import { useSendMoney } from "../queries/queries"
import { initData, useSignal } from "@tma.js/sdk-react"
import { toast } from "sonner"

const fieldSurfaceClassName =
  "border-white/35 bg-slate-50/75 backdrop-blur-sm dark:border-white/10 dark:bg-slate-950/45"

const TransactionPage = () => {
  const { userId: merchantId } = useParams<{ userId: string }>()
  const router = useRouter()
  const user = useSignal(initData.user)
  const [selectCardId, setSelectedCardId] = useState<string | undefined>(
    undefined
  )
  const [selectMerchantCardId, setSelectMerchantCardId] = useState<
    string | undefined
  >(undefined)
  const { mutate: sendMoney } = useSendMoney()

  const [maxBalance, setMaxBalance] = useState(0)
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [error, setError] = useState("")

  const { data: merchantUser } = UseUserInfoById(merchantId, true, !!merchantId)

  const handleSubmit = () => {
    setError("")

    if (+amount < 1) {
      setError("you can't send less than 1")
      return
    }

    if (+amount > maxBalance) {
      setError("not enough money")
      return
    }

    if (!selectCardId) {
      setError("choose your card")
      return
    }

    if (!selectMerchantCardId) {
      setError("choose merchand card")
      return
    }

    if (!user?.id || !merchantUser?.id) {
      setError("no data provided")
      return
    }

    try {
      sendMoney({
        senderId: String(user.id),
        senderCardId: selectCardId,
        amount: +amount,
        merchantLogo: merchantUser?.photoUrl ?? null,
        merchantId: merchantUser?.id,
        merchantCardId: selectMerchantCardId,
        notes: note,
      })
      toast.success("success")
      router.push("/")
    } catch {
      setError("something went wrong")
      toast.error("something went wrong. Try again later")
    }
  }
  return (
    <>
      <h1 className="text-2xl font-bold">New payment</h1>

      <UserBlock
        firstName={merchantUser?.firstName}
        lastName={merchantUser?.lastName}
        userName={merchantUser?.username}
        photoUrl={merchantUser?.photoUrl}
      />

      <section className="mt-3">
        <CarouselSection
          cards={merchantUser?.cards}
          selectedCardId={selectMerchantCardId}
          setSelectedCardId={setSelectMerchantCardId}
        />
      </section>

      <section className="my-2">
        <h1 className="mb-1 text-xl font-semibold">How many</h1>
        <NoiseBackground
          containerClassName="
    [--noise-1:rgb(226,232,240)]
    [--noise-2:rgb(191,219,254)]
    [--noise-3:rgb(216,180,254)]

    dark:[--noise-1:rgb(17,24,39)]
    dark:[--noise-2:rgb(30,41,59)]
    dark:[--noise-3:rgb(49,46,129)]
  "
          gradientColors={[
            "var(--noise-1)",
            "var(--noise-2)",
            "var(--noise-3)",
          ]}
        >
          <Input
            className={fieldSurfaceClassName}
            disabled={!selectCardId}
            value={amount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAmount(e.target.value)
            }
            placeholder="enter amount"
            type="number"
            min={1}
            max={maxBalance}
            required
          />
        </NoiseBackground>
      </section>

      <section className="my-2">
        <h1 className="mb-1 text-xl font-semibold">Choose card: </h1>
        <NoiseBackground
          containerClassName="
    [--noise-1:rgb(226,232,240)]
    [--noise-2:rgb(191,219,254)]
    [--noise-3:rgb(216,180,254)]

    dark:[--noise-1:rgb(17,24,39)]
    dark:[--noise-2:rgb(30,41,59)]
    dark:[--noise-3:rgb(49,46,129)]
  "
          gradientColors={[
            "var(--noise-1)",
            "var(--noise-2)",
            "var(--noise-3)",
          ]}
        >
          <SelectCard
            selectCardId={selectCardId}
            setSelectedCardId={setSelectedCardId}
            setMaxBalance={setMaxBalance}
            triggerClassName={fieldSurfaceClassName}
          />
        </NoiseBackground>
      </section>

      <section>
        <h1 className="mb-1 text-xl font-semibold">Note: </h1>
        <NoiseBackground
          containerClassName="
    [--noise-1:rgb(226,232,240)]
    [--noise-2:rgb(191,219,254)]
    [--noise-3:rgb(216,180,254)]

    dark:[--noise-1:rgb(17,24,39)]
    dark:[--noise-2:rgb(30,41,59)]
    dark:[--noise-3:rgb(49,46,129)]
  "
          gradientColors={[
            "var(--noise-1)",
            "var(--noise-2)",
            "var(--noise-3)",
          ]}
        >
          <Textarea
            className={fieldSurfaceClassName}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Type your message here."
          />
        </NoiseBackground>
      </section>

      <div className="mt-2 flex-col justify-center">
        {error && (
          <div className="mt-3 mb-2 flex items-center gap-2 rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span>{error}</span>
          </div>
        )}
        <NoiseBackground
          containerClassName="w-fit rounded-sm mx-auto mb-18"
          gradientColors={[
            "rgb(255, 100, 150)",
            "rgb(100, 150, 255)",
            "rgb(255, 200, 100)",
          ]}
        >
          <button
            onClick={handleSubmit}
            className="h-full w-full cursor-pointer rounded-sm bg-linear-to-r from-neutral-100 via-neutral-100 to-white px-4 py-2 text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-98 dark:from-black dark:via-black dark:to-neutral-900 dark:text-white dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]"
          >
            transfer {amount} dollars
          </button>
        </NoiseBackground>
      </div>
    </>
  )
}

export default TransactionPage

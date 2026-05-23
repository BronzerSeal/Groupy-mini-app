import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { validateSendMoney } from "../model/validate-send-money"
import { useSendMoneyMutation as useSendMoneyMutation } from "../queries/queries"

export interface SendMoneyData {
  amount: number
  maxBalance: number
  selectCardId: string | undefined
  selectMerchantCardId: string | undefined
  userId: number | undefined
  merchantId: string | undefined
  senderId: string
  senderCardId: string
  notes?: string | null
  pushToHome: boolean
  category?: string
}

export const useSendMoney = () => {
  const router = useRouter()
  const mutation = useSendMoneyMutation()

  const submit = async (data: SendMoneyData) => {
    const error = validateSendMoney({
      amount: data.amount,
      maxBalance: data.maxBalance,
      selectCardId: data.selectCardId,
      selectMerchantCardId: data.selectMerchantCardId,
      userId: data.userId,
      merchantId: data.merchantId,
    })

    if (error) {
      toast.error(error)

      return {
        success: false as const,
        error,
      }
    }

    try {
      const result = await mutation.mutateAsync({
        senderId: data.senderId,
        senderCardId: data.senderCardId,
        amount: data.amount,
        category: data.category,
        merchantId: data.merchantId!,
        merchantCardId: data.selectMerchantCardId!,
        notes: data.notes ?? null,
      })

      if (result.status === "error") {
        toast.error(result.message)

        return {
          success: false as const,
          error: result.message,
        }
      }

      toast.success("success")
      if (data.pushToHome) {
        router.push("/")
      }

      return {
        success: true as const,
        data: result,
      }
    } catch {
      const message = "something went wrong"

      toast.error(message)

      return {
        success: false as const,
        error: message,
      }
    }
  }

  return {
    submit,
    ...mutation,
  }
}

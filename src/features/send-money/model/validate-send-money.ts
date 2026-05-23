interface Props {
  amount: number
  maxBalance: number
  selectCardId: string | undefined
  selectMerchantCardId: string | undefined
  userId: number | undefined
  merchantId: string | undefined
}

export const validateSendMoney = ({
  amount,
  maxBalance,
  selectCardId,
  selectMerchantCardId,
  userId,
  merchantId,
}: Props): string | null => {
  if (amount < 1) {
    return "you can't send less than 1"
  }

  if (amount > maxBalance) {
    return "not enough money"
  }

  if (!selectCardId) {
    return "choose your card"
  }

  if (!selectMerchantCardId) {
    return "choose merchant card"
  }

  if (!userId || !merchantId) {
    return "no data provided"
  }

  return null
}

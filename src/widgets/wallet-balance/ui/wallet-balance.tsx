import { themeParams, useSignal } from "@tma.js/sdk-react"
import { AccountCards } from "./cards"

const WalletBalance = () => {
  const colors = useSignal(themeParams.state)

  if (!colors.bg_color) {
    return <p>loading</p>
  }

  const textColor = colors.text_color || "#000000"

  return (
    <div style={{ color: textColor }} className="space-y-1.5 pt-5">
      <p className="text-4xl">Total Balance</p>
      <p className="text-6xl font-bold tracking-tight tabular-nums">$8800,90</p>
      <AccountCards />
    </div>
  )
}

export default WalletBalance

import { themeParams, useSignal } from "@tma.js/sdk-react"
import { TrendingUpIcon } from "lucide-react"

const WalletBalance = () => {
  const colors = useSignal(themeParams.state)

  if (!colors.bg_color) {
    return <p>loading</p>
  }

  const textColor = colors.text_color || "#000000"
  console.log(textColor)

  return (
    <div style={{ color: textColor }} className="space-y-1.5 pt-5">
      <p className="text-6xl font-medium">Total Balance</p>
      <p className="text-3xl font-bold tracking-tight tabular-nums">
        {/* ${walletBalance.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} */}
        $200000
      </p>
      {/* <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUpIcon className="size-4" />
            <span>+{walletBalance.changePercent}% this month</span>
          </div> */}
    </div>
  )
}

export default WalletBalance

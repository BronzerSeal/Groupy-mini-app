import { initData, themeParams, useSignal } from "@tma.js/sdk-react"
import { AccountCards } from "./cards"
import { useUserBalance } from "../queries/queries"
import { WalletBalanceLoader } from "./wallet-balance-loader"

const WalletBalance = () => {
  const colors = useSignal(themeParams.state)
  const user = useSignal(initData.user)
  const { data: balance, isLoading } = useUserBalance(
    String(user?.id!),
    !!user?.id
  )

  if (!colors.bg_color) {
    return <WalletBalanceLoader />
  }

  const textColor = colors.text_color || "#000000"
  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance ?? 0)
  const [wholePart, fractionPart = "00"] = formattedBalance.split(".")

  return (
    <div style={{ color: textColor }} className="space-y-1.5 pt-5">
      {isLoading ? (
        <WalletBalanceLoader />
      ) : (
        <>
          <p className="text-sm font-medium tracking-[-0.02em] opacity-80">
            Total Balance
          </p>
          <p className="flex items-start gap-[1px] font-bold tracking-[-0.06em] tabular-nums">
            <span className="text-[2.65rem] leading-none sm:text-5xl">
              ${wholePart}
            </span>
            <span className="pt-[0.22em] text-[2.1rem] leading-none opacity-45 sm:text-[2.6rem]">
              .{fractionPart}
            </span>
          </p>
        </>
      )}
      <AccountCards />
    </div>
  )
}

export default WalletBalance

import WalletBalance from "@/widgets/wallet-balance"
import { initData, useSignal } from "@tma.js/sdk-react"

const HomeClient = () => {
  const user = useSignal(initData.user)
  return (
    <div className="flex flex-col">
      <WalletBalance />
    </div>
  )
}

export default HomeClient

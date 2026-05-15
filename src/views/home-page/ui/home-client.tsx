import { UseUserInfoById } from "@/features/auth"
import WalletBalance from "@/widgets/wallet-balance"
import { initData, useSignal } from "@tma.js/sdk-react"

const HomeClient = () => {
  const tgUser = useSignal(initData.state)
  const { data: user } = UseUserInfoById(
    String(tgUser?.user?.id!),
    !!tgUser?.user?.id
  )
  return (
    <div className="flex flex-col">
      <WalletBalance />

      <p>
        Hi DB: {user?.firstName} {user?.lastName}
      </p>
      <p>
        Hi TG: {tgUser?.user?.first_name} {tgUser?.user?.last_name}
      </p>

      {/* {isAuth ? <h1>Authenticated</h1> : <h1>Not authenticated</h1>} */}
    </div>
  )
}

export default HomeClient

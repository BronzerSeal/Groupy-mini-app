import { UseUserInfoById } from "@/features/auth"
import IncreaseMoneyBtn from "@/features/increase-money-btn"
import MoveToFriendsBtn from "@/features/move-to-friends-btn"
import { cn } from "@/lib/utils"
import { HexagonPattern } from "@/shared/ui/hexagon-pattern"
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
      <div className="relative -mx-4 -my-4 overflow-hidden">
        <HexagonPattern
          hexagons={[
            [1, 1],
            [4, 4],
            [2, 2],
            [3, 4],
            [5, 4],
            [8, 2],
            [6, 3],
            [8, 5],
            [10, 10],
          ]}
          className={cn(
            "absolute inset-0 h-full w-full",
            "[mask-image:radial-gradient(420px_circle_at_center,white,transparent),linear-gradient(to_bottom,white_0%,white_75%,transparent_100%)]",
            "[mask-composite:intersect]",
            "skew-y-6"
          )}
        />

        <div className="relative z-10 px-4">
          <WalletBalance />
        </div>
      </div>

      <section className="mt-2 flex justify-center gap-3">
        <IncreaseMoneyBtn />
        <MoveToFriendsBtn />
      </section>

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

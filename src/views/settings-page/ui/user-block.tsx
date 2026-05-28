import { UseUserInfoById } from "@/features/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { Card, CardContent } from "@/shared/ui/card"
import { Particles } from "@/shared/ui/particles"
import { initData, themeParams, useSignal } from "@tma.js/sdk-react"

const UserBlock = () => {
  const tgUser = useSignal(initData.state)
  const { text_color } = useSignal(themeParams.state)
  const { data: user } = UseUserInfoById(
    String(tgUser?.user?.id),
    false,
    !!tgUser?.user?.id
  )
  return (
    <Card className="relative mt-2 overflow-hidden border-border/60 bg-card/85 shadow-sm">
      <Particles
        className="absolute inset-0 z-0"
        quantity={42}
        ease={80}
        color={text_color ?? "#ffffff"}
        refresh
      />
      <CardContent className="flex items-center gap-4">
        <Avatar className="size-16">
          <AvatarImage src={user?.photoUrl ?? undefined} />
          <AvatarFallback>
            {user?.firstName?.slice(0, 1) ??
              user?.lastName?.slice(0, 1) ??
              user?.username?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-xl font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-gray-400">@{user?.username}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserBlock

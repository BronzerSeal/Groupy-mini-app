import { miniApp, useSignal } from "@tma.js/sdk-react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const MoveToFriendsBtn = () => {
  const isDark = useSignal(miniApp.isDark)

  return (
    <Link href={"/users"}>
      <button
        className="flex h-13 w-full max-w-50 items-center justify-center gap-2 rounded-3xl px-4 py-2"
        style={{
          backgroundColor: isDark ? "#1E293B" : "#E8F1FF",
          color: isDark ? "#7DD3FC" : "#1D4ED8",
        }}
      >
        <ArrowUpRight size={28} />
      </button>
    </Link>
  )
}

export default MoveToFriendsBtn

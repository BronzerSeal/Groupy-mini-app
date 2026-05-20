"use client"
import { UseUserInfoById } from "@/features/auth"
import UserBlock from "@/entities/user-block"
import { initData, useSignal } from "@tma.js/sdk-react"
import { useParams } from "next/navigation"
import CarouselSection from "./carousel-section"

const TransactionPage = () => {
  const { userId } = useParams<{ userId: string }>()
  const user = useSignal(initData.user)
  const { data: merchantUser, isLoading } = UseUserInfoById(
    userId,
    true,
    !!userId
  )

  console.log(merchantUser?.cards)

  return (
    <>
      <h1 className="text-2xl font-bold">New payment</h1>

      <UserBlock
        firstName={merchantUser?.firstName}
        lastName={merchantUser?.lastName}
        userName={merchantUser?.username}
        photoUrl={merchantUser?.photoUrl}
      />

      <section className="mt-3">
        <CarouselSection cards={merchantUser?.cards} />
      </section>
    </>
  )
}

export default TransactionPage

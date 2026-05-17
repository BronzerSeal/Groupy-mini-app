"use server"
import prisma from "@/utils/prisma"
import { fullTransactions } from "../consts/seed"

export const seedDb = async () => {
  try {
    await prisma.transaction.createMany({
      data: [...fullTransactions],
    })

    return { success: true }
  } catch (error) {
    console.error("Error seeding db:", error)
    return {
      status: "error",
      message: `Error seeding db: ${error instanceof Error ? error.message : error}`,
    }
  }
}

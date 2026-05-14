"use client"

import { PropsWithChildren, useEffect } from "react"
import { retrieveRawInitData } from "@tma.js/sdk"
import { signIn } from "@/features/auth"

export function AuthBootstrap({ children }: PropsWithChildren) {
  useEffect(() => {
    const auth = async () => {
      try {
        const initDataRaw = retrieveRawInitData()

        if (!initDataRaw) return

        await signIn(initDataRaw)
      } catch (e) {
        console.error(e)
      }
    }

    auth()
  }, [])

  return children
}

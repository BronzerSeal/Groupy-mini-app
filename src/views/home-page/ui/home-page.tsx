"use client"

import { useEffect, useState } from "react"
import HomeClient from "./home-client"
import { HomePageLoader } from "./home-page-loader"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <HomePageLoader />
  }

  return <HomeClient />
}

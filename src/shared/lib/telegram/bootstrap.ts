import { retrieveLaunchParams } from "@tma.js/sdk-react"

import { init } from "shared/lib/telegram/init"
import { mockEnv } from "shared/lib/telegram/mockEnv"

export async function bootstrapTelegram(): Promise<void> {
  await mockEnv()

  const launchParams = retrieveLaunchParams()
  const platform = launchParams.tgWebAppPlatform
  const debug =
    (launchParams.tgWebAppStartParam || "").includes("debug") ||
    process.env.NODE_ENV === "development"

  await init({
    debug,
    eruda: debug && ["ios", "android"].includes(platform),
    mockForMacOS: platform === "macos",
  })
}

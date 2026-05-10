import {
  init,
  backButton,
  miniApp,
  themeParams,
  viewport,
  initData,
} from "@tma.js/sdk-react"

let initialized = false

export function initTelegram() {
  if (initialized) return

  initialized = true

  init()

  initData.restore()
  miniApp.mount()
  themeParams.mount()
  backButton.mount()
  viewport.mount()
}

import { CSSProperties } from "react"

export const useColors = (colors: Partial<Record<string, `#${string}`>>) => {
  const navStyle = {
    backgroundColor:
      colors?.secondary_bg_color ?? colors?.bg_color ?? "#18181b",
    borderColor: colors?.section_bg_color ?? "rgba(255, 255, 255, 0.08)",
    color: colors?.text_color ?? "#ffffff",
  } satisfies CSSProperties

  const activeItemStyle = {
    backgroundColor:
      colors?.button_color ?? colors?.accent_text_color ?? "#8b5cf6",
    color: colors?.button_text_color ?? "#ffffff",
    boxShadow: `0 10px 30px -12px ${colors?.button_color ?? colors?.accent_text_color ?? "#8b5cf6"}`,
  } satisfies CSSProperties

  const inactiveItemStyle = {
    color:
      colors?.hint_color ?? colors?.text_color ?? "rgba(255, 255, 255, 0.4)",
  } satisfies CSSProperties

  return { navStyle, activeItemStyle, inactiveItemStyle }
}

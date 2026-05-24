import { PropsWithChildren } from "react"
import { NoiseBackground } from "@/shared/ui/noise-bg"

export const FieldWrapper = ({ children }: PropsWithChildren) => {
  return (
    <NoiseBackground
      containerClassName="
    [--noise-1:rgb(226,232,240)]
    [--noise-2:rgb(191,219,254)]
    [--noise-3:rgb(216,180,254)]

    dark:[--noise-1:rgb(17,24,39)]
    dark:[--noise-2:rgb(30,41,59)]
    dark:[--noise-3:rgb(49,46,129)]
  "
      gradientColors={["var(--noise-1)", "var(--noise-2)", "var(--noise-3)"]}
    >
      {children}
    </NoiseBackground>
  )
}

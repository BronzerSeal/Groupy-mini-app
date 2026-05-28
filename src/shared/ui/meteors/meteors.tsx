"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const meteorStyles = React.useMemo(
    () =>
      [...new Array(number)].map(() => ({
        "--angle": `${-angle}deg`,
        top: "-5%",
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * (maxDelay - minDelay) + minDelay}s`,
        animationDuration: `${
          Math.random() * (maxDuration - minDuration) + minDuration
        }s`,
      })),
    [number, minDelay, maxDelay, minDuration, maxDuration, angle]
  )

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style as React.CSSProperties}
          className={cn(
            "pointer-events-none absolute top-0 size-0.5 rotate-(--angle) animate-meteor rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]",
            className
          )}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </>
  )
}

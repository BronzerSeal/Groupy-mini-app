"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "shared/ui/button"

type EmptyStateVariant = "filter" | "generic"

type EmptyStateProps = {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

function SearchIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.circle
        cx="36"
        cy="36"
        r="20"
        className="fill-muted/40 stroke-border"
        strokeWidth="1.5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.line
        x1="50"
        y1="50"
        x2="66"
        y2="66"
        className="stroke-muted-foreground/40"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
      <motion.path
        d="M 30 30 L 42 42 M 42 30 L 30 42"
        className="stroke-muted-foreground/20"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      />
      <motion.text
        x="14"
        y="22"
        className="fill-muted-foreground/15 text-[14px] font-bold"
        animate={{ y: [22, 18, 22] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ?
      </motion.text>
      <motion.text
        x="60"
        y="20"
        className="fill-muted-foreground/15 text-[10px] font-bold"
        animate={{ y: [20, 16, 20] }}
        transition={{ duration: 2.5, delay: 0.4, repeat: Infinity }}
      >
        ?
      </motion.text>
    </svg>
  )
}

function GenericIllustration() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <motion.rect
        x="16"
        y="28"
        width="48"
        height="36"
        rx="4"
        className="fill-muted/40 stroke-border"
        strokeWidth="1.5"
        initial={{ y: 38, opacity: 0 }}
        animate={{ y: 28, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M 12 28 L 40 16 L 68 28"
        className="fill-muted/20 stroke-border"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      />
    </svg>
  )
}

const variants: Record<
  EmptyStateVariant,
  {
    illustration: React.ReactNode
    title: string
    description: string
  }
> = {
  filter: {
    illustration: <SearchIllustration />,
    title: "No matching results",
    description:
      "No items match your current filters. Try adjusting or clearing your filters.",
  },
  generic: {
    illustration: <GenericIllustration />,
    title: "Nothing here yet",
    description:
      "This section is empty. Content will appear here when data becomes available.",
  },
}

export function EmptyState({
  variant = "generic",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const config = variants[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {config.illustration}
      </motion.div>

      <div className="w-full max-w-xs min-w-0 space-y-1.5">
        <motion.h3 className="text-sm font-semibold">
          {title ?? config.title}
        </motion.h3>

        <motion.p
          className="w-full text-xs leading-relaxed break-words whitespace-normal text-muted-foreground"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description ?? config.description}
        </motion.p>
      </div>

      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="sm"
            variant="outline"
            onClick={onAction}
            className="mt-1"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

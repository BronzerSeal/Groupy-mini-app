"use client"
import { useState } from "react"
import { faqItems } from "../consts/faq-seed"
import { ChevronDownIcon, SearchIcon } from "lucide-react"
import { Input } from "@/shared/ui/input"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/shared/ui/card"
import { AnimatePresence, motion } from "motion/react"
import {
  categoryColors,
  categoryFilters,
  categoryIcons,
} from "../consts/category-constants"

export function FaqTab() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = faqItems.filter((item) => {
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="mb-17 space-y-4">
      {/* Search + category pills */}
      <div className="space-y-3">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categoryFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                categoryFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {cat === "all" ? "All Topics" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <Card>
        <CardContent className="p-0">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground"
              >
                <SearchIcon className="size-10 opacity-30" />
                <p className="text-sm font-medium">No matching questions</p>
                <p className="text-xs">
                  Try a different search term or category
                </p>
              </motion.div>
            ) : (
              filtered.map((item, i) => {
                const isOpen = openId === item.id
                const Icon = categoryIcons[item.category]

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, delay: i * 0.02 }}
                    className="border-b last:border-b-0"
                  >
                    <motion.div
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full cursor-pointer items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50"
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg",
                          categoryColors[item.category]
                        )}
                      >
                        <Icon className="size-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "text-sm",
                            isOpen ? "font-semibold" : "font-medium"
                          )}
                        >
                          {item.question}
                        </p>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {item.answer}
                              </p>
                              <div className="mt-3 flex items-center gap-3">
                                <span className="text-[11px] text-muted-foreground">
                                  Was this helpful?
                                </span>
                                <div className="flex gap-1">
                                  <button
                                    type="button"
                                    className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-600"
                                  >
                                    Yes
                                  </button>
                                  <button
                                    type="button"
                                    className="rounded-md px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-rose-500/10 hover:text-rose-600"
                                  >
                                    No
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-0.5 shrink-0"
                      >
                        <ChevronDownIcon className="size-4 text-muted-foreground" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

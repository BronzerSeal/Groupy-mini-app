import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/shared/ui/card"

import { channels } from "../consts/channels"

export default function ContactChannels() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {channels.map((ch) => {
        const Icon = ch.icon
        return (
          <Card
            key={ch.label}
            className="group cursor-pointer transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20"
          >
            <CardContent className="flex items-center gap-3 p-4">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                  ch.color
                )}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{ch.label}</p>
                  {ch.badge && (
                    <span
                      className={cn("size-1.5 rounded-full", ch.badgeColor)}
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{ch.desc}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

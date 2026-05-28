"use client"
import { UseUserInfoById } from "@/features/auth"
import { Separator } from "@/shared/ui/separator"
import { initData, useSignal } from "@tma.js/sdk-react"
import UserBlock from "./user-block"
import Link from "next/link"
import { Button } from "@/shared/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { Badge, MessageCircle, ShieldCheck } from "lucide-react"
import { SquigglyText } from "@/shared/ui/squiggly-text"

const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        <SquigglyText steps={12} stepDuration={120} scale={[3, 5]}>
          Settings
        </SquigglyText>
      </h1>

      <UserBlock />

      <Card className="mt-3 border-border/60 bg-card/90 shadow-sm">
        <CardHeader className="border-b border-border/60">
          <CardTitle>App info</CardTitle>
          <CardDescription>
            Small details that are good to keep in one place.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 text-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Platform</p>
              <p className="text-muted-foreground">Telegram Mini App</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Support</p>
              <p className="text-muted-foreground">Help and issue reporting</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/support">
                Open
                <MessageCircle className="size-4" />
              </Link>
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Security</p>
              <p className="text-muted-foreground">
                Secure device and session controls
              </p>
            </div>
            <Badge className="gap-1.5">
              <ShieldCheck className="size-3.5" />
              Ready
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage

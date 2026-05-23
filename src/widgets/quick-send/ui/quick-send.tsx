"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "shared/ui/card"
import { CheckCircle2Icon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { initData, useSignal } from "@tma.js/sdk-react"
import { useUserRecepients } from "../queries/queries"
import ContactSelector, {
  type SendState,
  type SuccessfulSendPayload,
} from "./contact-selector"

export function QuickSend({
  onSend,
}: {
  onSend?: (payload: SuccessfulSendPayload) => void
}) {
  const user = useSignal(initData.state)
  const { data: contacts } = useUserRecepients(
    String(user?.user?.id),
    !!user?.user?.id
  )
  const [sendState, setSendState] = useState<SendState>("idle")
  const [lastSent, setLastSent] = useState<SuccessfulSendPayload | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleSuccess = (payload: SuccessfulSendPayload) => {
    setLastSent(payload)
    setSendState("success")

    if (onSend) {
      onSend(payload)
    }

    timeoutRef.current = setTimeout(() => {
      setSendState("idle")
    }, 2000)
  }

  if (contacts === undefined) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Quick Send</CardTitle>
      </CardHeader>
      <CardContent>
        {contacts?.length > 0 ? (
          <AnimatePresence mode="wait">
            {sendState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-2 py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1,
                  }}
                >
                  <CheckCircle2Icon className="size-10 text-emerald-500" />
                </motion.div>
                <p className="text-sm font-semibold">
                  $
                  {lastSent?.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  }) ?? "0.00"}{" "}
                  sent!
                </p>
                <p className="text-xs text-muted-foreground">
                  To {lastSent?.recipientName}
                </p>
              </motion.div>
            ) : (
              <ContactSelector
                contacts={contacts}
                sendState={sendState}
                setSendState={setSendState}
                onSuccess={handleSuccess}
              />
            )}
          </AnimatePresence>
        ) : (
          <div>send money to use</div>
        )}
      </CardContent>
    </Card>
  )
}

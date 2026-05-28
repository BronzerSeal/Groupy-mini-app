"use client"

import ContactChannels from "./contact-channels"
import LiveChatSimulator from "./live-chat-simulator"

export default function ContactTab() {
  return (
    <div className="mb-17 space-y-6">
      <ContactChannels />
      <div className="grid gap-6 lg:grid-cols-2">
        <LiveChatSimulator />
      </div>
    </div>
  )
}

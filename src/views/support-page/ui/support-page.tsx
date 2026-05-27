"use client"
import { useState } from "react"
import { TabId } from "../model/types"
import { FaqTab } from "./faq-tab"
import RenderTabs from "./render-tabs"
import ContactTab from "./contact-tab"

const SupportPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("faq")

  const tabContent: Record<TabId, React.ReactNode> = {
    // status: <StatusTab />,
    faq: <FaqTab />,
    contact: <ContactTab />,
    status: <p />,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Help & Support
        </h1>
        <p className="text-sm text-muted-foreground">
          Find answers, chat with us, submit tickets, and check system status
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="flex shrink-0 flex-col gap-4 lg:w-52">
          <nav className="hidden flex-col gap-1 lg:flex">
            <RenderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </nav>
          <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2 lg:hidden">
            <RenderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">{tabContent[activeTab]}</div>
      </div>
    </div>
  )
}

export default SupportPage

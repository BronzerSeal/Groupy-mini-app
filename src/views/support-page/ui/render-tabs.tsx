import { cn } from "@/lib/utils"
import { Button } from "@/shared/ui/button"
import { Dispatch, FC, SetStateAction } from "react"
import { tabs } from "../consts/tabs"
import { TabId } from "../model/types"

interface Props {
  activeTab: TabId
  setActiveTab: Dispatch<SetStateAction<TabId>>
}

const RenderTabs: FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {tabs.map((tab) => {
        const Icon = tab.icon

        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "justify-start gap-2",
              activeTab === tab.id && "font-semibold"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon className="size-4" />
            {tab.label}
          </Button>
        )
      })}
    </>
  )
}

export default RenderTabs

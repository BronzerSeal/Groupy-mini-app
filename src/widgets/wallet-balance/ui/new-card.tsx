import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  CheckCircle2Icon,
  LoaderCircleIcon,
  PlusIcon,
  XIcon,
} from "lucide-react"
import { motion } from "motion/react"

interface Props {
  addState: "form" | "adding" | "success"
  newCardName: string
  newCardType: string
  setNewCardName: (value: string | ((prevState: string) => string)) => void
  handleAdd: () => void
  setNewCardType: (value: string | ((prevState: string) => string)) => void
  newCardOptions: {
    value: string
    label: string
    currency: string
    chipColor: string
  }[]
  setAddState: (
    value:
      | "idle"
      | "form"
      | "adding"
      | "success"
      | ((
          prevState: "idle" | "form" | "adding" | "success"
        ) => "idle" | "form" | "adding" | "success")
  ) => void
}

const NewCard: React.FC<Props> = ({
  addState,
  newCardName,
  newCardType,
  setNewCardName,
  handleAdd,
  newCardOptions,
  setAddState,
  setNewCardType,
}) => {
  return (
    <motion.div
      key="add-flow"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex h-[200px] flex-col"
    >
      {addState === "success" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CheckCircle2Icon className="size-10 text-emerald-500" />
          </motion.div>
          <p className="text-sm font-semibold">Card added!</p>
          <p className="text-xs text-muted-foreground">
            {newCardName ||
              newCardOptions.find((o) => o.value === newCardType)?.label}
          </p>
        </div>
      ) : addState === "adding" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <LoaderCircleIcon className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Creating card...</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Add New Card</p>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => setAddState("idle")}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
          <Select
            value={newCardType}
            onValueChange={(v) => v && setNewCardType(v)}
          >
            <SelectTrigger className="h-3 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {newCardOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Card name (optional)"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
            className="h-9 text-xs"
          />
          <Button className="h-9 gap-2 text-xs" onClick={handleAdd}>
            <PlusIcon className="size-3.5" />
            Create Card
          </Button>
        </div>
      )}
    </motion.div>
  )
}

export default NewCard

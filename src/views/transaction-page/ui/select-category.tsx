"use client"

import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/coss-select"

import { Dispatch, FC, SetStateAction } from "react"
import { CATEGORIES } from "shared/constants/CATEGORIES"

interface Props {
  selectCategoryId: string
  setSelectCategoryId: Dispatch<SetStateAction<string>>
  triggerClassName?: string
}

export const SelectCategory: FC<Props> = ({
  selectCategoryId,
  setSelectCategoryId,
  triggerClassName,
}) => {
  const categories = CATEGORIES

  const selectedCategory =
    categories.find((category) => category.id === selectCategoryId) ??
    categories[0]

  return (
    <>
      <Select
        aria-label="Select card"
        value={selectedCategory}
        onValueChange={(category) => {
          setSelectCategoryId(category?.id ?? "1")
        }}
        itemToStringValue={(card) => card.label}
      >
        <SelectTrigger className={`py-1 ${triggerClassName ?? ""}`}>
          <SelectValue>
            {(card) => (
              <span className="flex flex-col">
                <span className="truncate">{card?.label}</span>

                <span className="truncate text-xs text-muted-foreground">
                  {card?.balance}
                </span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectPopup>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category}>
              <span className="flex flex-col">
                <span className="truncate">{category.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </>
  )
}

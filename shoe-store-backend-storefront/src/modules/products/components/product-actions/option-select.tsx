import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm font-sans font-black uppercase tracking-widest text-editorial-dark border-l-4 border-editorial-neonPink pl-2">{title === "Size" ? "KÍCH CỠ" : title}</span>
      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isSelected = v === current
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "min-w-[56px] h-[56px] flex items-center justify-center font-editorial font-black text-xl uppercase px-3 transition-all duration-200 border-2",
                {
                  "bg-editorial-dark text-editorial-neonVolt border-editorial-dark shadow-[4px_4px_0px_0px_rgba(255,42,122,1)] translate-x-[-2px] translate-y-[-2px]": isSelected,
                  "bg-white text-editorial-dark border-editorial-dark hover:shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:-translate-x-1 hover:-translate-y-1 hover:bg-gray-50": !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
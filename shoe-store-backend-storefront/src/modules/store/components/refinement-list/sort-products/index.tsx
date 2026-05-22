"use client"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Mới nhất",
  },
  {
    value: "price_asc",
    label: "Giá: Thấp - Cao",
  },
  {
    value: "price_desc",
    label: "Giá: Cao - Thấp",
  },
] as const

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="flex flex-col gap-3 w-full" data-testid={dataTestId}>
      <span className="font-editorial text-xs font-bold uppercase tracking-wider text-gray-500">
        Sắp xếp theo
      </span>
      <div className="flex flex-wrap gap-2 w-full">
        {sortOptions.map((option) => {
          const isActive = sortBy === option.value
          return (
            <button
              key={option.value}
              onClick={() => handleChange(option.value as SortOptions)}
              className={`font-editorial text-sm font-bold uppercase tracking-wide px-4 py-2 border-2 transition-all duration-200 rounded-[2px] flex-1 min-w-[120px] text-center ${
                isActive
                  ? "bg-editorial-dark text-editorial-neonVolt border-editorial-dark shadow-[2px_2px_0px_0px_#D3FF24]"
                  : "bg-white text-editorial-dark border-editorial-dark/10 hover:border-editorial-dark hover:bg-editorial-light"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SortProducts


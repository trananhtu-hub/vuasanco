"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState, useEffect } from "react"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const SIZE_OPTIONS = ["38", "39", "40", "41", "42", "43", "44"]
const STUD_OPTIONS = [
  { value: "TF", label: "TF (Cỏ nhân tạo đế ngắn)" },
  { value: "AG", label: "AG (Cỏ nhân tạo đế dài)" },
  { value: "FG", label: "FG (Cỏ tự nhiên đế cao)" },
  { value: "IC", label: "IC (Futsal / Trong nhà)" },
  { value: "SG", label: "SG (Sân cỏ tự nhiên ướt)" },
]
const SURFACE_OPTIONS = [
  { value: "artificial", label: "Sân cỏ nhân tạo" },
  { value: "natural", label: "Sân cỏ tự nhiên" },
  { value: "indoor", label: "Sân trong nhà / Futsal" },
]
const PRICE_OPTIONS = [
  { value: "under-1m", label: "Dưới 1.000.000đ" },
  { value: "1m-2m", label: "1.000.000đ - 2.000.000đ" },
  { value: "2m-3m", label: "2.000.000đ - 3.000.000đ" },
  { value: "over-3m", label: "Trên 3.000.000đ" },
]

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)

  // Local state for filters inside the sidebar (only applied on "APPLY")
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedStuds, setSelectedStuds] = useState<string[]>([])
  const [selectedSurfaces, setSelectedSurfaces] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])

  // Sync state with URL search params when sidebar opens or params change
  useEffect(() => {
    const sizes = searchParams.get("sizes")?.split(",").filter(Boolean) || []
    const studs = searchParams.get("studs")?.split(",").filter(Boolean) || []
    const surfaces = searchParams.get("surfaces")?.split(",").filter(Boolean) || []
    const prices = searchParams.get("price")?.split(",").filter(Boolean) || []

    setSelectedSizes(sizes)
    setSelectedStuds(studs)
    setSelectedSurfaces(surfaces)
    setSelectedPrices(prices)
  }, [searchParams, isOpen])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  // Count active filters
  const activeFiltersCount = 
    (searchParams.get("sizes")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("studs")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("surfaces")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("price")?.split(",").filter(Boolean).length || 0)

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const toggleStud = (stud: string) => {
    setSelectedStuds(prev =>
      prev.includes(stud) ? prev.filter(s => s !== stud) : [...prev, stud]
    )
  }

  const toggleSurface = (surface: string) => {
    setSelectedSurfaces(prev =>
      prev.includes(surface) ? prev.filter(s => s !== surface) : [...prev, surface]
    )
  }

  const togglePrice = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
    )
  }

  const handleApply = () => {
    const params = new URLSearchParams(searchParams)
    
    // Set or delete sizes
    if (selectedSizes.length > 0) {
      params.set("sizes", selectedSizes.join(","))
    } else {
      params.delete("sizes")
    }

    // Set or delete studs
    if (selectedStuds.length > 0) {
      params.set("studs", selectedStuds.join(","))
    } else {
      params.delete("studs")
    }

    // Set or delete surfaces
    if (selectedSurfaces.length > 0) {
      params.set("surfaces", selectedSurfaces.join(","))
    } else {
      params.delete("surfaces")
    }

    // Set or delete prices
    if (selectedPrices.length > 0) {
      params.set("price", selectedPrices.join(","))
    } else {
      params.delete("price")
    }

    // Always reset page to 1 on new filter apply
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("sizes")
    params.delete("studs")
    params.delete("surfaces")
    params.delete("price")
    params.set("page", "1")
    
    setSelectedSizes([])
    setSelectedStuds([])
    setSelectedSurfaces([])
    setSelectedPrices([])
    
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  return (
    <>
      {/* FILTER BAR NGANG */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 py-6 border-b border-editorial-dark/10 mb-8 px-4 md:px-0">
        
        {/* Nút kích hoạt bộ lọc */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-editorial-dark text-white border-2 border-editorial-dark font-editorial text-sm font-bold uppercase tracking-widest px-6 py-3 transition-all duration-300 rounded-[2px] shadow-[4px_4px_0px_0px_rgba(15,15,15,0.15)] hover:shadow-[4px_4px_0px_0px_#D3FF24] hover:bg-editorial-dark/95 active:translate-y-[2px] active:shadow-none"
          >
            <svg
              className="w-4 h-4 text-editorial-neonVolt group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
            <span>BỘ LỌC CHI TIẾT [FILTER]</span>
            {activeFiltersCount > 0 && (
              <span className="bg-editorial-neonPink text-white font-sans text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearAll}
              className="font-editorial text-xs font-bold uppercase tracking-wider text-editorial-neonPink hover:text-editorial-dark transition-colors"
            >
              Xóa bộ lọc [x]
            </button>
          )}
        </div>

        {/* Bộ sắp xếp sản phẩm */}
        <div className="w-full md:max-w-md">
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
        </div>

      </div>

      {/* OFF-CANVAS SIDEBAR (FILTERS SLIDE-OVER) */}
      <div
        className={`fixed inset-0 z-[1000] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Sidebar Container */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-[#0F0F0F] text-white flex flex-col transition-transform duration-500 ease-out border-l border-editorial-neonVolt/20 shadow-2xl ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-baseline gap-2">
              <h2 className="font-editorial text-2xl font-bold uppercase tracking-widest text-editorial-neonVolt">
                BỘ LỌC SẢN PHẨM
              </h2>
              {activeFiltersCount > 0 && (
                <span className="font-sans text-xs font-bold text-white bg-editorial-neonPink px-2 py-0.5 rounded-full">
                  {activeFiltersCount} đang chọn
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-1.5 font-editorial text-sm font-bold uppercase tracking-wider text-white/60 hover:text-editorial-neonPink transition-colors"
            >
              ĐÓNG [X]
            </button>
          </div>

          {/* Filter Options (Scrollable area) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
            
            {/* 1. Kích cỡ (Sizes) */}
            <div className="space-y-4">
              <h3 className="font-editorial text-lg font-bold uppercase tracking-widest text-white border-l-4 border-editorial-neonVolt pl-3">
                KÍCH CỠ GIÀY
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {SIZE_OPTIONS.map((size) => {
                  const isSelected = selectedSizes.includes(size)
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`font-editorial text-lg font-bold py-3 transition-all duration-200 border-2 rounded-[2px] ${
                        isSelected
                          ? "bg-editorial-neonVolt text-editorial-dark border-editorial-neonVolt shadow-[0_0_10px_rgba(211,255,36,0.3)]"
                          : "bg-white/5 text-white/80 border-white/10 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>

            <hr className="border-white/10" />

            {/* 2. Loại đinh giày (Studs) */}
            <div className="space-y-4">
              <h3 className="font-editorial text-lg font-bold uppercase tracking-widest text-white border-l-4 border-editorial-neonVolt pl-3">
                LOẠI ĐINH GIÀY
              </h3>
              <div className="flex flex-col gap-2">
                {STUD_OPTIONS.map((stud) => {
                  const isSelected = selectedStuds.includes(stud.value)
                  return (
                    <button
                      key={stud.value}
                      onClick={() => toggleStud(stud.value)}
                      className={`font-editorial text-sm font-bold uppercase tracking-wide px-4 py-3 text-left border-2 rounded-[2px] transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? "bg-white text-editorial-dark border-white shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                          : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <span>{stud.label}</span>
                      {isSelected && (
                        <span className="w-2.5 h-2.5 bg-editorial-neonVolt rounded-full"></span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <hr className="border-white/10" />

            {/* 3. Mặt sân phù hợp (Surfaces) */}
            <div className="space-y-4">
              <h3 className="font-editorial text-lg font-bold uppercase tracking-widest text-white border-l-4 border-editorial-neonVolt pl-3">
                MẶT SÂN PHÙ HỢP
              </h3>
              <div className="space-y-3">
                {SURFACE_OPTIONS.map((surf) => {
                  const isSelected = selectedSurfaces.includes(surf.value)
                  return (
                    <div
                      key={surf.value}
                      onClick={() => toggleSurface(surf.value)}
                      className="group flex items-center gap-3 cursor-pointer select-none py-1.5"
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded-[2px] transition-all duration-150 flex items-center justify-center ${
                          isSelected
                            ? "bg-editorial-neonVolt border-editorial-neonVolt text-editorial-dark"
                            : "border-white/30 group-hover:border-white/60"
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-semibold uppercase tracking-wide font-editorial ${
                        isSelected ? "text-editorial-neonVolt" : "text-white/70 group-hover:text-white"
                      }`}>
                        {surf.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="border-white/10" />

            {/* 4. Khoảng giá (Prices) */}
            <div className="space-y-4 pb-8">
              <h3 className="font-editorial text-lg font-bold uppercase tracking-widest text-white border-l-4 border-editorial-neonVolt pl-3">
                KHOẢNG GIÁ TIỀN
              </h3>
              <div className="space-y-3">
                {PRICE_OPTIONS.map((price) => {
                  const isSelected = selectedPrices.includes(price.value)
                  return (
                    <div
                      key={price.value}
                      onClick={() => togglePrice(price.value)}
                      className="group flex items-center gap-3 cursor-pointer select-none py-1.5"
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded-[2px] transition-all duration-150 flex items-center justify-center ${
                          isSelected
                            ? "bg-editorial-neonVolt border-editorial-neonVolt text-editorial-dark"
                            : "border-white/30 group-hover:border-white/60"
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-sm font-semibold uppercase tracking-wide font-editorial ${
                        isSelected ? "text-editorial-neonVolt" : "text-white/70 group-hover:text-white"
                      }`}>
                        {price.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          {/* Action Buttons (Fixed at bottom) */}
          <div className="p-6 border-t border-white/10 bg-[#0F0F0F] flex gap-3">
            <button
              onClick={handleClearAll}
              className="flex-1 font-editorial text-sm font-bold uppercase tracking-widest py-4 border-2 border-editorial-neonPink/30 hover:border-editorial-neonPink text-editorial-neonPink hover:bg-editorial-neonPink/5 transition-all duration-200 rounded-[2px]"
            >
              XÓA LỌC
            </button>
            <button
              onClick={handleApply}
              className="flex-[2] font-editorial text-sm font-bold uppercase tracking-widest py-4 bg-editorial-neonVolt hover:bg-editorial-neonVolt/90 text-editorial-dark transition-all duration-200 rounded-[2px] shadow-[0_4px_15px_rgba(211,255,36,0.2)] hover:shadow-[0_4px_25px_rgba(211,255,36,0.4)]"
            >
              ÁP DỤNG LỌC
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default RefinementList

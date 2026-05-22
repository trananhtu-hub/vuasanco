"use client"

import { useState, useEffect, useRef, Fragment } from "react"
import { useParams, useRouter } from "next/navigation"
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SearchModalProps = {
  isOpen: boolean
  onClose: () => void
}


export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const { countryCode } = useParams()
  const currentCountry = (countryCode as string) || "us"

  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [results, setResults] = useState<HttpTypes.StoreProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const isComposing = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // 1. Tự động Focus vào input khi mở Modal
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      // Clear state khi đóng
      setQuery("")
      setDebouncedQuery("")
      setResults([])
      setIsError(false)
    }
  }, [isOpen])

  // 2. Xử lý Debounce Query (400ms và chỉ chạy khi KHÔNG gõ dở tiếng Việt IME)
  useEffect(() => {
    if (isComposing.current) return

    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)

    return () => clearTimeout(handler)
  }, [query])

  // 3. Thực hiện gọi API tìm kiếm qua listProducts khi debouncedQuery thay đổi
  useEffect(() => {
    const fetchResults = async () => {
      const trimmed = debouncedQuery.trim()
      if (!trimmed) {
        setResults([])
        return
      }

      setIsLoading(true)
      setIsError(false)

      try {
        const { response } = await listProducts({
          queryParams: {
            q: trimmed,
            limit: 6
          },
          countryCode: currentCountry,
        })
        setResults(response.products || [])
      } catch (error) {
        console.error("Lỗi tìm kiếm sản phẩm:", error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery, currentCountry])

  // 4. Xử lý khi nhấn phím Enter để đi thẳng tới cửa hàng tìm kiếm
  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      onClose()
      router.push(`/store?q=${encodeURIComponent(query.trim())}`)
    }
  }


  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[9999]">

        {/* Lớp nền mờ (Backdrop) với hiệu ứng transition */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-editorial-dark/70 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        {/* Khung chứa Modal cuộn */}
        <div className="fixed inset-0 overflow-y-auto flex items-start justify-center p-0 md:p-6 lg:p-12">

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 scale-95"
          >
            <DialogPanel
              // ĐIỂM NHẤN: Full-screen hoàn toàn trên mobile, Boxy floating trên Desktop
              className="w-full max-w-3xl bg-white border-0 md:border-4 border-editorial-dark rounded-none shadow-none md:shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col relative h-[100dvh] md:h-auto md:max-h-[85vh]"
            >

              {/* ================= HEADER: Ô Nhập Liệu & Nút Đóng ================= */}
              <div className="flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 border-b-2 border-editorial-dark bg-white shrink-0">

                {/* Kính lúp */}
                <svg
                  width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="text-editorial-dark shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                {/* Input tìm kiếm chính */}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm kiếm giày bóng đá..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    if (!isComposing.current) {
                      setDebouncedQuery(e.target.value)
                    }
                  }}
                  onKeyDown={handleKeyDownEnter}
                  onCompositionStart={() => {
                    isComposing.current = true
                  }}
                  onCompositionEnd={(e) => {
                    isComposing.current = false
                    setDebouncedQuery(e.currentTarget.value)
                  }}
                  className="w-full bg-transparent border-none outline-none text-base md:text-lg font-sans font-medium placeholder:text-gray-400 text-editorial-dark p-1"
                />

                {/* Nút xóa nhanh text */}
                {query && (
                  <button
                    onClick={() => {
                      setQuery("")
                      setDebouncedQuery("")
                      setResults([])
                      inputRef.current?.focus()
                    }}
                    className="text-gray-400 hover:text-editorial-neonPink transition-colors p-1"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}

                {/* Nút Đóng Modal */}
                <button
                  onClick={onClose}
                  className="border-2 border-editorial-dark bg-white hover:bg-editorial-neonPink hover:text-white text-editorial-dark font-editorial text-xs font-bold uppercase px-3 py-1.5 transition-colors shrink-0 rounded-none shadow-[2px_2px_0px_#000000]"
                >
                  Đóng
                </button>
              </div>

              {/* Hướng dẫn phím tắt nhỏ ở Desktop */}
              <div className="hidden md:flex justify-between items-center px-6 py-1.5 bg-editorial-light border-b border-editorial-dark/10 text-[10px] text-gray-500 font-sans tracking-wide">
                <span>Nhập từ khóa và ấn [ENTER] để xem tất cả</span>
                <span>Bấm [ESC] để đóng nhanh</span>
              </div>

              {/* ================= CONTENT: Khu Vực Kết Quả ================= */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-editorial-light/40 flex flex-col min-h-0">

                {/* 1. Trạng thái Loading */}
                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-12 gap-y-4">
                    <div className="w-10 h-10 border-4 border-editorial-dark border-t-editorial-neonVolt animate-spin rounded-none"></div>
                    <span className="font-editorial text-sm font-bold uppercase tracking-widest text-editorial-dark animate-pulse">
                      Đang quét dữ liệu...
                    </span>
                  </div>
                )}

                {/* 2. Trạng thái Lỗi */}
                {isError && !isLoading && (
                  <div className="border-2 border-editorial-neonPink bg-editorial-neonPink/5 p-6 text-center rounded-none my-4">
                    <p className="font-editorial text-base font-bold text-editorial-neonPink uppercase tracking-wider">
                      Đã xảy ra sự cố kết nối backend
                    </p>
                    <p className="text-xs text-gray-500 font-sans mt-1">
                      Vui lòng thử lại sau hoặc làm mới trang.
                    </p>
                  </div>
                )}

                {/* 3. Trạng thái Trống (Chưa nhập từ khóa) -> Hiển thị hộp thông tin tối giản */}
                {!query.trim() && !isLoading && (
                  <div className="flex flex-col gap-y-6 py-4 my-auto">
                    <div className="border-2 border-dashed border-gray-300 p-8 text-center flex flex-col items-center justify-center gap-y-3 bg-white">
                      <div className="bg-editorial-light border border-editorial-dark w-12 h-12 flex items-center justify-center text-editorial-dark">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 font-sans max-w-sm">
                        Tìm kiếm tức thì giày đinh sân cỏ nhân tạo (TF), sân cỏ tự nhiên (FG) từ các thương hiệu hàng đầu như Wika, Kamito.
                      </span>
                    </div>
                  </div>
                )}

                {/* 4. Trạng thái Có Từ Khóa nhưng không tìm thấy sản phẩm */}
                {debouncedQuery && results.length === 0 && !isLoading && !isError && (
                  <div className="border-2 border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center gap-y-4 bg-white my-auto">
                    <span className="font-editorial text-lg font-black uppercase tracking-wider text-editorial-dark">
                      Không tìm thấy sản phẩm nào
                    </span>
                    <span className="text-xs text-gray-500 font-sans max-w-md -mt-2">
                      Không tìm thấy giày bóng đá nào khớp với từ khóa &ldquo;<strong className="text-editorial-neonPink">{debouncedQuery}</strong>&rdquo;. Vui lòng thử từ khóa khác như &ldquo;Wika&rdquo;, &ldquo;Kamito&rdquo; hoặc &ldquo;đế TF&rdquo;.
                    </span>
                    <button
                      onClick={() => {
                        setQuery("")
                        setDebouncedQuery("")
                        inputRef.current?.focus()
                      }}
                      className="px-4 py-2 border-2 border-editorial-dark bg-editorial-dark text-white hover:bg-white hover:text-editorial-dark text-xs font-editorial uppercase tracking-widest font-bold transition-all rounded-none"
                    >
                      Xóa tìm kiếm
                    </button>
                  </div>
                )}

                {/* 5. Hiển thị danh sách kết quả (Mini-Catalog) */}
                {results.length > 0 && !isLoading && (
                  <div className="flex flex-col gap-y-4 min-h-0 flex-1">

                    {/* Tiêu đề vùng kết quả */}
                    <div className="flex justify-between items-center border-b border-editorial-dark/10 pb-2">
                      <span className="font-editorial text-xs font-black uppercase tracking-widest text-editorial-dark/70">
                        Kết quả tìm kiếm ({results.length})
                      </span>
                      <LocalizedClientLink
                        href={`/store?q=${encodeURIComponent(debouncedQuery)}`}
                        onClick={onClose}
                        className="text-xs font-editorial font-bold uppercase tracking-wider text-editorial-neonPink hover:text-editorial-dark transition-colors"
                      >
                        Xem tất cả &rarr;
                      </LocalizedClientLink>
                    </div>

                    {/* Grid sản phẩm Mini-Catalog */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto pr-1">
                      {results.map((product, idx) => {
                        const { cheapestPrice } = getProductPrice({ product })

                        // Xem đây có phải sản phẩm đầu tiên hoặc đặc biệt để gắn badge
                        const isNew = idx === 0 || product.tags?.some(t => t.value.toLowerCase().includes("mới"))

                        return (
                          <LocalizedClientLink
                            key={product.id}
                            href={`/products/${product.handle}`}
                            onClick={onClose}
                            className="group flex flex-col bg-white border border-editorial-dark hover:border-editorial-neonVolt transition-all duration-200 shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] p-3"
                          >
                            {/* Khu vực ảnh Thumbnail aspect-square */}
                            <div className="relative w-full aspect-square bg-editorial-light border border-editorial-dark/10 overflow-hidden flex items-center justify-center">
                              <img
                                src={product.thumbnail || ""}
                                alt={product.title || "Product Thumbnail"}
                                className="object-contain w-full h-full p-2 transition-transform duration-500 ease-out group-hover:scale-105"
                              />

                              {/* Badge "MỚI RA MẮT" - Thiết kế Boxy */}
                              {isNew && (
                                <div className="absolute top-2 left-2 z-10">
                                  <span className="bg-editorial-neonVolt text-editorial-dark border border-editorial-dark text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase font-editorial inline-block">
                                    Mới ra mắt
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Thông tin sản phẩm */}
                            <div className="mt-3 flex-1 flex flex-col justify-between">
                              <div>
                                {/* Hãng / Tên sản phẩm */}
                                <h5 className="font-editorial text-xs font-bold text-gray-500 uppercase tracking-wider line-clamp-1">
                                  {product.collection?.title || "VUA SÂN CỎ"}
                                </h5>
                                <h4 className="font-editorial text-sm md:text-base font-black text-editorial-dark uppercase tracking-tight line-clamp-2 mt-0.5 leading-snug group-hover:text-editorial-neonPink transition-colors">
                                  {product.title}
                                </h4>
                              </div>

                              {/* Giá tiền */}
                              <div className="mt-2 pt-2 border-t border-dashed border-gray-200 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                                {cheapestPrice ? (
                                  <>
                                    <span className="text-sm md:text-base font-black text-editorial-dark font-sans">
                                      {cheapestPrice.calculated_price}
                                    </span>
                                    {cheapestPrice.original_price_number > cheapestPrice.calculated_price_number && (
                                      <span className="text-[10px] md:text-xs text-gray-400 line-through font-sans">
                                        {cheapestPrice.original_price}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-xs text-gray-400 font-sans">Liên hệ</span>
                                )}
                              </div>
                            </div>
                          </LocalizedClientLink>
                        )
                      })}
                    </div>
                  </div>
                )}

              </div>

            </DialogPanel>
          </TransitionChild>
        </div>

      </Dialog>
    </Transition>
  )
}

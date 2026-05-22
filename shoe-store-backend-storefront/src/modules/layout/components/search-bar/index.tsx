"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SearchModal from "../search-modal"

export default function SearchBar() {
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  
  // 1. Lắng nghe phím tắt Ctrl + K / ⌘ + K toàn cục để kích hoạt ô tìm kiếm
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // 2. Mở modal tự động nếu có query từ trang khác chuyển qua (tùy chọn)
  // Trong trường hợp này, chúng ta chỉ giữ nút kích hoạt trực quan
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <>
      {/* 
        NÚT KÍCH HOẠT NHẬP LIỆU:
        - Thiết kế Boxy dứt khoát (rounded-none, border-2 border-editorial-dark)
        - Hover shadow bóng cứng retro cực đẹp
        - Responsive: co giãn tự động trên mobile, căn giữa trên desktop
      */}
      <button 
        onClick={openModal}
        className="w-full max-w-[200px] md:max-w-md flex items-center justify-between px-3 py-1.5 md:px-4 md:py-2 border-2 border-editorial-dark bg-white hover:border-editorial-neonVolt transition-all duration-300 rounded-none shadow-[2px_2px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] group text-left focus:outline-none"
      >
        <div className="flex items-center flex-1 min-w-0">
          {/* Icon kính lúp bóng đá */}
          <svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
            className="text-editorial-dark mr-2 shrink-0 group-hover:text-editorial-neonPink transition-colors duration-300"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          
          <span className="text-xs md:text-sm font-sans font-medium text-gray-400 truncate">
            {searchParams.get("q") || "Tìm kiếm giày bóng đá..."}
          </span>
        </div>

      </button>

      {/* RENDER MODAL TÌM KIẾM CHÍNH (Sử dụng React Portal ở gốc body) */}
      <SearchModal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}

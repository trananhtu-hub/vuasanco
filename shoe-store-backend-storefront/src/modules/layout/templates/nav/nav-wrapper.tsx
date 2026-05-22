"use client"
import { useState, useEffect } from "react"

export default function NavWrapper({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false) // State mới để điều khiển ẩn/hiện

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. Xử lý viền và đổ bóng khi rời khỏi đỉnh trang
      if (currentScrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // 2. Xử lý giấu/hiện Menu dựa trên hướng cuộn chuột
      // Chỉ bắt đầu giấu khi đã cuộn xuống qua mốc 80px để tránh giật lag ở đầu trang
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true) // Đang cuộn xuống -> Giấu menu
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false) // Đang cuộn lên -> Hiện menu
      }

      // Cập nhật lại tọa độ cũ bằng tọa độ mới để dùng cho vòng lặp tiếp theo
      lastScrollY = currentScrollY
    }

    // Thêm { passive: true } giúp trình duyệt xử lý cuộn mượt mà hơn
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out transform ${
        isHidden ? "-translate-y-full" : "translate-y-0" // Trượt lên giấu đi hoặc trượt xuống hiện ra
      } ${
        isScrolled 
          ? "bg-editorial-light/80 backdrop-blur-md shadow-sm border-b border-gray-200/30" 
          : "bg-editorial-light" 
      }`}
    >
      {children}
    </div>
  )
}
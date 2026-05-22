"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useState } from "react"
import { clx } from "@medusajs/ui"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  // Trạng thái lưu trữ vị trí ảnh đang được hiển thị (mặc định là 0 - ảnh đầu tiên)
  const [activeIndex, setActiveIndex] = useState(0)

  // Kiểm tra an toàn nếu không có ảnh
  if (!images?.length) return null

  return (
    // Bố cục tổng: Điện thoại là 1 cột dọc (Ảnh chính trên, thumbnail dưới). Máy tính là 1 hàng ngang.
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:h-[700px]">
      
      {/* ================= CỘT THUMBNAIL (BÊN TRÁI) ================= */}
      {/* order-2 trên mobile (nằm dưới), order-1 trên lg (nằm trái) */}
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-24 xl:w-28 shrink-0 pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {images.map((image, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={image.id}
              // Hỗ trợ cả thao tác click (cho mobile/desktop) và rê chuột (desktop)
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              className={clx(
                // Thêm bg-white để nếu ảnh gốc là PNG trong suốt thì nền vẫn sáng đẹp
                "relative aspect-[4/5] w-20 lg:w-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out border-2 bg-white",
                {
                  "border-editorial-neonPink opacity-100 shadow-[2px_2px_0px_0px_rgba(255,42,122,1)] scale-[1.02]": isActive, // Viền đen đậm cho ảnh đang chọn
                  "border-editorial-dark opacity-50 hover:opacity-100 hover:border-gray-900": !isActive, // Ảnh chưa chọn bị làm mờ nhẹ
                }
              )}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  alt={`Hình thu nhỏ ${index + 1}`}
                  fill
                  // ĐÃ SỬA: Đổi object-cover thành object-contain và thêm p-1 (khoảng đệm nhỏ)
                  className="object-contain p-1"
                  sizes="(max-width: 1024px) 80px, 120px"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* ================= ẢNH CHÍNH (BÊN PHẢI) ================= */}
      {/* order-1 trên mobile (nằm trên), order-2 trên lg (nằm phải) */}
      <div className="order-1 lg:order-2 flex-1 relative aspect-[4/5] lg:aspect-auto lg:h-full w-full overflow-hidden border-2 border-editorial-dark bg-white transition-opacity duration-500 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] group cursor-zoom-in">
        {/* MAGZINE NOISE TEXTURE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-10"></div>
        
        {/* TICKET CUTOUTS DECORATION (Optional Editorial Vibe) */}
        <div className="absolute top-4 left-4 border-2 border-editorial-dark px-2 py-1 bg-editorial-neonVolt z-20">
          <span className="font-sans font-black uppercase text-[10px] tracking-widest text-editorial-dark">GALLERY</span>
        </div>

        {!!images[activeIndex]?.url && (
          <Image
            src={images[activeIndex].url}
            alt={`Ảnh sản phẩm ${activeIndex + 1}`}
            fill
            priority // Luôn ưu tiên tải bức ảnh chính đầu tiên
            // ĐÃ SỬA: Đổi object-cover thành object-contain
            className="object-contain p-8 lg:p-12 transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        )}
      </div>
      
    </div>
  )
}

export default ImageGallery
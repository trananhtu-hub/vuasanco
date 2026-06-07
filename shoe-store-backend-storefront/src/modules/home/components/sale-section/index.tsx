import React from "react"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountdownTimer from "./countdown-timer"

type SaleSectionProps = {
  products: HttpTypes.StoreProduct[]
  campaignTitle: string
  endDate: string
  region: HttpTypes.StoreRegion
}

export default function SaleSection({
  products,
  campaignTitle,
  endDate,
  region,
}: SaleSectionProps) {
  // Limit to max 6 products to form a 3x2 horizontal grid
  const displayProducts = products.slice(0, 6)

  if (displayProducts.length === 0) {
    return null
  }

  return (
    <div className="w-full bg-editorial-light border-y-8 border-editorial-dark py-16 relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>

      <div className="content-container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch lg:min-h-[700px]">
        
        {/* ================= CỘT TRÁI (1/3 - lg:col-span-4): BANNER & COUNTDOWN ================= */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-editorial-neonVolt p-6 md:p-8 border-4 border-editorial-dark shadow-[8px_8px_0px_#000] relative min-h-[420px] lg:h-full">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-block bg-editorial-neonPink text-white font-sans text-xs font-black px-4 py-1.5 uppercase tracking-widest border-2 border-editorial-dark shadow-[2px_2px_0px_#000]">
                SỰ KIỆN GIỚI HẠN
              </div>
              <div className="flex items-center gap-2">
                {/* Trái bóng */}
                <div className="bg-white border-2 border-editorial-dark shadow-[2px_2px_0px_#000] p-1.5 flex items-center justify-center" title="Trái bóng">
                  <svg className="w-5 h-5 text-editorial-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m12 2-2 3.5 2 3.5 4-1.5z"/>
                    <path d="M12 22v-5"/>
                    <path d="M2.5 7.5h5"/>
                    <path d="M21.5 7.5h-5"/>
                    <path d="m4.5 16.5 4.5-2.5"/>
                    <path d="m19.5 16.5-4.5-2.5"/>
                  </svg>
                </div>
                {/* Giày thể thao */}
                <div className="bg-white border-2 border-editorial-dark shadow-[2px_2px_0px_#000] p-1.5 flex items-center justify-center" title="Giày thể thao">
                  <svg className="w-5 h-5 text-editorial-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18h18c.83 0 1.5-.67 1.5-1.5V13l-3-4-4.5 1.5L12 9l-3 2H5l-2 3v2.5c0 .83.67 1.5 1.5 1.5z" />
                    <path d="M16 9.5l-1-4.5h-2.5L12 9" />
                    <circle cx="6" cy="18" r="1.5" />
                    <circle cx="12" cy="18" r="1.5" />
                    <circle cx="18" cy="18" r="1.5" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* DÒNG TIÊU ĐỀ NGHỆ THUẬT COLLAGE */}
            <div className="flex flex-col gap-y-2.5 mt-6 mb-8 select-none">
              {/* SALE rỗng viền đen */}
              <div 
                className="font-editorial text-[5.5rem] leading-[0.75] font-black text-transparent uppercase tracking-tighter" 
                style={{ WebkitTextStroke: "2.5px #0F0F0F" }}
              >
                SALE
              </div>
              
              {/* ĐỒNG LOẠT hồng chéo */}
              <div className="flex my-1">
                <div className="bg-editorial-neonPink text-white font-editorial text-[1.85rem] md:text-[2.20rem] font-black px-4 py-1.5 uppercase tracking-widest border-4 border-editorial-dark shadow-[3px_3px_0px_#000] -rotate-2 transform">
                  ĐỒNG LOẠT
                </div>
              </div>
              
              {/* KHAI MẠC thô ráp đậm */}
              <div className="font-editorial text-4xl md:text-[2.85rem] font-black text-editorial-dark tracking-tight uppercase leading-none mt-1">
                KHAI MẠC
              </div>
              
              {/* WORLD CUP 2026 trắng viền đen */}
              <div className="flex mt-1">
                <div className="bg-white text-editorial-dark font-editorial text-[1.75rem] md:text-[2.1rem] font-black px-3 py-1 uppercase tracking-tight border-2 border-editorial-dark shadow-[3px_3px_0px_#000]">
                  WORLD CUP 2026
                </div>
              </div>
            </div>
          </div>

          {/* Cartoon Soccer Cleat and Soccer Ball SVG Illustration */}
          <div className="hidden lg:flex flex-1 items-center justify-center my-6 select-none pointer-events-none">
            <svg className="w-full max-w-[220px] h-auto" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Motion lines behind shoe */}
              <path d="M15 45h30M10 60h25M20 75h20" stroke="#0F0F0F" strokeWidth="3.5" strokeLinecap="round"/>
              
              {/* Soccer ball on the right */}
              <g transform="translate(135, 25)">
                <circle cx="20" cy="20" r="18" fill="#FFFFFF" stroke="#0F0F0F" strokeWidth="3.5"/>
                {/* Ball pentagons */}
                <path d="M20 8l-6 4v7h12v-7z" fill="#0F0F0F"/>
                <path d="M20 8L12 2M14 12l-8 1M26 12l8 1M20 19v8M14 19l-6 6M26 19l6 6" stroke="#0F0F0F" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Action sparkles */}
                <path d="M-5 -5l3 3M45 -5l-3 3M-5 45l3-3M45 45l-3-3" stroke="#FF0055" strokeWidth="2.5" strokeLinecap="round"/>
              </g>

              {/* Kicking Shoe (Soccer Cleat) in the middle/left */}
              <g transform="translate(30, 20)">
                {/* Shoe body outline & fill */}
                <path d="M10 70 C 20 60, 30 35, 55 35 C 75 35, 80 45, 95 45 C 105 45, 110 50, 115 65 C 120 75, 110 80, 80 80 C 50 80, 20 80, 10 70 Z" fill="#FF0055" stroke="#0F0F0F" strokeWidth="3.5" strokeLinejoin="round"/>
                {/* Shoe sole/bottom */}
                <path d="M10 70 C 20 75, 50 78, 80 78 C 95 78, 105 77, 112 73" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round"/>
                <path d="M10 70 C 20 75, 50 78, 80 78 C 95 78, 105 77, 112 73" fill="none" stroke="#0F0F0F" strokeWidth="1.5" strokeLinecap="round"/>
                {/* Cleat Studs */}
                <path d="M25 78v6M40 79v6M65 79v6M85 79v6M100 77v6" stroke="#0F0F0F" strokeWidth="3.5" strokeLinecap="round"/>
                {/* Shoe laces / design stripes */}
                <path d="M48 37 C 55 45, 62 47, 72 47" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                <path d="M52 32 C 60 40, 68 42, 78 42" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
                {/* Lace ties */}
                <path d="M55 30 L 45 20 M 60 28 L 52 16" stroke="#0F0F0F" strokeWidth="3" strokeLinecap="round"/>
              </g>
            </svg>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-1.5">
              {/* Đồng hồ cát */}
              <div className="bg-white border-2 border-editorial-dark shadow-[2px_2px_0px_#000] p-1 flex items-center justify-center animate-bounce" title="Thời gian">
                <svg className="w-4 h-4 text-editorial-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 2h14" />
                  <path d="M5 22h14" />
                  <path d="M19 2v4c0 3.87-3.13 7-7 7s-7-3.13-7-7V2" />
                  <path d="M5 22v-4c0-3.87 3.13-7 7-7s7 3.13 7 7v4" />
                </svg>
              </div>
              <div className="text-[10px] font-sans font-black tracking-widest text-editorial-dark uppercase">
                THỜI GIAN CÒN LẠI:
              </div>
            </div>
            <CountdownTimer endDate={endDate} />
            
            <LocalizedClientLink href="/sale" className="block w-full mt-8">
              <button className="w-full py-4 bg-editorial-dark text-editorial-light hover:bg-white hover:text-editorial-dark text-sm font-bold font-sans uppercase tracking-widest border-2 border-editorial-dark shadow-[4px_4px_0px_#FF0055] hover:shadow-[2px_2px_0px_#FF0055] transition-all duration-150 active:translate-x-[2px] active:translate-y-[2px]">
                Xem Tất Cả Sản Phẩm Sale
              </button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* ================= CỘT PHẢI (2/3 - lg:col-span-8): LƯỚI CHỮ NHẬT 2X3 KÉO GIÃN ================= */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:grid-rows-2 lg:h-full mt-8 lg:mt-0">
          {displayProducts.map((product) => {
            const { cheapestPrice } = getProductPrice({ product })
            
            // Calculate discount percentage
            const discountPercentage =
              cheapestPrice &&
              cheapestPrice.original_price_number > cheapestPrice.calculated_price_number
                ? Math.round(
                    (1 -
                      cheapestPrice.calculated_price_number /
                        cheapestPrice.original_price_number) *
                      100
                  )
                : 0

            return (
              <LocalizedClientLink
                key={product.id}
                href={`/products/${product.handle}`}
                className="bg-white border-4 border-editorial-dark p-4 md:p-6 shadow-[6px_6px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative group lg:h-full"
              >
                {/* Sale percentage badge on top-left (Đổi sang màu xanh đặc trưng của web - neonVolt) */}
                {discountPercentage > 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-editorial-neonVolt text-editorial-dark font-sans text-[10px] md:text-xs font-black px-2.5 py-1.5 uppercase tracking-wider border-2 border-editorial-dark shadow-[2px_2px_0px_#000]">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}

                {/* Sub badge on top-right */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-editorial-neonVolt text-editorial-dark font-sans text-[8px] md:text-[9px] font-black px-2 py-0.5 border border-editorial-dark tracking-wider uppercase rounded-none">
                    SALE
                  </span>
                </div>

                {/* Cleat Image (fits perfectly horizontally) */}
                <div className="relative flex-1 w-full flex items-center justify-center bg-gray-50/50 my-1 overflow-hidden border border-gray-100 min-h-[120px] lg:min-h-0">
                  <img
                    src={product.thumbnail || ""}
                    alt={product.title || "Product image"}
                    className="object-contain max-h-[85%] max-w-[90%] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>

                {/* Cleat Details (Đã phóng to chữ sản phẩm) */}
                <div className="flex flex-col mt-2">
                  <h3 className="font-editorial text-lg md:text-xl lg:text-2xl font-black text-editorial-dark uppercase tracking-tight group-hover:text-editorial-neonVolt transition-colors duration-150 leading-tight mb-1">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-baseline gap-2 mt-1">
                    {cheapestPrice ? (
                      <>
                        <span 
                          className="text-base md:text-lg lg:text-xl font-black text-editorial-neonVolt"
                          style={{ textShadow: "-1.5px -1.5px 0 #0F0F0F, 1.5px -1.5px 0 #0F0F0F, -1.5px 1.5px 0 #0F0F0F, 1.5px 1.5px 0 #0F0F0F" }}
                        >
                          {cheapestPrice.calculated_price}
                        </span>
                        {discountPercentage > 0 && (
                          <span className="text-xs md:text-sm font-semibold text-gray-400 line-through">
                            {cheapestPrice.original_price}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="h-4 w-16 bg-gray-200 animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Interactive small "MUA" arrow */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-editorial-neonVolt font-editorial font-bold text-xs flex items-center gap-0.5" style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
                  MUA &gt;
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>

      </div>
    </div>
  )
}

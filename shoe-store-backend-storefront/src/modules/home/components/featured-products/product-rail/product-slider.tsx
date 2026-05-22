"use client"

import React, { useRef } from "react"

export default function ProductSlider({
  children,
}: {
  children: React.ReactNode
}) {
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    const container = sliderRef.current
    if (container) {
      // Scroll by 80% of the visible container width
      const scrollAmount = container.clientWidth * 0.8
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 relative group/slider">
      {/* Neobrutalist Navigation Arrow Buttons - Centered and aligned on the top right above the slider track */}
      <div className="absolute -top-24 right-0 flex gap-3 z-20">
        <button
          onClick={() => handleScroll("left")}
          className="p-3 border-2 border-editorial-dark bg-white text-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-all rounded-none shadow-[3px_3px_0px_0px_#0F0F0F] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_0px_#0F0F0F] flex items-center justify-center cursor-pointer select-none"
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="p-3 border-2 border-editorial-dark bg-white text-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-all rounded-none shadow-[3px_3px_0px_0px_#0F0F0F] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[1.5px_1.5px_0px_0px_#0F0F0F] flex items-center justify-center cursor-pointer select-none"
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={sliderRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 no-scrollbar scroll-smooth w-full -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
      >
        {children}
      </div>
    </div>
  )
}

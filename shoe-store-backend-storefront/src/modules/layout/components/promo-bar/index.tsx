"use client"

import { useState } from "react"

export default function PromoBar() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((v) => !v)
  }

  return (
    // Wrapper: không sticky, nằm tĩnh giữa nav và hero
    <div className="w-full relative z-30">
      {/* ── STYLES CHO MARQUEE ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* ── BAR CHÍNH ── */}
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="promo-panel"
        className="relative w-full overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-editorial-dark cursor-pointer bg-editorial-neonVolt border-b-4 border-editorial-dark hover:bg-editorial-neonPink transition-colors duration-300 h-12 flex items-center"
      >
        {/* ── Nội dung bar (Marquee) ── */}
        <div className="absolute flex items-center animate-marquee">
          {/* Lặp lại nội dung 4 lần để chạy liên tục mượt mà */}
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="flex items-center mx-4 text-editorial-dark font-editorial font-black uppercase text-lg sm:text-xl tracking-wider">
              <span className="text-2xl mr-3">🪐</span>
              Hội viên mới — Giảm ngay 20% toàn bộ đơn hàng
              <span className="text-2xl ml-3 mr-12">🪐</span>
            </span>
          ))}
        </div>

        {/* Mũi tên góc phải */}
        <div className="absolute right-0 top-0 bottom-0 bg-editorial-neonVolt border-l-4 border-editorial-dark w-16 flex items-center justify-center transition-colors duration-300 hover:bg-editorial-neonPink z-10">
          <span
            className="flex h-8 w-8 items-center justify-center transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </div>
      </button>

      {/* ── PANEL MỞ RỘNG ── */}
      <div
        id="promo-panel"
        role="region"
        aria-label="Chi tiết ưu đãi hội viên"
        className="overflow-hidden transition-all duration-500 ease-in-out absolute w-full left-0 right-0 z-20"
        style={{
          maxHeight: isOpen ? "800px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="bg-editorial-light border-b-4 border-editorial-dark relative">
          {/* Noise overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
          
          <div className="content-container py-10 sm:py-16 relative z-10">
            {/* Tiêu đề */}
            <div className="mb-12 text-center">
              <div className="inline-block bg-editorial-dark text-editorial-neonVolt px-4 py-1 mb-4 font-black uppercase tracking-widest text-sm border-2 border-editorial-dark shadow-[4px_4px_0px_0px_rgba(255,42,122,1)] transform -rotate-2">
                Chương trình hội viên
              </div>
              <h2 className="text-4xl sm:text-6xl font-editorial font-black uppercase leading-none text-editorial-dark">
                Ưu đãi dành riêng cho <br/>
                <span className="text-editorial-neonPink inline-block mt-2 bg-editorial-dark px-4 py-2">Hội viên mới</span>
              </h2>
            </div>

            {/* 3 quyền lợi - Layout Boxy */}
            <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  emoji: "🏷️",
                  title: "Giảm 20%",
                  desc: "Áp dụng toàn bộ đơn hàng đầu tiên, không giới hạn sản phẩm",
                },
                {
                  emoji: "🚚",
                  title: "Miễn phí vận chuyển",
                  desc: "Free ship tất cả đơn trong 30 ngày đầu sau khi đăng ký",
                },
                {
                  emoji: "🎁",
                  title: "Quà tặng sinh nhật",
                  desc: "Voucher bất ngờ tự động gửi vào tháng sinh nhật của bạn",
                },
              ].map((b, idx) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center border-4 border-editorial-dark bg-white p-6 text-center transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]"
                  style={{ transform: `rotate(${idx === 1 ? '1deg' : '-1deg'})` }}
                >
                  <span className="mb-4 text-5xl">{b.emoji}</span>
                  <p className="mb-2 text-xl font-editorial font-black uppercase tracking-wider text-editorial-dark">{b.title}</p>
                  <p className="text-sm font-sans font-bold text-gray-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            {/* Mã giảm giá + CTA */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Coupon box dạng Ticket */}
              <div className="flex items-center gap-4 border-4 border-editorial-dark bg-editorial-neonVolt px-6 py-4 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] relative overflow-hidden">
                {/* Răng cưa vé */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-editorial-dark bg-editorial-light"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-editorial-dark bg-editorial-light"></div>
                
                <span className="text-sm font-black uppercase tracking-[0.2em] text-editorial-dark ml-2">
                  Mã của bạn
                </span>
                <span className="text-2xl font-editorial font-black tracking-widest text-editorial-dark border-l-4 border-editorial-dark pl-4 ml-2">
                  HOIVIEN20
                </span>
                <CopyButton code="HOIVIEN20" />
              </div>

              {/* CTA button */}
              <LocalizedClientLinkPlaceholder />
            </div>

            {/* Footnote */}
            <p className="mt-8 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              * Ưu đãi áp dụng cho thành viên đăng ký lần đầu. Không áp dụng cùng khuyến mãi khác.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="bg-editorial-dark text-editorial-neonVolt w-10 h-10 flex items-center justify-center border-2 border-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-colors"
      title="Sao chép mã"
    >
      {copied ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
          <rect x="9" y="9" width="13" height="13"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
    </button>
  )
}

// Placeholder — thay bằng LocalizedClientLink thật trong dự án
function LocalizedClientLinkPlaceholder() {
  return (
    <a
      href="/account/register"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-2 bg-editorial-dark px-8 py-5 text-lg font-editorial font-black uppercase tracking-widest text-editorial-neonVolt transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,42,122,1)]"
    >
      Đăng ký ngay
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  )
}
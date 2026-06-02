"use client"

import React, { useEffect } from "react"

export default function EmailVerificationPendingPage() {
  useEffect(() => {
    // Tự động cuộn lên đầu trang khi tải trang để tránh bị nhảy xuống footer
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [])

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 bg-[#F9F9F9]">
      <div className="max-w-md w-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-10 flex flex-col items-center">
        
        {/* Sleek Envelope Icon Container */}
        <div className="w-20 h-20 bg-white border-2 border-black flex items-center justify-center mb-8 relative shadow-[4px_4px_0px_0px_rgba(255,0,85,1)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-black animate-pulse"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          {/* Subtle decorative dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF0055] border border-black rounded-full" />
        </div>

        {/* Oswald / Editorial Bold Uppercase Header */}
        <h1 className="text-3xl font-editorial font-extrabold text-black tracking-tight text-center mb-4 uppercase">
          CHỜ XÁC THỰC <span className="text-[#FF0055]">EMAIL</span>
        </h1>
        
        {/* Description Text */}
        <p className="text-zinc-600 font-medium text-sm text-center leading-relaxed mb-6">
          Chúc mừng bạn đã tạo tài khoản thành công! Chúng tôi đã gửi một liên kết xác thực tài khoản đến hòm thư Gmail của bạn.
        </p>

        {/* Brutalist Instruction Box */}
        <div className="bg-zinc-50 border border-black p-5 mb-8 text-left w-full shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
          <strong className="block mb-2 font-bold uppercase tracking-wider text-xs text-[#FF0055] flex items-center gap-1.5">
            <span>⚠️</span> HƯỚNG DẪN TIẾP THEO:
          </strong>
          <p className="text-zinc-700 text-xs leading-relaxed">
            Vui lòng kiểm tra hộp thư đến (bao gồm cả thư rác / spam) và nhấp vào nút <strong>"Xác Thực Tài Khoản"</strong> để kích hoạt tài khoản của bạn tại Vua Sân Cỏ.
          </p>
        </div>

        {/* Action Button: Keep only Gmail button with custom design sync */}
        <div className="w-full">
          <a
            href="https://mail.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-black text-white hover:bg-[#FF0055] hover:text-white transition-all duration-300 border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 text-center"
          >
            <span>Mở Gmail Ngay</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

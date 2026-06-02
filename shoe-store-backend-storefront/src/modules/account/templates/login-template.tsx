"use client"

import { useSearchParams } from "next/navigation"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

const LoginTemplate = () => {
  // Lấy tham số trên thanh URL
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")
  const verified = searchParams.get("verified")
  const reason = searchParams.get("reason")

  return (
    <div className="w-full flex flex-col justify-start items-center px-8 py-8">
      {/* Banner thông báo trạng thái xác thực */}
      {verified === "success" && (
        <div className="max-w-sm w-full bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 mb-6 flex items-start gap-3 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <div className="text-sm">
            <strong className="block font-semibold mb-0.5">Xác thực thành công!</strong>
            Tài khoản của bạn đã được kích hoạt. Hãy đăng nhập ngay bên dưới.
          </div>
        </div>
      )}

      {verified === "error" && (
        <div className="max-w-sm w-full bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 mb-6 flex items-start gap-3 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-rose-600 mt-0.5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <div className="text-sm">
            <strong className="block font-semibold mb-0.5">Xác thực thất bại!</strong>
            {reason === "EXPIRED_TOKEN" 
              ? "Liên kết xác thực đã hết hạn (24 giờ). Vui lòng đăng ký lại để nhận mã mới."
              : "Mã xác thực không hợp lệ, bị lỗi hoặc đã được sử dụng."}
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {/* Nếu URL có chữ mode=register thì hiện form Đăng ký, ngược lại hiện form Đăng nhập */}
        {mode === "register" ? (
          <Register />
        ) : (
          <Login />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
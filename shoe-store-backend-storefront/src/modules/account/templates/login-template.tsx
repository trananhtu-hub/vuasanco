"use client"

import { useSearchParams } from "next/navigation"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

const LoginTemplate = () => {
  // Lấy tham số trên thanh URL
  const searchParams = useSearchParams()
  const mode = searchParams.get("mode")

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {/* Nếu URL có chữ mode=register thì hiện form Đăng ký, ngược lại hiện form Đăng nhập */}
      {mode === "register" ? (
        <Register />
      ) : (
        <Login />
      )}
    </div>
  )
}

export default LoginTemplate
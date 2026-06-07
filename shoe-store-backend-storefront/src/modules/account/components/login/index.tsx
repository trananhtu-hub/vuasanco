"use client"

import { useActionState } from "react" // Cập nhật cho React 19
import React, { useState } from "react"
import { login } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { MEDUSA_BACKEND_URL } from "@lib/config"

type Props = {
  template?: any // Sửa lỗi Property 'auth_layout_template'
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = ({ template }: Props) => {
  // Sử dụng useActionState thay cho useFormState
  const [message, formAction] = useActionState(login, null)
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({})
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsGoogleLoading(true)
    try {
      const redirectUrl = `${window.location.origin}/api/auth/callback`
      const response = await fetch(
        `${MEDUSA_BACKEND_URL}/auth/customer/google?redirect_url=${redirectUrl}`
      )
      const data = await response.json()
      if (data.location) {
        window.location.href = data.location
      } else {
        console.error("Không tìm thấy đường dẫn chuyển hướng Google:", data)
        setIsGoogleLoading(false)
      }
    } catch (err) {
      console.error("Lỗi khi kết nối với máy chủ xác thực Google:", err)
      setIsGoogleLoading(false)
    }
  }

  const handleClientValidation = (formData: FormData) => {
    const email = formData.get("email") as string

    if (!email || !EMAIL_REGEX.test(email.trim())) {
      setLocalErrors({ email: "Định dạng Email không hợp lệ!" })
      return
    }

    setLocalErrors({})
    formAction(formData)
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="login-page">
      <h1 className="text-large-semi uppercase mb-6">Chào mừng trở lại</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Đăng nhập để xem lịch sử đơn hàng, ưu đãi và quản lý tài khoản của bạn tại Vua Sân Cỏ.
      </p>
      <form className="w-full" action={handleClientValidation}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="email-input"
            onChange={() => setLocalErrors(prev => ({ ...prev, email: "" }))}
          />
          {localErrors.email && <span className="text-red-500 text-xs">{localErrors.email}</span>}

          <Input
            label="Mật khẩu"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Đăng nhập
        </SubmitButton>
      </form>

      {/* Nút đăng nhập bằng Google (Neo-brutalist) */}
      <div className="w-full flex flex-col items-center gap-y-3 mt-4 border-t-2 border-dashed border-gray-200 pt-6">
        <span className="font-editorial text-xs font-bold uppercase tracking-wider text-gray-500">
          Hoặc đăng nhập bằng
        </span>
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-x-3 px-5 py-3 border-2 border-editorial-dark bg-white hover:bg-editorial-light text-editorial-dark font-editorial text-sm font-bold uppercase tracking-wider transition-all duration-150 shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          {isGoogleLoading ? "Đang xử lý..." : "Google"}
        </button>
      </div>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Bạn chưa có tài khoản?{" "}
        <LocalizedClientLink
          href="/account?mode=register"
          className="underline"
          data-testid="register-button"
        >
          Đăng ký ngay
        </LocalizedClientLink>
      </span>
    </div>
  )
}

export default Login
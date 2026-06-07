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
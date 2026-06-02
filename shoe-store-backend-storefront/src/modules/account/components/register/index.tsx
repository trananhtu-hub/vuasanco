"use client"

import { useActionState } from "react" // Cập nhật cho React 19
import React, { useState } from "react"
import { useParams } from "next/navigation"
import { signup } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  template?: any // Sửa lỗi Property 'auth_layout_template'
}

// --- QUY TẮC REGEX NGHIÊM NGẶT ---
const NAME_REGEX = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

const Register = ({ template }: Props) => {
  const params = useParams()
  const countryCode = (params.countryCode as string) || "vn"
  // Sử dụng useActionState thay cho useFormState
  const [message, formAction] = useActionState(signup, null)
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({})

  const handleClientValidation = (formData: FormData) => {
    const newErrors: Record<string, string> = {}

    const first_name = formData.get("first_name") as string
    const last_name = formData.get("last_name") as string
    const phone = formData.get("phone") as string

    if (!NAME_REGEX.test(first_name.trim())) {
      newErrors.first_name = "Tên chỉ được chứa chữ cái, không bao gồm số và ký tự đặc biệt!"
    }
    if (!NAME_REGEX.test(last_name.trim())) {
      newErrors.last_name = "Họ chỉ được chứa chữ cái, không bao gồm số và ký tự đặc biệt!"
    }
    if (phone && !PHONE_REGEX.test(phone.trim().replace(/\s/g, ''))) {
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0912345678)."
    }

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors)
      return
    }

    setLocalErrors({})
    formAction(formData)
  }

  return (
    <div className="max-w-sm flex flex-col items-center" data-testid="register-page">
      <h1 className="text-large-semi uppercase mb-6 text-center">
        Đăng ký thành viên Vua Sân Cỏ
      </h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        Tạo tài khoản để nhận những ưu đãi tốt nhất và theo dõi đơn hàng của bạn.
      </p>
      <form className="w-full flex flex-col" action={handleClientValidation}>
        <input type="hidden" name="country_code" value={countryCode} />
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Tên"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
            onChange={() => setLocalErrors(prev => ({ ...prev, first_name: "" }))}
          />
          {localErrors.first_name && <span className="text-red-500 text-xs">{localErrors.first_name}</span>}

          <Input
            label="Họ"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            onChange={() => setLocalErrors(prev => ({ ...prev, last_name: "" }))}
          />
          {localErrors.last_name && <span className="text-red-500 text-xs">{localErrors.last_name}</span>}

          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />

          <Input
            label="Số điện thoại"
            name="phone"
            autoComplete="tel"
            data-testid="phone-input"
            onChange={() => setLocalErrors(prev => ({ ...prev, phone: "" }))}
          />
          {localErrors.phone && <span className="text-red-500 text-xs">{localErrors.phone}</span>}

          <Input
            label="Mật khẩu"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ui-fg-base text-small-regular mt-6">
          Bằng việc tạo tài khoản, bạn đã đồng ý với{" "}
          <LocalizedClientLink href="/content/privacy-policy" className="underline">Chính sách bảo mật</LocalizedClientLink>{" "}
          và{" "}
          <LocalizedClientLink href="/content/terms-of-use" className="underline">Điều khoản sử dụng</LocalizedClientLink>{" "}
          của Vua Sân Cỏ.
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Đăng ký tài khoản
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Bạn đã có tài khoản?{" "}
        <LocalizedClientLink href="/account" className="underline">
          Đăng nhập ngay
        </LocalizedClientLink>
      </span>
    </div>
  )
}

export default Register
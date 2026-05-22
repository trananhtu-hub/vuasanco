"use client"

import React, { useEffect, useActionState, useState } from "react";

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

// Regex: Số điện thoại chuẩn Việt Nam
const PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = useState(false)
  const [localError, setLocalError] = useState<string>("")

  const updateCustomerPhone = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      phone: formData.get("phone") as string,
    }

    try {
      await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerPhone, {
    error: false,
    success: false,
  })

  // Hàm Gác cổng: Kiểm tra Form ở Client trước khi gọi API
  const handleClientValidation = (formData: FormData) => {
    const phone = formData.get("phone") as string

    if (!phone || !PHONE_REGEX.test(phone.trim().replace(/\s/g, ''))) {
      setLocalError("Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678).")
      return // Báo lỗi, ngăn form gọi server
    }

    setLocalError("")
    formAction(formData) // Dữ liệu chuẩn, đẩy lên server
  }

  const clearState = () => {
    setSuccessState(false)
    setLocalError("")
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={handleClientValidation} className="w-full">
      <AccountInfo
        label="Số điện thoại"
        currentInfo={customer.phone ? `${customer.phone}` : "Chưa cập nhật"}
        isSuccess={successState}
        isError={!!state.error || !!localError}
        errorMessage={state.error as string}
        clearState={clearState}
        data-testid="account-phone-editor"
      >
        <div className="grid grid-cols-1 gap-y-2">
          <div className="flex flex-col">
            <Input
              label="Số điện thoại"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              defaultValue={customer.phone ?? ""}
              data-testid="phone-input"
              onChange={() => setLocalError("")}
            />
            {localError && <span className="text-red-500 text-xs mt-1">{localError}</span>}
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfilePhone
"use client"

import React, { useEffect, useActionState, useState } from "react";

import Input from "@modules/common/components/input"

import AccountInfo from "../account-info"
import { HttpTypes } from "@medusajs/types"
import { updateCustomer } from "@lib/data/customer"

type MyInformationProps = {
  customer: HttpTypes.StoreCustomer
}

// Regex: Chỉ cho phép chữ cái Tiếng Việt và khoảng trắng
const NAME_REGEX = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [successState, setSuccessState] = useState(false)
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({})

  const updateCustomerName = async (
    _currentState: Record<string, unknown>,
    formData: FormData
  ) => {
    const customer = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
    }

    try {
      await updateCustomer(customer)
      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.toString() }
    }
  }

  const [state, formAction] = useActionState(updateCustomerName, {
    error: false,
    success: false,
  })

  // Hàm Gác cổng: Kiểm tra Form ở Client trước khi gọi API
  const handleClientValidation = (formData: FormData) => {
    const newErrors: Record<string, string> = {}
    const firstName = formData.get("first_name") as string
    const lastName = formData.get("last_name") as string

    if (!firstName || !NAME_REGEX.test(firstName.trim())) {
      newErrors.first_name = "Tên chỉ được chứa chữ cái, không bao gồm số và ký tự đặc biệt!"
    }
    if (!lastName || !NAME_REGEX.test(lastName.trim())) {
      newErrors.last_name = "Họ chỉ được chứa chữ cái, không bao gồm số và ký tự đặc biệt!"
    }

    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors)
      return // Báo lỗi, ngăn form gọi server
    }

    setLocalErrors({})
    formAction(formData) // Dữ liệu chuẩn, đẩy lên server
  }

  const clearState = () => {
    setSuccessState(false)
    setLocalErrors({})
  }

  useEffect(() => {
    setSuccessState(state.success)
  }, [state])

  return (
    <form action={handleClientValidation} className="w-full overflow-visible">
      <AccountInfo
        label="Họ và tên"
        currentInfo={`${customer.last_name} ${customer.first_name}`}
        isSuccess={successState}
        isError={!!state?.error || Object.keys(localErrors).length > 0}
        clearState={clearState}
        data-testid="account-name-editor"
      >
        <div className="grid grid-cols-2 gap-x-4">
          <div className="flex flex-col">
            <Input
              label="Họ"
              name="last_name"
              required
              defaultValue={customer.last_name ?? ""}
              data-testid="last-name-input"
              onChange={() => setLocalErrors(prev => ({ ...prev, last_name: "" }))}
            />
            {localErrors.last_name && <span className="text-red-500 text-xs mt-1">{localErrors.last_name}</span>}
          </div>
          <div className="flex flex-col">
            <Input
              label="Tên"
              name="first_name"
              required
              defaultValue={customer.first_name ?? ""}
              data-testid="first-name-input"
              onChange={() => setLocalErrors(prev => ({ ...prev, first_name: "" }))}
            />
            {localErrors.first_name && <span className="text-red-500 text-xs mt-1">{localErrors.first_name}</span>}
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
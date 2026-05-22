import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US", // Giữ nguyên en-US để có dấu phẩy ngăn cách hàng nghìn (1,120,000)
}: ConvertToLocaleParams) => {
  if (currency_code && !isEmpty(currency_code)) {
    // 1. Chỉ lấy phần số thập phân (không gán ký hiệu tiền tệ)
    const numericValue = new Intl.NumberFormat(locale, {
      style: "decimal", 
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount)

    // 2. Tự ghép thủ công chữ VND ra đằng sau con số
    return `${numericValue} ${currency_code.toUpperCase()}`
  }

  return amount.toString()
}
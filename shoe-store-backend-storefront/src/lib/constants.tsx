import React from "react"
import { CreditCard } from "@medusajs/icons"

import Ideal from "@modules/common/icons/ideal"
import Bancontact from "@modules/common/icons/bancontact"
import PayPal from "@modules/common/icons/paypal"

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Thẻ Tín Dụng / Thẻ Ghi Nợ (Stripe)",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    title: "Thẻ Tín Dụng / Thẻ Ghi Nợ",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "Cổng thanh toán iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Cổng thanh toán Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Thanh Toán Khi Nhận Hàng (COD)",
    icon: <CreditCard />,
  },
  vnpay: {
    title: "Thanh toán qua VNPay",
    icon: <VNPayIcon />,
  },
  pp_vnpay: {
    title: "Thanh toán qua VNPay",
    icon: <VNPayIcon />,
  },
  // Add more payment providers here
}

export const localizeShippingMethod = (name?: string): string => {
  if (!name) return ""
  const trimmed = name.trim()
  if (trimmed === "Standard Shipping") return "Giao Tiêu chuẩn"
  if (trimmed === "Express Shipping") return "Hỏa tốc"
  return trimmed
}

// Inline VNPay SVG Icon
function VNPayIcon() {
  return (
    <svg width="60" height="15" viewBox="0 0 112 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.6 2.3H9.8L15.2 19.5L20.6 2.3H25.8L17.8 25.3H12.6L4.6 2.3Z" fill="#005BAA" />
      <path d="M28.6 2.3H33.8L41.3 14.8V2.3H46.1V25.3H41.3L33.8 12.8V25.3H28.6V2.3Z" fill="#005BAA" />
      <path d="M49.6 2.3H61.2C65.5 2.3 68.9 5.4 68.9 9.8C68.9 14.2 65.5 17.3 61.2 17.3H54.4V25.3H49.6V2.3ZM54.4 7.1V12.5H61.2C62.9 12.5 64.1 11.4 64.1 9.8C64.1 8.2 62.9 7.1 61.2 7.1H54.4Z" fill="#E51F26" />
      <path d="M78.6 2.3H84.1L92.1 25.3H86.9L85.2 20.3H77.5L75.8 25.3H70.6L78.6 2.3ZM83.7 15.8L81.3 9.0L78.9 15.8H83.7Z" fill="#00AEEF" />
      <path d="M94.6 2.3L99.8 11.2L105.0 2.3H110.2L102.4 15.1V25.3H97.6V15.1L89.8 2.3H94.6Z" fill="#005BAA" />
    </svg>
  )
}

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  )
}

export const isPaypal = (providerId?: string) => {
  return providerId?.startsWith("pp_paypal")
}
export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default")
}
export const isVNPay = (providerId?: string) => {
  return providerId === "vnpay" || providerId === "pp_vnpay"
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]

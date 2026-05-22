"use server"

import crypto from "crypto"
import { headers } from "next/headers"
import { retrieveCart } from "./cart"

function formatVNPayDate(date: Date): string {
  const yyyy = date.getFullYear().toString()
  const MM = (date.getMonth() + 1).toString().padStart(2, "0")
  const dd = date.getDate().toString().padStart(2, "0")
  const HH = date.getHours().toString().padStart(2, "0")
  const mm = date.getMinutes().toString().padStart(2, "0")
  const ss = date.getSeconds().toString().padStart(2, "0")
  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`
}

/**
 * Server Action to securely generate the signed VNPay payment gateway URL.
 * @param cartId - The ID of the cart to create payment for.
 */
export async function getVNPayUrl(cartId: string): Promise<string> {
  const cart = await retrieveCart(cartId)
  if (!cart) {
    throw new Error("Cart not found when generating VNPay URL")
  }

  // 1. Read environment variables with robust defaults for Sandbox testing
  const tmnCode = process.env.VNP_TMN_CODE || "NL3B8OL7"
  const hashSecret = process.env.VNP_HASH_SECRET || "X6XOAFLGP6S6HBIHZEH4DXXK5M2S4MW4"
  const vnpUrl = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000"

  // 2. Determine client IP Address
  const headerList = await headers()
  const ipAddress = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1"

  // 3. Currency conversion: Medusa VND (stored as direct integer, e.g. 150000 VND)
  // VNPay expects the amount to be multiplied by 100
  const totalAmount = cart.total || 0
  const vnpAmount = Math.round(totalAmount * 100)

  // 4. Construct parameters
  const createDate = formatVNPayDate(new Date())
  const orderInfo = `Thanh toan don hang Vuasanco #${cartId}`
  const returnUrl = `${baseUrl}/api/vnpay/callback`
  const txnRef = `${cartId}-${Date.now()}` // Cart ID + unique timestamp

  const vnpParams: Record<string, string> = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Amount: vnpAmount.toString(),
    vnp_CurrCode: "VND",
    vnp_TxnRef: txnRef,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddress,
    vnp_CreateDate: createDate,
  }

  // 5. Sort parameters alphabetically by key
  const sortedKeys = Object.keys(vnpParams).sort()
  const signDataParts: string[] = []

  for (const key of sortedKeys) {
    const val = vnpParams[key]
    if (val !== undefined && val !== null && val !== "") {
      signDataParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val).replace(/%20/g, "+")}`)
    }
  }

  const signData = signDataParts.join("&")

  // 6. Compute HMAC-SHA512 checksum using the HashSecret key
  const hmac = crypto.createHmac("sha512", hashSecret as string)
  const signed = hmac.update(signData as string).digest("hex")

  // 7. Append signed secure hash to payment gateway URL
  const paymentUrl = `${vnpUrl}?${signData}&vnp_SecureHash=${signed}`

  return paymentUrl
}

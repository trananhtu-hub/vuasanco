import { NextResponse } from "next/server"
import crypto from "crypto"
import { placeOrder } from "@lib/data/cart"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const hashSecret = process.env.VNP_HASH_SECRET || "X6XOAFLGP6S6HBIHZEH4DXXK5M2S4MW4"
  const vnp_SecureHash = searchParams.get("vnp_SecureHash")
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode")
  const vnp_TxnRef = searchParams.get("vnp_TxnRef")

  if (!hashSecret || !vnp_SecureHash || !vnp_TxnRef) {
    console.error("VNPay Callback error: Missing configuration or secure hash parameters.")
    return NextResponse.redirect(new URL("/vn/checkout?step=payment&error=vnpay_config_error", request.url))
  }

  // 1. Verify checksum signature
  const vnpParams: Record<string, string> = {}
  searchParams.forEach((val, key) => {
    if (key.startsWith("vnp_") && key !== "vnp_SecureHash" && key !== "vnp_SecureHashType") {
      vnpParams[key] = val
    }
  })

  const sortedKeys = Object.keys(vnpParams).sort()
  const signDataParts: string[] = []

  for (const key of sortedKeys) {
    const val = vnpParams[key]
    if (val !== undefined && val !== null && val !== "") {
      signDataParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val).replace(/%20/g, "+")}`)
    }
  }

  const signData = signDataParts.join("&")

  const hmac = crypto.createHmac("sha512", hashSecret as string)
  const computedHash = hmac.update(signData as string).digest("hex")

  const isSignatureValid = computedHash.toLowerCase() === vnp_SecureHash.toLowerCase()

  if (!isSignatureValid) {
    console.error("VNPay Callback error: Secure Hash verification failed.")
    return NextResponse.redirect(new URL("/vn/checkout?step=payment&error=vnpay_signature_invalid", request.url))
  }

  // 2. Parse Cart ID from transaction reference
  const cartId = vnp_TxnRef.split("-")[0]
  if (!cartId) {
    console.error("VNPay Callback error: Cart ID not found in vnp_TxnRef.")
    return NextResponse.redirect(new URL("/vn/checkout?step=payment&error=vnpay_cart_not_found", request.url))
  }

  // 3. Process payment status
  if (vnp_ResponseCode === "00") {
    // Payment Successful! Complete the Medusa order
    try {
      console.log(`VNPay Payment successful for Cart: ${cartId}. Completing cart...`)
      await placeOrder(cartId)
      // Note: placeOrder redirects automatically on success.
      // But if it doesn't redirect or throws a regular error, we fallback:
      return NextResponse.redirect(new URL("/vn/checkout?step=review", request.url))
    } catch (err: any) {
      // If it is a Next.js redirect thrown by placeOrder, let it bubble up
      if (err instanceof Error && (err as any).digest?.startsWith("NEXT_REDIRECT")) {
        throw err
      }
      console.error("VNPay Callback error: Error placing order in Medusa:", err)
      return NextResponse.redirect(new URL(`/vn/checkout?step=payment&error=medusa_order_failed&msg=${encodeURIComponent(err.message)}`, request.url))
    }
  } else {
    // Payment failed or was cancelled by user
    console.warn(`VNPay Payment failed or cancelled for Cart: ${cartId}. Response code: ${vnp_ResponseCode}`)
    return NextResponse.redirect(new URL(`/vn/checkout?step=payment&error=vnpay_failed&code=${vnp_ResponseCode}`, request.url))
  }
}

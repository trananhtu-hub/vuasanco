import React from "react"
import { redirect } from "next/navigation"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type Props = {
  params: Promise<{ countryCode: string }>
  searchParams: SearchParams
}

export default async function EmailVerifyPage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { token } = await searchParams

  if (!token || typeof token !== "string") {
    redirect(`/${countryCode}/account?verified=error&reason=no_token`)
  }

  // Đầu cuối kết nối tới API Medusa Backend
  const backendUrl = (process.env.MEDUSA_BACKEND_URL || "http://127.0.0.1:9000").replace("localhost", "127.0.0.1")
  
  let redirectUrl = ""
  try {
    const res = await fetch(`${backendUrl}/store/customer/verify?token=${token}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
    })

    const data = await res.json()

    if (res.status === 200) {
      // Xác thực thành công hoặc tài khoản đã được xác thực trước đó
      redirectUrl = `/${countryCode}/account?verified=success`
    } else {
      // Có lỗi xác thực (Token hết hạn hoặc token không hợp lệ)
      const errorCode = data.code || "invalid"
      redirectUrl = `/${countryCode}/account?verified=error&reason=${errorCode}`
    }
  } catch (error) {
    console.error("Lỗi xác thực email:", error)
    redirectUrl = `/${countryCode}/account?verified=error&reason=server_error`
  }

  if (redirectUrl) {
    redirect(redirectUrl)
  }
}

import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const token = searchParams.get("token")
  const error = searchParams.get("error")

  if (error) {
    console.error("Lỗi đăng nhập Google từ OAuth:", error)
    return NextResponse.redirect(new URL("/vn/account?verified=error&reason=google_auth_failed", request.url))
  }

  let jwtToken = token

  // Nếu Google chuyển hướng trực tiếp về storefront kèm code & state
  if (code && state) {
    try {
      const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
      
      // Gọi lên backend để trao đổi code lấy JWT token
      const response = await fetch(
        `${backendUrl}/auth/customer/google/callback?code=${code}&state=${state}`
      )
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Lỗi từ backend khi trao đổi code lấy token:", errorText)
        return NextResponse.redirect(new URL("/vn/account?verified=error&reason=exchange_failed", request.url))
      }

      const data = await response.json()
      jwtToken = data.token
    } catch (err) {
      console.error("Lỗi hệ thống khi trao đổi code Google lấy token:", err)
      return NextResponse.redirect(new URL("/vn/account?verified=error&reason=system_error", request.url))
    }
  }

  if (jwtToken) {
    const cookieStore = await cookies()
    cookieStore.set("_medusa_jwt", jwtToken, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } else {
    console.error("Không nhận được token từ các tham số truy vấn")
    return NextResponse.redirect(new URL("/vn/account?verified=error&reason=no_token", request.url))
  }

  // Chuyển hướng về trang tài khoản của khách hàng
  return NextResponse.redirect(new URL("/vn/account", request.url))
}

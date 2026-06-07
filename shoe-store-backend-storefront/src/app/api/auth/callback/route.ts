import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const error = searchParams.get("error")

  if (error) {
    console.error("Lỗi đăng nhập Google từ backend:", error)
    return NextResponse.redirect(new URL("/vn/account?verified=error&reason=google_auth_failed", request.url))
  }

  if (token) {
    const cookieStore = await cookies()
    cookieStore.set("_medusa_jwt", token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
  } else {
    console.error("Không nhận được token từ backend")
    return NextResponse.redirect(new URL("/vn/account?verified=error&reason=no_token", request.url))
  }

  // Chuyển hướng về trang tài khoản của khách hàng
  return NextResponse.redirect(new URL("/vn/account", request.url))
}

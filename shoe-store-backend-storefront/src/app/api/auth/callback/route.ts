import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
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
    // Giải mã JWT để kiểm tra xem đã có customer_id (actor_id) chưa
    try {
      const payloadBase64 = jwtToken.split(".")[1]
      const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8")
      const payload = JSON.parse(payloadJson)

      const actorId = payload.actor_id
      
      // Nếu actor_id chưa được liên kết (đăng nhập Google lần đầu hoặc chưa liên kết Customer)
      if (!actorId) {
        const email = payload.email || payload.user_metadata?.email
        console.log(`Đăng nhập Google: email ${email} chưa liên kết với Customer. Tiến hành xử lý liên kết...`)

        // 1. Gọi custom endpoint để liên kết hoặc tạo Customer mới
        const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""
        const createCustomerResponse = await fetch(`${backendUrl}/store/custom/google-link`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
            "x-publishable-api-key": publishableKey,
          },
        })

        if (!createCustomerResponse.ok) {
          const createErrorText = await createCustomerResponse.text()
          console.error("Lỗi khi liên kết hoặc tạo Customer từ token Google:", createErrorText)
        } else {
          console.log("Xử lý liên kết/tạo Customer từ Google thành công.")
        }

        // 2. Làm mới JWT Token để nhận được token mới chứa actor_id (customer_id)
        const refreshResponse = await fetch(`${backendUrl}/auth/token/refresh`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${jwtToken}`,
          },
        })

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json()
          jwtToken = refreshData.token
          console.log("Làm mới token thành công với actor_id mới.")
        } else {
          console.error("Lỗi khi làm mới token sau khi liên kết customer:", await refreshResponse.text())
        }
      }
    } catch (jwtErr) {
      console.error("Lỗi xử lý JWT hoặc tạo customer liên kết:", jwtErr)
    }

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

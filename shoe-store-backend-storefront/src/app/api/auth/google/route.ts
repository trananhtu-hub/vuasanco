import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  
  // Construct the callback URL pointing to our storefront callback route
  const origin = new URL(request.url).origin
  const redirectUrl = `${origin}/api/auth/callback`
  
  try {
    const response = await fetch(
      `${backendUrl}/auth/customer/google?redirect_url=${redirectUrl}`
    )
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("Lỗi từ Medusa backend khi lấy link Google Auth:", errorText)
      return NextResponse.redirect(new URL("/vn/account?verified=error&reason=backend_error", request.url))
    }
    
    const data = await response.json()
    
    if (data.location) {
      return NextResponse.redirect(data.location)
    } else {
      console.error("Không tìm thấy location trong phản hồi của backend:", data)
      return NextResponse.redirect(new URL("/vn/account?verified=error&reason=no_location", request.url))
    }
  } catch (error) {
    console.error("Lỗi hệ thống khi gọi endpoint Google Auth:", error)
    return NextResponse.redirect(new URL("/vn/account?verified=error&reason=system_error", request.url))
  }
}

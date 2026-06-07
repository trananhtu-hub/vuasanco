import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import * as jwt from "jsonwebtoken"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Thiếu hoặc sai định dạng token Authorization.",
    })
  }

  const token = authHeader.split(" ")[1]
  const configModule = req.scope.resolve("configModule")
  const jwtSecret = configModule.projectConfig.http.jwtSecret || process.env.JWT_SECRET || "supersecret"

  try {
    // 1. Xác thực và giải mã JWT token từ Google OAuth
    const decoded = jwt.verify(token, jwtSecret) as any
    const authIdentityId = decoded.sub
    const email = decoded.email || decoded.user_metadata?.email

    if (!authIdentityId || !email) {
      return res.status(400).json({
        message: "Token không hợp lệ: Thiếu authIdentityId hoặc email.",
      })
    }

    const customerModuleService = req.scope.resolve("customer")
    const remoteLink = req.scope.resolve("remoteLink")

    // 2. Tìm Customer hiện tại theo email
    const customers = await customerModuleService.listCustomers({ email })
    let customerId: string

    if (customers.length > 0) {
      customerId = customers[0].id
      console.log(`Tìm thấy Customer hiện tại cho email: ${email}, ID: ${customerId}. Đang liên kết với Google AuthIdentity...`)
    } else {
      // 3. Nếu chưa có Customer, tạo mới
      const first_name = decoded.user_metadata?.given_name || decoded.user_metadata?.name || "Google"
      const last_name = decoded.user_metadata?.family_name || "User"
      
      console.log(`Không tìm thấy Customer cho email: ${email}. Đang tạo mới...`)
      const newCustomer = await customerModuleService.createCustomers({
        email,
        first_name,
        last_name,
        has_account: true,
      })
      customerId = newCustomer.id
      console.log(`Tạo Customer thành công, ID: ${customerId}`)
    }

    // 4. Liên kết AuthIdentity với Customer qua Link Service
    try {
      await remoteLink.create([
        {
          [Modules.AUTH]: {
            auth_identity_id: authIdentityId,
          },
          [Modules.CUSTOMER]: {
            customer_id: customerId,
          },
        },
      ])
      console.log(`Liên kết thành công AuthIdentity (${authIdentityId}) và Customer (${customerId})`)
    } catch (linkError: any) {
      // Nếu liên kết đã tồn tại từ trước, bỏ qua lỗi hoặc log thông báo
      if (linkError.message?.includes("already exists") || linkError.code === "23505" || String(linkError).includes("already exists")) {
        console.log(`Liên kết đã tồn tại giữa AuthIdentity (${authIdentityId}) và Customer (${customerId})`)
      } else {
        throw linkError
      }
    }

    return res.status(200).json({
      success: true,
      customer_id: customerId,
      message: "Liên kết tài khoản Google thành công.",
    })
  } catch (err: any) {
    console.error("Lỗi khi xử lý google-link trong backend:", err)
    return res.status(500).json({
      message: "Lỗi hệ thống khi xử lý liên kết tài khoản Google.",
      error: err.message,
    })
  }
}

import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { EMAIL_VERIFICATION_MODULE } from "../../../../modules/email-verification"
import EmailVerificationService from "../../../../modules/email-verification/service"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const email = req.query.email as string

  if (!email) {
    return res.status(400).json({
      message: "Yêu cầu thiếu email.",
    })
  }

  const customerService = req.scope.resolve("customer")
  const emailVerificationService: EmailVerificationService = req.scope.resolve(
    EMAIL_VERIFICATION_MODULE
  )

  try {
    // 1. Tìm thông tin khách hàng bằng email
    const customers = await customerService.listCustomers({ email })
    if (customers.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy khách hàng.",
      })
    }

    const customer = customers[0]

    // 2. Tìm bản ghi xác thực email tương ứng
    const verifications = await emailVerificationService.listEmailVerifications({
      customer_id: customer.id,
    })

    // 3. Nếu chưa có bản ghi xác thực, mặc định là chưa xác thực
    const isVerified = verifications.length > 0 ? verifications[0].is_verified : false

    return res.status(200).json({
      is_verified: isVerified,
    })
  } catch (err: any) {
    return res.status(500).json({
      message: "Lỗi hệ thống khi kiểm tra trạng thái xác thực.",
      error: err.message,
    })
  }
}

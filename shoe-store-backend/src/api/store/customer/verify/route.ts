import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { EMAIL_VERIFICATION_MODULE } from "../../../../modules/email-verification"
import EmailVerificationService from "../../../../modules/email-verification/service"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const token = req.query.token as string

  if (!token) {
    return res.status(400).json({
      message: "Yêu cầu xác thực thiếu token.",
    })
  }

  const emailVerificationService: EmailVerificationService = req.scope.resolve(
    EMAIL_VERIFICATION_MODULE
  )

  // 1. Tìm thông tin xác thực dựa trên token
  const verifications = await emailVerificationService.listEmailVerifications({
    verification_token: token,
  })

  if (verifications.length === 0) {
    return res.status(400).json({
      code: "INVALID_TOKEN",
      message: "Mã xác thực không hợp lệ hoặc đã được sử dụng.",
    })
  }

  const verification = verifications[0]

  // 2. Kiểm tra trạng thái đã được xác thực trước đó hay chưa
  if (verification.is_verified) {
    return res.status(200).json({
      code: "ALREADY_VERIFIED",
      message: "Email này đã được xác thực thành công từ trước.",
    })
  }

  // 3. Kiểm tra hạn dùng của token (24 giờ)
  const now = new Date()
  if (verification.token_expires_at && new Date(verification.token_expires_at) < now) {
    return res.status(400).json({
      code: "EXPIRED_TOKEN",
      message: "Mã xác thực đã hết hạn (giới hạn 24 giờ). Vui lòng yêu cầu gửi lại email mới.",
    })
  }

  // 4. Cập nhật trạng thái thành công trong Database
  await emailVerificationService.updateEmailVerifications({
    id: verification.id,
    is_verified: true,
    verified_at: new Date(),
    verification_token: null, // Xóa token để tránh tái sử dụng
    token_expires_at: null,
  })

  // 5. Trả về kết quả xác thực thành công
  return res.status(200).json({
    code: "VERIFICATION_SUCCESS",
    message: "Xác thực tài khoản thành công! Bây giờ bạn đã có thể đăng nhập.",
  })
}

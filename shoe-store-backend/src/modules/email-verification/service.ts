import { MedusaService } from "@medusajs/framework/utils"
import EmailVerification from "./models/email-verification"
import crypto from "crypto"

class EmailVerificationService extends MedusaService({
  EmailVerification,
}) {
  constructor() {
    // @ts-ignore
    super(...arguments)
  }

  async generateVerificationToken(customerId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // 24 hours expiry

    const existing = await this.listEmailVerifications({ customer_id: customerId })

    if (existing.length > 0) {
      await this.updateEmailVerifications({
        id: existing[0].id,
        verification_token: token,
        token_expires_at: expiresAt,
      })
    } else {
      await this.createEmailVerifications({
        customer_id: customerId,
        verification_token: token,
        token_expires_at: expiresAt,
        is_verified: false,
      })
    }

    return token
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verifyUrl = `${process.env.STOREFRONT_URL || "http://localhost:8000"}/email-verify?token=${token}`

    const fromStr = process.env.SMTP_FROM || ""
    const emailMatch = fromStr.match(/<([^>]+)>/)
    const nameMatch = fromStr.match(/^"([^"]+)"/) || fromStr.match(/^([^<]+)/)

    const senderEmail = emailMatch ? emailMatch[1].trim() : (fromStr.includes("@") ? fromStr.trim() : "cammuoitus@gmail.com")
    const senderName = nameMatch ? nameMatch[1].trim() : "Vua Sân Cỏ"

    const apiKey = process.env.SMTP_PASS
    if (!apiKey) {
      throw new Error("SMTP_PASS (Brevo API Key) is not configured in environment variables")
    }

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #1a1a1a; text-align: center;">Chào mừng bạn đến với Vua Sân Cỏ!</h2>
          <p>Cảm ơn bạn đã đăng ký tài khoản. Để hoàn tất quy trình đăng ký và bắt đầu mua sắm giày bóng đá chính hãng, vui lòng xác nhận địa chỉ email của bạn bằng cách nhấn vào liên kết bên dưới:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verifyUrl}" style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Xác Thực Tài Khoản</a>
          </div>
          <p style="color: #666; font-size: 14px;">Liên kết này có hiệu lực trong vòng 24 giờ. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px; text-align: center;">Vua Sân Cỏ - Giày Bóng Đá Chính Hãng</p>
        </div>
      `

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: email,
          },
        ],
        subject: "Xác thực tài khoản Vua Sân Cỏ của bạn",
        htmlContent: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Brevo HTTP API Error (${response.status}): ${errorText}`)
    }
  }
}

export default EmailVerificationService

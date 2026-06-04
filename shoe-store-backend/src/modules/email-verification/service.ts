import { MedusaService } from "@medusajs/framework/utils"
import EmailVerification from "./models/email-verification"
import nodemailer from "nodemailer"
import crypto from "crypto"
import dns from "dns"

dns.setDefaultResultOrder("ipv4first")

class EmailVerificationService extends MedusaService({
  EmailVerification,
}) {
  protected transporter_: nodemailer.Transporter

  constructor() {
    // @ts-ignore
    super(...arguments)

    this.transporter_ = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    })
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

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Vua San Co" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Xác thực tài khoản Vua Sân Cỏ của bạn",
      html: `
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
      `,
    }

    await this.transporter_.sendMail(mailOptions)
  }
}

export default EmailVerificationService

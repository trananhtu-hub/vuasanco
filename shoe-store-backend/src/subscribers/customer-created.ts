import type { SubscriberConfig, SubscriberArgs } from "@medusajs/framework"
import { EMAIL_VERIFICATION_MODULE } from "../modules/email-verification"
import EmailVerificationService from "../modules/email-verification/service"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const customerId = data.id

  try {
    const customerModuleService = container.resolve("customer")
    const customer = await customerModuleService.retrieveCustomer(customerId)

    if (!customer.email) return

    const emailVerificationService: EmailVerificationService = container.resolve(
      EMAIL_VERIFICATION_MODULE
    )

    // 1. Tạo mã hóa bảo mật token cho customer mới
    const token = await emailVerificationService.generateVerificationToken(customerId)

    // 2. Gửi email thông qua SMTP NodeMailer
    await emailVerificationService.sendVerificationEmail(customer.email, token)
    
    logger.info(`Email xác thực đã được gửi thành công đến ${customer.email}`)
  } catch (error) {
    logger.error(
      `Lỗi trong subscriber customerCreatedHandler (xác thực email): ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
  context: {
    subscriberId: "customer-created-verification",
  },
}

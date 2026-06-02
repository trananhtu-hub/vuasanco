import { model } from "@medusajs/framework/utils"

const EmailVerification = model.define("email_verification", {
  id: model.id().primaryKey(),
  customer_id: model.text().unique(), // Dùng model.text() thay cho model.string()
  is_verified: model.boolean().default(false),
  verification_token: model.text().nullable(),
  token_expires_at: model.dateTime().nullable(),
  verified_at: model.dateTime().nullable(),
})

export default EmailVerification

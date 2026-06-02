import { defineLink } from "@medusajs/framework/utils"
import CustomerModule from "@medusajs/medusa/customer"
import EmailVerificationModule from "../modules/email-verification"

export default defineLink(
  CustomerModule.linkable.customer,
  EmailVerificationModule.linkable.emailVerification
)

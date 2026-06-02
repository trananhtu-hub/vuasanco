import EmailVerificationService from "./service"
import { Module } from "@medusajs/framework/utils"

export const EMAIL_VERIFICATION_MODULE = "emailVerificationModule"

export default Module(EMAIL_VERIFICATION_MODULE, {
  service: EmailVerificationService,
})

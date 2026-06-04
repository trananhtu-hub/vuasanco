import { NextResponse } from "next/server"
import { MEDUSA_BACKEND_URL } from "@lib/config"

export async function GET() {
  return NextResponse.json({
    MEDUSA_BACKEND_URL_FROM_CONFIG: MEDUSA_BACKEND_URL,
    process_env_MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL || "NOT_SET",
    process_env_NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "NOT_SET",
    process_env_NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "NOT_SET",
    NODE_ENV: process.env.NODE_ENV,
  })
}

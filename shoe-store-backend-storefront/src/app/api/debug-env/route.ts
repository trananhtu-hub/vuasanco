import { NextResponse } from "next/server"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { listProducts } from "@lib/data/products"

export const dynamic = "force-dynamic"

export async function GET() {
  // Clear logs first
  if (typeof global !== "undefined") {
    (global as any).replaceLogs = [];
  }

  let listProductsOutput = null
  try {
    listProductsOutput = await listProducts({
      queryParams: {
        q: "nike",
        limit: 1
      },
      countryCode: "vn",
    })
  } catch (err: any) {
    listProductsOutput = { error: err.message }
  }

  const logs = typeof global !== "undefined" ? (global as any).replaceLogs || [] : []

  return NextResponse.json({
    MEDUSA_BACKEND_URL_FROM_CONFIG: MEDUSA_BACKEND_URL,
    process_env_MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL || "NOT_SET",
    listProductsOutput,
    replaceLogs: logs,
  })
}

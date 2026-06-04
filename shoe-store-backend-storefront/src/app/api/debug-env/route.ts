import { NextResponse } from "next/server"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { listProducts } from "@lib/data/products"

export async function GET() {
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

  return NextResponse.json({
    MEDUSA_BACKEND_URL_FROM_CONFIG: MEDUSA_BACKEND_URL,
    process_env_MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL || "NOT_SET",
    process_env_NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "NOT_SET",
    listProductsOutput,
  })
}

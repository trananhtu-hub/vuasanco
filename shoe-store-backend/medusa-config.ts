import { loadEnv, defineConfig } from '@medusajs/framework/utils'
import fs from "fs"
import path from "path"

const logError = (error: any) => {
  try {
    const logPath = path.join(process.cwd(), "static", "error-log.txt")
    const dir = path.dirname(logPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const message = `[${new Date().toISOString()}] ${error?.stack || error || "Unknown error"}\n`
    fs.appendFileSync(logPath, message)
  } catch (e) {
    console.error("Failed to write to error-log.txt:", e)
  }
}

// Attach global listeners
if (typeof process !== "undefined") {
  process.on("uncaughtException", (err) => {
    logError(err)
  })

  process.on("unhandledRejection", (reason, promise) => {
    logError(reason)
  })
}

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

let backendUrl = process.env.MEDUSA_BACKEND_URL
  || (process.env.RAILWAY_STATIC_URL ? `https://${process.env.RAILWAY_STATIC_URL}` : "http://localhost:9000")

if (!backendUrl.endsWith("/static")) {
  backendUrl = `${backendUrl}/static`
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./src/modules/email-verification",
    },
    {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-local",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: backendUrl,
            },
          },
        ],
      },
    },
  ]
})

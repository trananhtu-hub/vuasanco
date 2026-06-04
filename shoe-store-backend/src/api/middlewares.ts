import { defineMiddlewares } from "@medusajs/medusa"
import express from "express"
import path from "path"

const staticServe = express.static(path.join(process.cwd(), "static"))

export default defineMiddlewares({
  routes: [
    {
      method: "GET",
      matcher: "/static/*",
      middlewares: [
        (req, res, next) => {
          const originalUrl = req.url
          // Strip "/static" prefix from the url so express.static matches correctly
          req.url = req.url.replace(/^\/static/, "")
          staticServe(req, res, (err) => {
            req.url = originalUrl
            next(err)
          })
        }
      ],
    },
  ],
})

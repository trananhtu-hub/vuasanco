import { getLocaleHeader } from "@lib/util/get-locale-header"
import Medusa, { FetchArgs, FetchInput } from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
export let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

const originalFetch = sdk.client.fetch.bind(sdk.client)

function replaceLocalhostUrl(obj: any, targetUrl: string): any {
  if (!obj) return obj

  if (typeof obj === "string") {
    let url = obj
    if (url.startsWith("http://localhost:9000")) {
      url = url.replace("http://localhost:9000", targetUrl)
    }

    if (url.startsWith(targetUrl)) {
      const pathPart = url.substring(targetUrl.length)
      if (pathPart.startsWith("/") && !pathPart.startsWith("/static/")) {
        url = targetUrl + "/static" + pathPart
      }
    }
    return url
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => replaceLocalhostUrl(item, targetUrl))
  }

  if (typeof obj === "object") {
    const newObj: any = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = replaceLocalhostUrl(obj[key], targetUrl)
      }
    }
    return newObj
  }

  return obj
}

sdk.client.fetch = async <T>(
  input: FetchInput,
  init?: FetchArgs
): Promise<T> => {
  const headers = init?.headers ?? {}
  let localeHeader: Record<string, string | null> | undefined
  try {
    localeHeader = await getLocaleHeader()
    headers["x-medusa-locale"] ??= localeHeader["x-medusa-locale"]
  } catch {}

  const newHeaders = {
    ...localeHeader,
    ...headers,
  }
  init = {
    ...init,
    headers: newHeaders,
  }
  const response = await originalFetch(input, init)
  return replaceLocalhostUrl(response, MEDUSA_BACKEND_URL) as T
}

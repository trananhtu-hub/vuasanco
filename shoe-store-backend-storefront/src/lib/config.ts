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

// Global array for logging URL replacement execution in production
if (typeof global !== "undefined") {
  (global as any).replaceLogs = [];
}

function replaceLocalhostUrl(obj: any, targetUrl: string): any {
  if (!obj) return obj

  if (typeof obj === "string") {
    let url = obj
    if (url.startsWith("http://localhost:9000")) {
      url = url.replace("http://localhost:9000", targetUrl)
    }

    const normalizedTarget = targetUrl.endsWith("/") ? targetUrl.slice(0, -1) : targetUrl

    if (url.startsWith(normalizedTarget)) {
      const pathPart = url.substring(normalizedTarget.length)
      if (pathPart.startsWith("/") && !pathPart.startsWith("/static/")) {
        url = normalizedTarget + "/static" + pathPart
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

    // Fallback for Product thumbnail
    if (newObj.id?.startsWith("prod_") || ("title" in newObj && "images" in newObj)) {
      const prevThumbnail = newObj.thumbnail;
      const imagesCount = newObj.images?.length || 0;
      const firstImageUrl = newObj.images?.[0]?.url;
      
      if (!newObj.thumbnail && newObj.images?.[0]?.url) {
        newObj.thumbnail = newObj.images[0].url
      }
      
      if (typeof global !== "undefined" && (global as any).replaceLogs) {
        (global as any).replaceLogs.push({
          type: "product",
          id: newObj.id,
          title: newObj.title,
          prevThumbnail,
          newThumbnail: newObj.thumbnail,
          imagesCount,
          firstImageUrl
        });
      }
    }

    // Fallback for LineItem thumbnail
    if (newObj.id?.startsWith("item_") || newObj.id?.startsWith("cali_") || "product_title" in newObj) {
      const prevThumbnail = newObj.thumbnail;
      if (!newObj.thumbnail) {
        newObj.thumbnail =
          newObj.product?.images?.[0]?.url ||
          newObj.variant?.product?.images?.[0]?.url ||
          newObj.product?.thumbnail ||
          newObj.variant?.product?.thumbnail ||
          null
      }
      
      if (typeof global !== "undefined" && (global as any).replaceLogs) {
        (global as any).replaceLogs.push({
          type: "line_item",
          id: newObj.id,
          product_title: newObj.product_title,
          prevThumbnail,
          newThumbnail: newObj.thumbnail,
          hasProductRelation: !!newObj.product,
          hasVariantRelation: !!newObj.variant
        });
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
  
  if (typeof global !== "undefined" && (global as any).replaceLogs) {
    (global as any).replaceLogs.push({
      action: "fetch_start",
      url: input,
    });
  }
  
  const replaced = replaceLocalhostUrl(response, MEDUSA_BACKEND_URL) as T
  
  if (typeof global !== "undefined" && (global as any).replaceLogs) {
    (global as any).replaceLogs.push({
      action: "fetch_end",
      url: input,
    });
  }
  
  return replaced;
}

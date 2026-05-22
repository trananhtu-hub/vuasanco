import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-8 border-t-2 border-editorial-dark pt-6">
      <Heading className="font-editorial font-black uppercase text-lg text-editorial-dark tracking-wider mb-2">
        Bạn cần trợ giúp?
      </Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-3 flex flex-col">
          <li>
            <LocalizedClientLink 
              href="/contact"
              className="font-editorial font-bold uppercase text-sm text-editorial-dark hover:text-editorial-neonPink underline decoration-2 transition-colors"
            >
              Liên hệ với chúng tôi
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink 
              href="/contact"
              className="font-editorial font-bold uppercase text-sm text-editorial-dark hover:text-editorial-neonPink underline decoration-2 transition-colors"
            >
              Chính sách đổi trả & hoàn tiền
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help

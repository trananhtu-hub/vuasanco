"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6 bg-editorial-neonVolt p-6 lg:p-8 border-4 border-editorial-dark sticky top-24 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] relative overflow-hidden">
      {/* Răng cưa vé VIP */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-editorial-dark bg-editorial-light"></div>
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-editorial-dark bg-editorial-light"></div>

      <div className="border-b-4 border-editorial-dark pb-4 mb-2">
        <h2 className="text-3xl font-editorial font-black uppercase tracking-wider text-editorial-dark">
          Tóm Tắt Đơn
        </h2>
      </div>
      
      <DiscountCode cart={cart} />
      
      <Divider className="my-2 border-dashed border-2 border-editorial-dark bg-transparent h-0" />
      
      <div className="font-sans font-bold text-editorial-dark">
        <CartTotals totals={cart} />
      </div>
      
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-16 mt-6 text-xl font-editorial font-black uppercase tracking-widest rounded-none bg-editorial-dark text-editorial-neonVolt hover:bg-editorial-neonPink hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,42,122,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
          THANH TOÁN NGAY
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-12 min-h-[calc(100vh-64px)] bg-editorial-light">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-3xl h-full w-full px-4">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-6 w-full bg-white border-4 border-editorial-dark p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] rounded-none relative overflow-hidden"
          data-testid="order-complete-container"
        >
          {/* Neon Volt Success Badge */}
          <div className="absolute top-6 right-[-35px] rotate-[30deg] bg-editorial-neonVolt text-editorial-dark font-editorial font-black uppercase text-[10px] tracking-widest py-1.5 px-10 border-2 border-editorial-dark shadow-sm">
            HOÀN TẤT
          </div>

          <div className="border-b-4 border-dashed border-editorial-dark pb-6 mb-4">
            <Heading
              level="h1"
              className="flex flex-col gap-y-2 text-editorial-dark font-editorial font-black uppercase text-3xl md:text-4xl tracking-wider leading-none"
            >
              <span className="text-editorial-neonPink">CẢM ƠN BẠN!</span>
              <span className="text-base md:text-lg font-sans font-medium normal-case text-ui-fg-subtle">
                Đơn hàng của bạn đã được đặt thành công.
              </span>
            </Heading>
          </div>

          <OrderDetails order={order} />

          <Heading 
            level="h2" 
            className="font-editorial font-black uppercase text-xl md:text-2xl text-editorial-dark tracking-wider border-b-2 border-editorial-dark pb-2 mt-6"
          >
            TÓM TẮT ĐƠN HÀNG
          </Heading>
          
          <Items order={order} />
          <CartTotals totals={order} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ShippingDetails order={order} />
            <PaymentDetails order={order} />
          </div>

          <Help />
        </div>
      </div>
    </div>
  )
}

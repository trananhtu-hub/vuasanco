"use client"

import { Heading, Text, clx } from "@medusajs/ui"

import PaymentButton from "../payment-button"
import { useSearchParams } from "next/navigation"

const Review = ({ cart }: { cart: any }) => {
  const searchParams = useSearchParams()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const previousStepsCompleted =
    cart.shipping_address &&
    cart.shipping_methods.length > 0 &&
    (cart.payment_collection || paidByGiftcard)

  return (
    <div className={clx("bg-white border-2 border-editorial-dark shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] p-6 lg:p-8 rounded-none transition-all duration-150 mb-8", {
      "border-editorial-neonVolt shadow-[6px_6px_0px_0px_rgba(211,255,36,1)]": isOpen,
    })}>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl lg:text-3xl font-editorial font-black uppercase tracking-wider text-editorial-dark gap-x-2 items-center",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          Xác nhận & Đặt hàng
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium text-ui-fg-subtle leading-relaxed font-medium">
                Bằng cách nhấp vào nút Đặt Hàng dưới đây, bạn xác nhận rằng bạn đã đọc, 
                hiểu và chấp nhận Điều khoản Sử dụng, Điều khoản Bán hàng và Chính sách Đổi trả 
                của chúng tôi, đồng thời thừa nhận rằng bạn đã đọc Chính sách Bảo mật của VUASANCO.
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review

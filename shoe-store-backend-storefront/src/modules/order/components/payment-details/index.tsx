import { Container, Heading, Text } from "@medusajs/ui"
import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0]?.payments?.[0]

  const formattedPaymentTime = payment?.created_at
    ? new Date(payment.created_at).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    : ""

  return (
    <div className="border-2 border-editorial-dark bg-white p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
      <Heading level="h2" className="font-editorial font-black uppercase text-lg text-editorial-dark tracking-wider border-b border-editorial-dark pb-2 mb-4">
        Thanh Toán
      </Heading>
      
      <div className="flex flex-col gap-y-4">
        {payment ? (
          <>
            <div data-testid="payment-method">
              <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
                Phương thức thanh toán
              </Text>
              <Text className="txt-medium text-ui-fg-subtle font-medium">
                {paymentInfoMap[payment.provider_id]?.title || payment.provider_id}
              </Text>
            </div>

            <div className="border-t border-dashed border-ui-border-base pt-3">
              <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
                Chi tiết giao dịch
              </Text>
              <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center mt-1">
                <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover rounded-none border border-editorial-dark">
                  {paymentInfoMap[payment.provider_id]?.icon}
                </Container>
                <Text data-testid="payment-amount" className="font-semibold text-editorial-neonPink">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} - Đã thanh toán lúc ${formattedPaymentTime}`}
                </Text>
              </div>
            </div>
          </>
        ) : (
          <Text className="txt-medium text-ui-fg-subtle">
            Không tìm thấy thông tin thanh toán cho đơn hàng này.
          </Text>
        )}
      </div>
    </div>
  )
}

export default PaymentDetails

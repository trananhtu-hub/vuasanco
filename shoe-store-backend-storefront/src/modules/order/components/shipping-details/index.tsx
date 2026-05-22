import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import { localizeShippingMethod } from "@lib/constants"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="border-2 border-editorial-dark bg-white p-6 rounded-none shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
      <Heading level="h2" className="font-editorial font-black uppercase text-lg text-editorial-dark tracking-wider border-b border-editorial-dark pb-2 mb-4">
        Vận Chuyển
      </Heading>
      
      <div className="flex flex-col gap-y-4">
        <div data-testid="shipping-address-summary">
          <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
            Địa chỉ giao hàng
          </Text>
          <Text className="txt-medium text-ui-fg-subtle font-medium">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle">
            {order.shipping_address?.country_code?.toUpperCase()}
          </Text>
        </div>

        <div data-testid="shipping-contact-summary" className="border-t border-dashed border-ui-border-base pt-3">
          <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
            Liên hệ
          </Text>
          <Text className="txt-medium text-ui-fg-subtle font-medium">
            Điện thoại: {order.shipping_address?.phone}
          </Text>
          <Text className="txt-medium text-ui-fg-subtle font-medium">
            Email: {order.email}
          </Text>
        </div>

        <div data-testid="shipping-method-summary" className="border-t border-dashed border-ui-border-base pt-3">
          <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
            Phương thức vận chuyển
          </Text>
          <Text className="txt-medium text-ui-fg-subtle font-semibold text-editorial-neonPink">
            {localizeShippingMethod((order as any).shipping_methods?.[0]?.name)} (
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
            )
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails

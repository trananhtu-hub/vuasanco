"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col justify-center gap-y-8">
      <div className="flex gap-2 justify-between items-center border-b-4 border-editorial-dark pb-4">
        <h1 className="font-editorial text-4xl font-black uppercase text-editorial-dark">Chi tiết đơn hàng</h1>
        <LocalizedClientLink
          href="/account/orders"
          className="flex gap-2 items-center font-sans font-bold uppercase tracking-widest text-xs border-2 border-editorial-dark px-4 py-2 hover:bg-editorial-neonVolt transition-colors shadow-[2px_2px_0px_0px_rgba(15,15,15,1)]"
          data-testid="back-to-overview-button"
        >
          <XMark /> Quay lại
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-8 h-full w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate

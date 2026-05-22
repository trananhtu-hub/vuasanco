"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div>
      <div className="flex flex-col gap-y-3 text-sm text-gray-500 font-medium">
        <div className="flex items-center justify-between">
          <span>Tạm tính</span>
          <span className="text-gray-900" data-testid="cart-subtotal" data-value={item_subtotal || 0}>
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span>Phí vận chuyển</span>
          <span className="text-gray-900" data-testid="cart-shipping" data-value={shipping_subtotal || 0}>
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>
        
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>Giảm giá</span>
            <span
              className="text-emerald-600 font-semibold"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              -{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center">Thuế</span>
          <span className="text-gray-900" data-testid="cart-taxes" data-value={tax_total || 0}>
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      
      <div className="h-px w-full border-b border-gray-200 my-4" />
      
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-semibold text-gray-900">Tổng cộng</span>
        <span
          className="text-xl font-bold text-gray-900"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      
    </div>
  )
}

export default CartTotals
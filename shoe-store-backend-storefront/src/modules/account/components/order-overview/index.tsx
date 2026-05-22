"use client"

import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-12 w-full">
        {orders.map((o) => (
          <div key={o.id}>
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-y-6 py-16 px-6 border-2 border-dashed border-editorial-dark/30 bg-editorial-light"
      data-testid="no-orders-container"
    >
      <div className="w-20 h-20 bg-editorial-dark flex items-center justify-center rounded-full mb-4 shadow-[4px_4px_0px_0px_rgba(255,42,122,1)]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
      </div>
      <h2 className="font-editorial text-4xl font-black uppercase text-editorial-dark text-center">Chưa có đơn hàng nào</h2>
      <p className="font-sans font-bold uppercase tracking-widest text-gray-500 text-center text-sm max-w-sm">
        Bạn chưa có đơn hàng nào, hãy bắt đầu khám phá các bộ sưu tập mới nhất nhé!
      </p>
      <div className="mt-6">
        <LocalizedClientLink href="/store" passHref>
          <button className="px-8 py-4 bg-editorial-neonVolt text-editorial-dark font-sans font-bold uppercase tracking-widest border-2 border-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] hover:translate-x-[2px] hover:translate-y-[2px]" data-testid="continue-shopping-button">
            Tiếp tục mua sắm
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
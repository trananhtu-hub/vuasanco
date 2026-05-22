import { Button } from "@medusajs/ui"
import { useMemo } from "react"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return (
      order.items?.reduce((acc, item) => {
        return acc + item.quantity
      }, 0) ?? 0
    )
  }, [order])

  const numberOfProducts = useMemo(() => {
    return order.items?.length ?? 0
  }, [order])

  return (
    <div className="border-2 border-editorial-dark bg-white relative overflow-hidden group shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] transition-all duration-300" data-testid="order-card">
      {/* TICKET CUTOUTS */}
      <div className="absolute left-0 top-[80px] -translate-x-1/2 w-6 h-6 bg-editorial-light border-r-2 border-editorial-dark rounded-full z-10"></div>
      <div className="absolute right-0 top-[80px] translate-x-1/2 w-6 h-6 bg-editorial-light border-l-2 border-editorial-dark rounded-full z-10"></div>
      
      {/* PERFORATION LINE */}
      <div className="absolute left-0 right-0 top-[80px] border-t-2 border-dashed border-editorial-dark/30 z-0"></div>

      {/* HEADER TICKET */}
      <div className="bg-editorial-dark text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex flex-col">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-editorial-neonVolt mb-1">Mã đơn hàng</span>
          <span className="font-editorial text-3xl font-black uppercase tracking-wider" data-testid="order-display-id">
            #{order.display_id}
          </span>
        </div>
        
        <div className="flex items-center gap-x-6 text-sm font-sans font-bold uppercase tracking-widest">
          <div className="flex flex-col md:items-end">
            <span className="text-gray-400 text-[10px]">Ngày đặt</span>
            <span data-testid="order-created-at">
              {new Date(order.created_at).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </span>
          </div>
          <div className="w-[2px] h-8 bg-white/20 hidden md:block"></div>
          <div className="flex flex-col md:items-end">
            <span className="text-gray-400 text-[10px]">Tổng tiền</span>
            <span className="text-editorial-neonPink text-lg" data-testid="order-amount">
              {convertToLocale({
                amount: order.total,
                currency_code: order.currency_code,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* BODY TICKET - PRODUCTS */}
      <div className="p-6 pt-10">
        <div className="mb-4">
          <span className="inline-block bg-editorial-light px-3 py-1 font-sans font-bold uppercase text-xs tracking-widest border-2 border-editorial-dark">
            {`${numberOfLines} ${numberOfLines > 1 ? "Sản phẩm" : "Sản phẩm"}`}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          {order.items?.slice(0, 3).map((i) => {
            return (
              <div
                key={i.id}
                className="flex flex-col gap-y-3"
                data-testid="order-item"
              >
                <div className="border-2 border-editorial-dark overflow-hidden bg-gray-100 aspect-square flex items-center justify-center">
                  <Thumbnail thumbnail={i.thumbnail} images={[]} size="full" />
                </div>
                <div className="flex flex-col text-sm font-sans">
                  <span
                    className="font-bold text-editorial-dark truncate"
                    data-testid="item-title"
                  >
                    {i.title}
                  </span>
                  <span className="text-gray-500 font-bold uppercase text-xs mt-1">
                    SL: <span data-testid="item-quantity">{i.quantity}</span>
                  </span>
                </div>
              </div>
            )
          })}
          {numberOfProducts > 4 && (
            <div className="w-full aspect-square border-2 border-dashed border-editorial-dark/30 flex flex-col items-center justify-center bg-gray-50">
              <span className="font-editorial text-3xl font-black text-editorial-dark">
                +{numberOfLines - 4}
              </span>
              <span className="font-sans font-bold uppercase text-xs tracking-widest text-gray-500">Sản phẩm</span>
            </div>
          )}
        </div>

        {/* FOOTER TICKET - ACTION */}
        <div className="flex justify-end mt-8 border-t-2 border-editorial-dark/10 pt-6">
          <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
            <button className="px-6 py-3 bg-editorial-neonVolt text-editorial-dark font-sans font-bold uppercase text-sm tracking-widest border-2 border-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-colors" data-testid="order-details-link">
              Xem chi tiết
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}

export default OrderCard

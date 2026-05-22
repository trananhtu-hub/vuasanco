import { Container } from "@medusajs/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="flex flex-col gap-y-12">
      
      {/* KHU VỰC LỜI CHÀO SIÊU LỚN */}
      <div className="hidden small:block relative z-10">
        <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase text-editorial-dark tracking-tighter leading-none mb-2">
          CHÀO MỪNG TRỞ LẠI, <br/>
          <span 
            className="text-editorial-neonPink inline-block mt-2 relative before:content-[''] before:absolute before:-inset-1 before:bg-editorial-dark before:-z-10 before:translate-y-1 before:translate-x-1"
            data-testid="welcome-message" 
            data-value={customer?.first_name}
          >
            {customer?.first_name}
          </span>
        </h2>
        <p className="mt-8 font-sans text-sm font-bold uppercase tracking-widest text-gray-500">
          Đăng nhập bằng email:{" "}
          <span className="text-editorial-dark border-b-2 border-editorial-neonVolt pb-1" data-testid="customer-email" data-value={customer?.email}>
            {customer?.email}
          </span>
        </p>
      </div>

      <div className="hidden small:block border-t-4 border-editorial-dark pt-12">
        <div className="flex flex-col gap-y-12">
          
          {/* THỐNG KÊ NHANH (BOXY STATS) */}
          <div className="grid grid-cols-2 gap-6">
            {/* Box 1: Hồ sơ */}
            <div className="border-2 border-editorial-dark bg-white p-6 shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] transition-all duration-300 flex flex-col justify-between h-40">
              <h3 className="font-sans font-bold uppercase tracking-widest text-gray-500 text-sm">Mức độ hoàn thiện hồ sơ</h3>
              <div className="flex items-end gap-x-2">
                <span className="font-editorial text-6xl font-black text-editorial-dark leading-none" data-testid="customer-profile-completion" data-value={getProfileCompletion(customer)}>
                  {getProfileCompletion(customer)}%
                </span>
                <span className="font-sans font-bold uppercase tracking-wider text-editorial-neonPink mb-1">Hoàn thành</span>
              </div>
            </div>

            {/* Box 2: Địa chỉ */}
            <div className="border-2 border-editorial-dark bg-editorial-dark text-white p-6 shadow-[6px_6px_0px_0px_rgba(255,42,122,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(255,42,122,1)] transition-all duration-300 flex flex-col justify-between h-40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-editorial-neonVolt rounded-bl-full -mr-12 -mt-12 opacity-20"></div>
              <h3 className="font-sans font-bold uppercase tracking-widest text-gray-400 text-sm">Sổ địa chỉ</h3>
              <div className="flex items-end gap-x-2">
                <span className="font-editorial text-6xl font-black text-editorial-neonVolt leading-none" data-testid="addresses-count" data-value={customer?.addresses?.length || 0}>
                  {customer?.addresses?.length || 0}
                </span>
                <span className="font-sans font-bold uppercase tracking-wider text-editorial-light mb-1">Địa chỉ đã lưu</span>
              </div>
            </div>
          </div>

          {/* ĐƠN HÀNG GẦN ĐÂY */}
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center justify-between border-b-2 border-editorial-dark pb-4">
              <h3 className="font-editorial text-3xl font-black uppercase text-editorial-dark">Đơn hàng gần đây</h3>
            </div>
            
            <ul className="flex flex-col gap-y-6" data-testid="orders-wrapper">
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => {
                  return (
                    <li key={order.id} data-testid="order-wrapper" data-value={order.id}>
                      <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                        {/* TICKET STYLE CARD */}
                        <div className="border-2 border-editorial-dark bg-white flex justify-between items-center relative overflow-hidden group hover:bg-editorial-light transition-colors duration-300">
                          {/* Dấu xé vé hai bên (Ticket cutouts) */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-editorial-light border-r-2 border-editorial-dark rounded-full"></div>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 bg-editorial-light border-l-2 border-editorial-dark rounded-full"></div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 w-full pl-8 pr-12 py-6 gap-6 items-center">
                            
                            {/* Cột 1: Mã Đơn */}
                            <div className="flex flex-col gap-y-1">
                              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">Mã đơn hàng</span>
                              <span className="font-editorial text-2xl font-black text-editorial-dark uppercase" data-testid="order-id" data-value={order.display_id}>
                                #{order.display_id}
                              </span>
                            </div>

                            {/* Cột 2: Ngày Đặt */}
                            <div className="flex flex-col gap-y-1">
                              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">Ngày đặt</span>
                              <span className="font-sans font-bold text-editorial-dark" data-testid="order-created-date">
                                {new Date(order.created_at).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                              </span>
                            </div>

                            {/* Cột 3: Tổng Tiền */}
                            <div className="flex flex-col gap-y-1">
                              <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">Tổng tiền</span>
                              <span className="font-sans font-bold text-editorial-neonPink text-lg" data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>

                          </div>

                          {/* Dải phân cách nét đứt (Perforation) */}
                          <div className="absolute right-24 top-0 bottom-0 border-l-2 border-dashed border-editorial-dark/30"></div>

                          {/* Nút Xem (Button) nằm ở cuối phần xé vé */}
                          <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-editorial-dark text-editorial-neonVolt rounded-full flex items-center justify-center group-hover:bg-editorial-neonPink group-hover:text-white transition-colors duration-300" data-testid="open-order-button">
                            <span className="sr-only">Xem đơn hàng #{order.display_id}</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </button>
                        </div>
                      </LocalizedClientLink>
                    </li>
                  )
                })
              ) : (
                <div className="bg-white border-2 border-dashed border-editorial-dark/30 p-12 text-center" data-testid="no-orders-message">
                  <p className="font-sans font-bold uppercase tracking-widest text-gray-400">Chưa có đơn hàng nào gần đây</p>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
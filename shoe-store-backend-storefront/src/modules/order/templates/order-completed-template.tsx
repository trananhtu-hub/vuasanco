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

const getProgressPercentage = (order: HttpTypes.StoreOrder) => {
  if (order.status === "completed") return 100
  if (order.fulfillment_status === "shipped") return 75
  if (order.fulfillment_status === "fulfilled" || order.fulfillment_status === "partially_fulfilled") return 50
  if (order.payment_status === "captured") return 25
  return 12.5 // Placed, pending payment
}

const getSteps = (order: HttpTypes.StoreOrder) => {
  const isPaid = order.payment_status === "captured"
  const isFulfilled = order.fulfillment_status === "fulfilled" || order.fulfillment_status === "shipped"
  const isShipped = order.fulfillment_status === "shipped"
  const isCompleted = order.status === "completed"

  return [
    { label: "Đặt hàng", completed: true, active: !isPaid && !isCompleted && order.fulfillment_status === "not_fulfilled" },
    { label: "Thanh toán", completed: isPaid, active: isPaid && !isFulfilled },
    { label: "Chuẩn bị", completed: isFulfilled, active: isFulfilled && !isShipped },
    { label: "Giao hàng", completed: isShipped, active: isShipped && !isCompleted },
    { label: "Hoàn tất", completed: isCompleted, active: isCompleted },
  ]
}

const getLoggedActivities = (order: HttpTypes.StoreOrder) => {
  const logs = []
  
  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
  }

  // 1. Order Placed
  logs.push({
    title: "Đơn hàng đã đặt",
    description: `Đơn hàng #${order.display_id} đã được khởi tạo thành công`,
    time: formatTime(order.created_at)
  })

  // 2. Payment Status
  const payment = order.payment_collections?.[0]?.payments?.[0]
  if (order.payment_status === "captured") {
    logs.push({
      title: "Đã thanh toán",
      description: `Thanh toán thành công ${order.total.toLocaleString("vi-VN")} VND`,
      time: payment?.created_at ? formatTime(payment.created_at) : formatTime(order.created_at)
    })
  } else if (order.payment_status === "authorized" || order.payment_status === "awaiting") {
    logs.push({
      title: "Đang chờ thanh toán",
      description: `Đơn hàng đang chờ thanh toán (COD hoặc chuyển khoản)`,
      time: formatTime(order.created_at)
    })
  }

  // 3. Fulfillments
  if (order.fulfillments && order.fulfillments.length > 0) {
    order.fulfillments.forEach((f, idx) => {
      logs.push({
        title: "Đang chuẩn bị hàng",
        description: `Hàng hóa đã được đóng gói và chuẩn bị bàn giao (Lần ${idx + 1})`,
        time: formatTime(f.created_at)
      })

      if (f.shipped_at) {
        logs.push({
          title: "Đang giao hàng",
          description: `Đơn hàng đã được bàn giao cho đối tác vận chuyển`,
          time: formatTime(f.shipped_at)
        })
      }
      
      if (f.delivered_at) {
        logs.push({
          title: "Giao hàng thành công",
          description: `Đơn hàng đã giao thành công tới người nhận`,
          time: formatTime(f.delivered_at)
        })
      }
    })
  }

  // 4. Completed
  if (order.status === "completed") {
    logs.push({
      title: "Đơn hàng hoàn tất",
      description: `Đơn hàng đã hoàn tất đóng lại`,
      time: formatTime(order.updated_at)
    })
  }

  return logs.reverse()
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-12 min-h-[calc(100vh-64px)] bg-editorial-light">
      <div className="content-container max-w-6xl mx-auto px-4">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        
        <div className="grid grid-cols-1 small:grid-cols-3 gap-8 items-start">
          {/* Left Column: Order invoice details (Spans 2 columns on large screens) */}
          <div className="small:col-span-2 flex flex-col gap-y-6">
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

          {/* Right Column: Tracking Progress & Activities Feed (Spans 1 column on large screens) */}
          <div className="small:col-span-1 flex flex-col gap-y-6 sticky top-6">
            {/* Visual Progress Steps Card */}
            <div className="bg-editorial-dark text-white border-4 border-editorial-dark p-6 shadow-[8px_8px_0px_0px_rgba(211,255,36,1)] flex flex-col gap-6">
              <h3 className="font-editorial text-2xl font-black uppercase tracking-wider text-editorial-neonVolt">
                Hành Trình Đơn
              </h3>
              
              {/* Steps Progress bar */}
              <div className="flex items-center justify-between mt-2 relative w-full">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-white/20 z-0"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-editorial-neonVolt transition-all duration-500 z-0" 
                  style={{ width: `${getProgressPercentage(order)}%` }}
                ></div>
                
                {getSteps(order).map((step, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 relative z-10">
                    <div 
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-sans font-black text-xs transition-all duration-300 ${
                        step.active 
                          ? "bg-editorial-neonVolt text-editorial-dark border-editorial-dark scale-110 shadow-[0_0_10px_rgba(211,255,36,0.5)]" 
                          : step.completed 
                          ? "bg-white text-editorial-dark border-editorial-dark" 
                          : "bg-editorial-dark text-white/50 border-white/25"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span className={`text-[10px] font-sans font-bold uppercase tracking-wider ${step.active ? "text-editorial-neonVolt" : "text-white/60"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logs Activity Feed Card */}
            <div className="bg-white border-4 border-editorial-dark p-6 shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] flex flex-col gap-6">
              <div className="border-b-2 border-editorial-dark pb-3 flex justify-between items-center">
                <h3 className="font-editorial text-2xl font-black uppercase tracking-wider text-editorial-dark">
                  Hoạt Động
                </h3>
                <span className="bg-editorial-neonPink text-white text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 border border-editorial-dark">
                  Mới nhất
                </span>
              </div>

              {/* Vertical timeline details */}
              <div className="flex flex-col gap-y-6 relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-editorial-dark/10">
                {getLoggedActivities(order).map((log, index) => (
                  <div key={index} className="relative group">
                    {/* Timeline circle dot */}
                    <div className={`absolute -left-[20px] top-[5px] w-[12px] h-[12px] rounded-full border-2 border-editorial-dark z-10 transition-all duration-300 ${
                      index === 0 
                        ? "bg-editorial-neonPink scale-125 animate-pulse shadow-[0_0_8px_rgba(255,0,85,0.4)]" 
                        : "bg-editorial-dark"
                    }`} />
                    
                    <div className="flex flex-col gap-y-1">
                      <span className="font-sans font-bold uppercase tracking-wider text-sm text-editorial-dark">
                        {log.title}
                      </span>
                      <span className="text-xs text-gray-500 font-medium leading-normal">
                        {log.description}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gray-400 bg-editorial-light border border-editorial-dark/10 w-fit px-2 py-0.5 mt-1">
                        {log.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

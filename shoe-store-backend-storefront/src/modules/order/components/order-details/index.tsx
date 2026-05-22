import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const translateFulfillmentStatus = (status: string) => {
    if (!status) return "Chưa xác định"
    const map: Record<string, string> = {
      not_fulfilled: "Chưa giao hàng",
      partially_fulfilled: "Giao một phần",
      fulfilled: "Đã giao hàng",
      partially_shipped: "Đang giao hàng một phần",
      shipped: "Đang vận chuyển",
      partially_returned: "Trả hàng một phần",
      returned: "Đã trả hàng",
      canceled: "Đã hủy",
    }
    return map[status.toLowerCase()] || status
  }

  const translatePaymentStatus = (status: string) => {
    if (!status) return "Chưa xác định"
    const map: Record<string, string> = {
      not_paid: "Chưa thanh toán",
      awaiting: "Chờ thanh toán",
      captured: "Đã thanh toán",
      partially_refunded: "Hoàn tiền một phần",
      refunded: "Đã hoàn tiền",
      canceled: "Đã hủy",
      requires_action: "Yêu cầu xử lý",
    }
    return map[status.toLowerCase()] || status
  }

  const formattedDate = new Date(order.created_at).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <div className="border-2 border-editorial-dark bg-editorial-light p-5 rounded-none shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
      <Text className="text-editorial-dark font-medium leading-relaxed">
        Chúng tôi đã gửi email xác nhận thông tin đơn hàng tới{" "}
        <span
          className="font-bold underline text-editorial-neonPink"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-4 pt-4 border-t border-dashed border-editorial-dark text-sm">
        <Text className="font-semibold text-editorial-dark">
          Ngày đặt hàng:{" "}
          <span className="font-medium text-ui-fg-subtle" data-testid="order-date">
            {formattedDate}
          </span>
        </Text>
        <Text className="font-semibold text-editorial-dark">
          Mã đơn hàng:{" "}
          <span className="font-bold text-editorial-neonPink" data-testid="order-id">
            #{order.display_id}
          </span>
        </Text>
      </div>

      {showStatus && (
        <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-y-2 gap-x-6 mt-3 pt-3 border-t border-ui-border-base">
          <Text className="font-semibold text-editorial-dark">
            Trạng thái giao hàng:{" "}
            <span className="font-medium text-editorial-neonPink" data-testid="order-status">
              {translateFulfillmentStatus(order.fulfillment_status)}
            </span>
          </Text>
          <Text className="font-semibold text-editorial-dark">
            Trạng thái thanh toán:{" "}
            <span
              className="font-medium text-editorial-neonPink"
              data-testid="order-payment-status"
            >
              {translatePaymentStatus(order.payment_status)}
            </span>
          </Text>
        </div>
      )}
    </div>
  )
}

export default OrderDetails

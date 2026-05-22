"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      // ĐÃ DỊCH: Tiêu đề Tab 1
      label: "Thông số kỹ thuật",
      component: <ProductInfoTab product={product} />,
    },
    {
      // ĐÃ DỊCH: Tiêu đề Tab 2
      label: "Giao hàng & Đổi trả",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-sm font-sans py-4">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div className="border-b-2 border-editorial-dark/10 pb-2">
            <span className="font-bold uppercase tracking-widest text-xs text-gray-500 block mb-1">Chất liệu</span>
            <p className="font-bold text-editorial-dark">{product.material ? product.material : "-"}</p>
          </div>
          <div className="border-b-2 border-editorial-dark/10 pb-2">
            <span className="font-bold uppercase tracking-widest text-xs text-gray-500 block mb-1">Xuất xứ</span>
            <p className="font-bold text-editorial-dark">{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div className="border-b-2 border-editorial-dark/10 pb-2">
            <span className="font-bold uppercase tracking-widest text-xs text-gray-500 block mb-1">Kiểu dáng</span>
            <p className="font-bold text-editorial-dark">{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="border-b-2 border-editorial-dark/10 pb-2">
            <span className="font-bold uppercase tracking-widest text-xs text-gray-500 block mb-1">Trọng lượng</span>
            <p className="font-bold text-editorial-dark">{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div className="border-b-2 border-editorial-dark/10 pb-2">
            <span className="font-bold uppercase tracking-widest text-xs text-gray-500 block mb-1">Kích thước</span>
            <p className="font-bold text-editorial-dark">
              {product.length && product.width && product.height
                ? `${product.length}D x ${product.width}R x ${product.height}C`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-sm font-sans py-4">
      <div className="grid grid-cols-1 gap-y-6">
        <div className="flex items-start gap-x-4 border-2 border-editorial-dark p-4 bg-white shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
          <div className="w-10 h-10 flex items-center justify-center bg-editorial-neonVolt border-2 border-editorial-dark shrink-0">
            <FastDelivery />
          </div>
          <div>
            <span className="font-black uppercase tracking-widest text-editorial-dark mb-1 block">Giao hàng hỏa tốc</span>
            <p className="max-w-sm text-gray-600 font-medium leading-relaxed">
              Đơn hàng của bạn sẽ được giao tận tay trong vòng 2-3 ngày làm việc đối với khu vực ngoại thành, và nhận trong ngày tại nội thành.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 border-2 border-editorial-dark p-4 bg-white shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
          <div className="w-10 h-10 flex items-center justify-center bg-editorial-neonPink text-white border-2 border-editorial-dark shrink-0">
            <Refresh />
          </div>
          <div>
            <span className="font-black uppercase tracking-widest text-editorial-dark mb-1 block">Hỗ trợ đổi size</span>
            <p className="max-w-sm text-gray-600 font-medium leading-relaxed">
              Giày đi không vừa chân? Đừng lo lắng - chúng tôi hỗ trợ đổi size hoặc đổi sang mẫu mới một cách nhanh chóng.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-4 border-2 border-editorial-dark p-4 bg-white shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
          <div className="w-10 h-10 flex items-center justify-center bg-white border-2 border-editorial-dark shrink-0">
            <Back />
          </div>
          <div>
            <span className="font-black uppercase tracking-widest text-editorial-dark mb-1 block">Hoàn trả dễ dàng</span>
            <p className="max-w-sm text-gray-600 font-medium leading-relaxed">
              Trải nghiệm mua sắm không rủi ro. Bạn có thể hoàn trả sản phẩm nguyên vẹn và chúng tôi sẽ hoàn tiền 100% không cần lý do.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
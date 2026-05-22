import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div className="flex flex-col gap-y-4">
      <div className="pb-4 border-b-4 border-editorial-dark mb-4">
        <h2 className="text-2xl font-editorial font-black uppercase tracking-wider text-editorial-dark">Chi tiết sản phẩm</h2>
      </div>
      
      <div className="hidden small:grid grid-cols-[100px_1fr_120px_120px_120px] gap-4 py-2 border-b-4 border-editorial-dark text-editorial-dark font-sans font-bold uppercase tracking-widest text-xs">
        <div>Hình ảnh</div>
        <div>Thông tin</div>
        <div>Đơn giá</div>
        <div>Số lượng</div>
        <div className="text-right">Thành tiền</div>
      </div>
      
      <div className="flex flex-col gap-y-4">
        {items
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
          : repeat(3).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </div>
    </div>
  )
}

export default ItemsTemplate
import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  const isSale = selectedPrice.price_type === "sale"

  return (
    <div className="flex flex-col gap-2 mt-4">
      {/* Container giá chính */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Giá bán hiện tại */}
        <span
          className={clx(
            "font-editorial text-4xl font-black tracking-tight",
            isSale ? "text-editorial-neonPink" : "text-editorial-dark"
          )}
        >
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>

        {/* Nhãn % giảm giá phong cách Neo-Brutalism */}
        {isSale && (
          <div className="transform -rotate-2 bg-editorial-neonVolt text-editorial-dark font-sans text-xs font-black px-2 py-0.5 border-2 border-editorial-dark shadow-[2px_2px_0px_0px_#0F0F0F] uppercase tracking-widest">
            -{selectedPrice.percentage_diff}% OFF
          </div>
        )}
      </div>

      {/* Giá gốc dưới dạng text phụ khi có sale */}
      {isSale && (
        <div className="flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-gray-500">
          <span>Giá gốc:</span>
          <span
            className="line-through decoration-editorial-neonPink decoration-2"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        </div>
      )}
    </div>
  )
}
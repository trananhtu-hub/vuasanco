import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Tính % giảm giá tự động từ backend
  const discountPercentage =
    cheapestPrice &&
      cheapestPrice.original_price_number > cheapestPrice.calculated_price_number
      ? Math.round((1 - cheapestPrice.calculated_price_number / cheapestPrice.original_price_number) * 100)
      : 0;

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block w-full relative"
    >

      {/* ================= KHU VỰC 1: HÌNH ẢNH & NHÃN DÁN ================= */}
      <div className="relative w-full aspect-[4/5] bg-editorial-light border-2 border-transparent group-hover:border-editorial-neonVolt transition-colors duration-300 overflow-hidden">

        {/* Ảnh sản phẩm (Hiệu ứng hover chuyển đổi 2 mặt giày) */}
        <div className="relative h-full w-full bg-white">
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
            <img
              src={product.thumbnail || product.images?.[0]?.url || ""}
              alt={product.title || "Product image"}
              className={`object-contain w-full h-full p-6 transition-opacity duration-500 ${product.images && product.images.length > 1 ? 'group-hover:opacity-0' : ''}`}
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-110">
              <img
                src={product.images[1].url || ""}
                alt={`${product.title} details`}
                className="object-contain w-full h-full p-6"
              />
            </div>
          )}

          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Góc trên trái: Nhãn % Giảm giá */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-editorial-neonVolt text-editorial-dark font-sans text-xs font-bold px-3 py-1 uppercase tracking-wider">
              -{discountPercentage}%
            </span>
          </div>
        )}

        {/* Góc trên phải: Trái tim Wishlist */}
        <button className="absolute top-4 right-4 z-10 text-editorial-dark hover:text-editorial-neonPink transition-colors p-2 bg-white/80 backdrop-blur-sm rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Hover "XEM CHI TIẾT" Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-editorial-dark text-editorial-neonVolt font-editorial font-bold text-xl uppercase px-6 py-2 tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">XEM</span>
        </div>
      </div>

      {/* ================= KHU VỰC 2: THÔNG TIN SẢN PHẨM ================= */}
      <div className="pt-4 flex flex-col">

        {/* Tên sản phẩm */}
        <Text
          className="font-editorial text-xl md:text-2xl font-bold text-editorial-dark leading-tight uppercase tracking-tight group-hover:text-editorial-neonVolt transition-colors"
          data-testid="product-title"
        >
          {product.title}
        </Text>

        {/* Khu vực Giá Tiền */}
        <div className="flex items-baseline gap-3 mt-2 font-sans">
          {cheapestPrice ? (
            <>
              {/* Giá đang bán */}
              <span className="text-lg md:text-xl font-black text-editorial-dark">
                {cheapestPrice.calculated_price}
              </span>

              {/* Giá gốc (bị gạch ngang) */}
              {cheapestPrice.original_price_number > cheapestPrice.calculated_price_number && (
                <span className="text-sm font-medium text-gray-400 line-through">
                  {cheapestPrice.original_price}
                </span>
              )}
            </>
          ) : (
            <div className="h-6 w-24 bg-gray-200 animate-pulse"></div>
          )}
        </div>

      </div>

    </LocalizedClientLink>
  )
}
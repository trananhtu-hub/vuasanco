import { Metadata } from "next"
import { getRegion } from "@lib/data/regions"
import { sdk } from "@lib/config"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Sản Phẩm Sale | Vuasanco",
  description: "Danh sách tất cả các sản phẩm đang được giảm giá cực lớn tại Vuasanco.",
}

type Params = {
  params: Promise<{
    countryCode: string
  }>
}

export default async function SalePage(props: Params) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch all products to filter sale ones
  const { products: allProducts } = await sdk.client.fetch<{
    products: HttpTypes.StoreProduct[]
    count: number
  }>("/store/products", {
    method: "GET",
    query: {
      limit: 100,
      region_id: region.id,
      fields: "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags",
    },
    next: {
      revalidate: 0,
    },
  })

  // Filter products currently on sale
  const saleProducts = allProducts.filter((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    return (
      cheapestPrice &&
      cheapestPrice.original_price_number > cheapestPrice.calculated_price_number
    )
  })

  return (
    <div className="flex flex-col pt-6 pb-16 content-container">
      {/* BREADCRUMBS & TIÊU ĐỀ */}
      <div className="w-full flex flex-col mb-10 gap-3 border-l-4 border-editorial-neonVolt pl-5">
        <div className="flex flex-wrap items-center gap-2 font-editorial text-xs font-bold uppercase tracking-widest text-gray-500">
          <LocalizedClientLink href="/" className="hover:text-editorial-neonPink transition-colors">
            TRANG CHỦ
          </LocalizedClientLink>
          <span className="text-gray-300">/</span>
          <span className="text-editorial-neonPink">SỰ KIỆN SALE</span>
        </div>

        <h1 className="font-editorial text-4xl md:text-6xl font-black uppercase tracking-tight text-editorial-dark leading-none">
          SẢN PHẨM KHUYẾN MÃI
        </h1>
        
        <p className="font-sans text-sm text-gray-500 mt-1 uppercase tracking-wider font-bold">
          SĂN GIÀY BÓNG ĐÁ CHÍNH HÃNG VỚI MỨC GIÁ GIẢM CỰC SỐC
        </p>
      </div>

      {/* DANH SÁCH SẢN PHẨM SALE */}
      {saleProducts.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-24 border-2 border-dashed border-editorial-dark/15 text-center rounded-[2px] px-6 my-4 bg-white/50 backdrop-blur-sm">
          <svg
            className="w-12 h-12 text-editorial-neonPink mb-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="font-editorial text-2xl font-bold uppercase tracking-widest text-editorial-dark mb-2">
            HIỆN TẠI CHƯA CÓ SẢN PHẨM GIẢM GIÁ
          </h3>
          <p className="font-sans text-sm text-gray-500 max-w-md">
            Vui lòng quay lại sau khi sự kiện khuyến mãi mới bắt đầu hoặc khám phá các sản phẩm khác tại cửa hàng.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-16 pb-16">
          {saleProducts.map((p, index) => {
            const isBrutalistSpecial = index % 5 === 2
            const isStaggeredOffset = index % 2 === 1

            return (
              <li
                key={p.id}
                className={`transition-all duration-500 hover:z-10 ${
                  isBrutalistSpecial
                    ? "border-2 border-editorial-dark p-4 bg-white shadow-[6px_6px_0px_0px_#D3FF24] hover:shadow-[6px_6px_0px_0px_#FF0055] transition-all duration-300 rounded-[2px] transform hover:-translate-y-1"
                    : "border border-transparent p-2 hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.03)] transition-all duration-300 rounded-[2px]"
                } ${isStaggeredOffset ? "md:translate-y-8" : ""}`}
              >
                <ProductPreview product={p} region={region} />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

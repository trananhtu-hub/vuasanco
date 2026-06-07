import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import SaleSection from "@modules/home/components/sale-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { sdk } from "@lib/config"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Vua Sân Cỏ",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // Fetch collections with metadata to access sort_order
  const { collections } = await listCollections({
    fields: "id, handle, title, metadata",
  })

  // Fetch products directly bypassing Next.js cache
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

  if (!collections) {
    return null
  }

  // Sort collections:
  // 1. "Sản Phẩm Nổi Bật" goes first (index 0)
  // 2. "Bậc Thầy Kiểm Soát" goes second (index 1)
  // 3. Others are sorted by metadata.sort_order (default to 9999 to place them at the end)
  const sortedCollections = [...collections].sort((a, b) => {
    const handleA = a.handle?.toLowerCase()
    const handleB = b.handle?.toLowerCase()

    if (handleA === "sản-phẩm-nổi-bật" || handleA === "san-pham-noi-bat") return -1
    if (handleB === "sản-phẩm-nổi-bật" || handleB === "san-pham-noi-bat") return 1

    if (handleA === "bậc-thầy-kiểm-soát" || handleA === "bac-thay-kiem-soat") return -1
    if (handleB === "bậc-thầy-kiểm-soát" || handleB === "bac-thay-kiem-soat") return 1

    const orderA = parseInt((a.metadata?.sort_order as string) || "9999", 10)
    const orderB = parseInt((b.metadata?.sort_order as string) || "9999", 10)
    return orderA - orderB
  })

  // Display all 5 collections on homepage
  const displayedCollections = sortedCollections.slice(0, 5)

  return (
    <>
      <Hero />
      
      {/* Sale Section (1/3 Banner + 2/3 2x3 Grid of 6 items) */}
      <SaleSection
        products={saleProducts}
        campaignTitle="Sale Đồng Loạt Khai Mạc World Cup 2026"
        endDate="2026-06-09T00:00:00Z"
        region={region}
      />

      <div className="bg-editorial-light border-y-8 border-editorial-dark pt-16 pb-20 relative overflow-hidden">
        {/* NOISE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>

        <div className="relative z-10 content-container">
          <ul className="flex flex-col gap-y-12">
            <FeaturedProducts collections={displayedCollections} region={region} />
          </ul>

          {/* Neo-brutalist "View All Collections" Button */}
          <div className="mt-16 flex justify-center">
            <LocalizedClientLink
              href="/store"
              className="inline-block px-10 py-5 bg-editorial-neonVolt text-editorial-dark font-editorial text-2xl font-black uppercase tracking-wider border-4 border-editorial-dark rounded-none shadow-[6px_6px_0px_0px_#0F0F0F] transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_#0F0F0F] hover:bg-white hover:text-editorial-dark active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
            >
              Khám Phá Tất Cả Sản Phẩm
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </>
  )
}

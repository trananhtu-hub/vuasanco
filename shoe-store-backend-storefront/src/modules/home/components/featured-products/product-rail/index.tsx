import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPreview from "@modules/products/components/product-preview"
import ProductSlider from "./product-slider"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  // Fetch up to 8 products for this collection on the homepage
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
      limit: 8,
    },
  })

  if (!pricedProducts || pricedProducts.length === 0) {
    return null
  }

  return (
    <div className="py-12 border-b-4 border-editorial-dark/10 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative">
        <div>
          <h2 className="font-editorial text-4xl md:text-6xl font-black uppercase tracking-tight text-editorial-dark leading-none">
            {collection.title}
          </h2>
          <div className="h-2 w-24 bg-editorial-neonVolt mt-4"></div>
        </div>

        {/* View all collection link, offset to make space for slider controls */}
        <div className="flex items-center gap-4 pr-32 md:pr-36">
          <LocalizedClientLink 
            href={`/collections/${collection.handle}`}
            className="group flex items-center font-sans text-sm font-black uppercase tracking-widest text-editorial-dark hover:text-editorial-neonPink transition-colors border-b-2 border-editorial-dark pb-1"
          >
            <span>Bộ Sưu Tập</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1.5 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </LocalizedClientLink>
        </div>
      </div>
      
      {/* Product Slider (Client Component containing scroll controls) */}
      <ProductSlider>
        {pricedProducts.map((product) => (
          <div key={product.id} className="w-[285px] sm:w-[320px] shrink-0 snap-start">
            <ProductPreview product={product} region={region} isFeatured />
          </div>
        ))}
      </ProductSlider>
    </div>
  )
}
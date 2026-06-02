import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { sortProducts } from "@lib/util/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string | string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  q,
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  sizes,
  studs,
  surfaces,
  price,
}: {
  q?: string
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  sizes?: string
  studs?: string
  surfaces?: string
  price?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 100, // Fetch up to 100 products to enable comprehensive server-side memory filtering
  }

  if (q) {
    queryParams["q"] = q
  }

  if (collectionId) {
    queryParams["collection_id"] = collectionId
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  // 1. Fetch raw product list (up to 100 cached products)
  let {
    response: { products: rawProducts },
  } = await listProducts({
    pageParam: 1,
    queryParams,
    countryCode,
  })

  // 2. Perform advanced server-side in-memory filtering
  let filteredProducts = [...rawProducts]

  // Filter by sizes
  if (sizes) {
    const targetSizes = sizes.split(",").filter(Boolean)
    filteredProducts = filteredProducts.filter((product) => {
      return product.variants?.some((variant) => {
        return variant.options?.some((opt: any) => {
          return targetSizes.includes(opt.value)
        })
      })
    })
  }

  // Filter by studs (so khớp trong title, tags hoặc metadata)
  if (studs) {
    const targetStuds = studs.split(",").filter(Boolean).map(s => s.toUpperCase())
    filteredProducts = filteredProducts.filter((product) => {
      return targetStuds.some((stud) => {
        const inTitle = product.title?.toUpperCase().includes(stud)
        const inTags = product.tags?.some((t: any) => t.value?.toUpperCase().includes(stud))
        const inMetadata = (product.metadata?.stud_type as string)?.toUpperCase().includes(stud)
        return inTitle || inTags || inMetadata
      })
    })
  }

  // Filter by surface types
  if (surfaces) {
    const targetSurfaces = surfaces.split(",").filter(Boolean)
    filteredProducts = filteredProducts.filter((product) => {
      const titleUpper = product.title?.toUpperCase() || ""
      const tagsUpper = product.tags?.map((t: any) => t.value?.toUpperCase() || "").join(" ") || ""

      return targetSurfaces.some((surf) => {
        if (surf === "artificial") {
          return titleUpper.includes("TF") || titleUpper.includes("AG") ||
            tagsUpper.includes("TF") || tagsUpper.includes("AG") ||
            tagsUpper.includes("NHÂN TẠO")
        }
        if (surf === "natural") {
          return titleUpper.includes("FG") || titleUpper.includes("SG") ||
            tagsUpper.includes("FG") || tagsUpper.includes("SG") ||
            tagsUpper.includes("TỰ NHIÊN")
        }
        if (surf === "indoor") {
          return titleUpper.includes("IC") || tagsUpper.includes("IC") ||
            tagsUpper.includes("TRONG NHÀ") || tagsUpper.includes("FUTSAL")
        }
        return false
      })
    })
  }

  // Filter by price range
  if (price) {
    const targetPrices = price.split(",").filter(Boolean)
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.variants || product.variants.length === 0) return false

      const minPrice = Math.min(
        ...product.variants
          .filter((v: any) => !!v.calculated_price)
          .map((v: any) => v.calculated_price.calculated_amount || 0)
      )

      return targetPrices.some((pr) => {
        if (pr === "under-1m") return minPrice < 1000000
        if (pr === "1m-2m") return minPrice >= 1000000 && minPrice <= 2000000
        if (pr === "2m-3m") return minPrice >= 2000000 && minPrice <= 3000000
        if (pr === "over-3m") return minPrice > 3000000
        return false
      })
    })
  }

  // 3. Sort products (using standard sort logic)
  const sortedProducts = sortProducts(filteredProducts, sortBy || "created_at")

  // 4. Manual pagination calculations
  const count = sortedProducts.length
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  const pageParam = (page - 1) * PRODUCT_LIMIT
  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + PRODUCT_LIMIT)

  // Empty state handling
  if (count === 0) {
    return (
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
          KHÔNG TÌM THẤY SẢN PHẨM PHÙ HỢP
        </h3>
        <p className="font-sans text-sm text-gray-500 max-w-md">
          Rất tiếc, bộ lọc hiện tại của bạn không khớp với bất kỳ đôi giày bóng đá nào. Hãy thử xóa bớt tiêu chí lọc hoặc chọn lại.
        </p>
      </div>
    )
  }

  return (
    <>
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-16 pb-16"
        data-testid="products-list"
      >
        {paginatedProducts.map((p, index) => {
          const isBrutalistSpecial = index % 5 === 2
          const isStaggeredOffset = index % 2 === 1

          return (
            <li
              key={p.id}
              className={`transition-all duration-500 hover:z-10 ${isBrutalistSpecial
                  ? "border-2 border-editorial-dark p-4 bg-white shadow-[6px_6px_0px_0px_#D3FF24] hover:shadow-[6px_6px_0px_0px_#FF0055] transition-all duration-300 rounded-[2px] transform hover:-translate-y-1"
                  : "border border-transparent p-2 hover:bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.03)] transition-all duration-300 rounded-[2px]"
                } ${isStaggeredOffset ? "md:translate-y-8" : ""}`}
            >
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <div className="pt-8 md:pt-16 border-t border-editorial-dark/10">
          <Pagination
            data-testid="product-pagination"
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  )
}

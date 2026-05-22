import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
  sizes,
  studs,
  surfaces,
  price,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
  sizes?: string
  studs?: string
  surfaces?: string
  price?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col py-10 content-container"
      data-testid="collection-container"
    >
      {/* BREADCRUMBS & TIÊU ĐỀ BỘ SƯU TẬP */}
      <div className="w-full flex flex-col mb-10 gap-3 border-l-4 border-editorial-neonVolt pl-5">
        <div className="flex flex-wrap items-center gap-2 font-editorial text-xs font-bold uppercase tracking-widest text-gray-500">
          <LocalizedClientLink href="/" className="hover:text-editorial-neonPink transition-colors">
            TRANG CHỦ
          </LocalizedClientLink>
          <span className="text-gray-300">/</span>
          <span className="text-gray-300">BỘ SƯU TẬP</span>
          <span className="text-gray-300">/</span>
          <span className="text-editorial-dark">{collection.title}</span>
        </div>

        <h1 className="font-editorial text-4xl md:text-6xl font-black uppercase tracking-tight text-editorial-dark leading-none">
          {collection.title}
        </h1>
        
        {collection.metadata?.description ? (
          <div className="max-w-2xl font-sans text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
            <p>{collection.metadata.description as string}</p>
          </div>
        ) : (
          <p className="font-sans text-sm text-gray-500 mt-1 uppercase tracking-wider font-bold">
            BỘ SƯU TẬP GIÀY ĐÁ BÓNG CAO CẤP
          </p>
        )}
      </div>

      {/* BỘ LỌC NGANG & SẮP XẾP */}
      <RefinementList sortBy={sort} data-testid="sort-by-container" />

      {/* DANH SÁCH SẢN PHẨM PHÂN TRANG */}
      <div className="w-full">
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
            sizes={sizes}
            studs={studs}
            surfaces={surfaces}
            price={price}
          />
        </Suspense>
      </div>
    </div>
  )
}

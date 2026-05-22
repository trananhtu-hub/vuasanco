import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  sizes,
  studs,
  surfaces,
  price,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  sizes?: string
  studs?: string
  surfaces?: string
  price?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <div
      className="flex flex-col py-10 content-container"
      data-testid="category-container"
    >
      {/* BREADCRUMBS & TIÊU ĐỀ */}
      <div className="w-full flex flex-col mb-10 gap-3 border-l-4 border-editorial-neonVolt pl-5">
        <div className="flex flex-wrap items-center gap-2 font-editorial text-xs font-bold uppercase tracking-widest text-gray-500">
          <LocalizedClientLink href="/" className="hover:text-editorial-neonPink transition-colors">
            TRANG CHỦ
          </LocalizedClientLink>
          {parents &&
            [...parents].reverse().map((parent) => (
              <span key={parent.id} className="flex items-center gap-2">
                <span className="text-gray-300">/</span>
                <LocalizedClientLink
                  className="hover:text-editorial-neonPink transition-colors"
                  href={`/categories/${parent.handle}`}
                >
                  {parent.name}
                </LocalizedClientLink>
              </span>
            ))}
          <span className="text-gray-300">/</span>
          <span className="text-editorial-dark">{category.name}</span>
        </div>

        <h1 
          className="font-editorial text-4xl md:text-6xl font-black uppercase tracking-tight text-editorial-dark leading-none"
          data-testid="category-page-title"
        >
          {category.name}
        </h1>

        {category.description && (
          <div className="max-w-2xl font-sans text-sm md:text-base text-gray-500 mt-2 leading-relaxed">
            <p>{category.description}</p>
          </div>
        )}
      </div>

      {/* DANH MỤC CON (NẾU CÓ) */}
      {category.category_children && category.category_children.length > 0 && (
        <div className="mb-10 w-full bg-white border border-editorial-dark/10 p-5 rounded-[2px]">
          <span className="font-editorial text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
            Danh mục liên quan
          </span>
          <ul className="flex flex-wrap gap-2">
            {category.category_children.map((c) => (
              <li key={c.id}>
                <LocalizedClientLink
                  href={`/categories/${c.handle}`}
                  className="font-editorial text-sm font-bold uppercase tracking-wider border border-editorial-dark/20 hover:border-editorial-dark hover:bg-editorial-dark hover:text-white px-4 py-2 transition-all duration-200 inline-block rounded-[2px]"
                >
                  {c.name}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* BỘ LỌC NGANG & SẮP XẾP */}
      <RefinementList sortBy={sort} data-testid="sort-by-container" />

      {/* DANH SÁCH SẢN PHẨM PHÂN TRANG */}
      <div className="w-full">
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
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

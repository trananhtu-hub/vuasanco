import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  q,
  sortBy,
  page,
  countryCode,
  sizes,
  studs,
  surfaces,
  price,
}: {
  q?: string
  sortBy?: SortOptions
  page?: string
  countryCode: string
  sizes?: string
  studs?: string
  surfaces?: string
  price?: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    // ĐÃ VI CHỈNH: Giảm padding-top từ py-10 xuống pt-2 pb-10 để kéo sát khối breadcrumb & tiêu đề lên trên, loại bỏ cộng dồn khoảng trắng
    <div className="flex flex-col pt-2 pb-10 content-container" data-testid="store-container">
      {/* BREADCRUMBS & TIÊU ĐỀ */}
      <div className="w-full flex flex-col mb-10 gap-3 border-l-4 border-editorial-neonVolt pl-5">
        <div className="flex flex-wrap items-center gap-2 font-editorial text-xs font-bold uppercase tracking-widest text-gray-500">
          <LocalizedClientLink href="/" className="hover:text-editorial-neonPink transition-colors">
            TRANG CHỦ
          </LocalizedClientLink>
          <span className="text-gray-300">/</span>
          <LocalizedClientLink href="/store" className="hover:text-editorial-neonPink transition-colors">
            CỬA HÀNG
          </LocalizedClientLink>
          {q && (
            <>
              <span className="text-gray-300">/</span>
              <span className="text-editorial-neonPink">TÌM KIẾM: {q}</span>
            </>
          )}
        </div>

        <h1 
          className="font-editorial text-4xl md:text-6xl font-black uppercase tracking-tight text-editorial-dark leading-none"
          data-testid="store-page-title"
        >
          {q ? `KẾT QUẢ TÌM KIẾM CHO: "${q}"` : "TẤT CẢ SẢN PHẨM"}
        </h1>
        
        <p className="font-sans text-sm text-gray-500 mt-1 uppercase tracking-wider font-bold">
          {q ? `TÌM THẤY CÁC SẢN PHẨM KHỚP VỚI TỪ KHÓA CỦA BẠN` : "KHÁM PHÁ BỘ SƯU TẬP GIÀY BÓNG ĐÁ CHÍNH HÃNG"}
        </p>
      </div>

      {/* BỘ LỌC NGANG & SẮP XẾP */}
      <RefinementList sortBy={sort} />

      {/* DANH SÁCH SẢN PHẨM PHÂN TRANG */}
      <div className="w-full">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            q={q}
            sortBy={sort}
            page={pageNumber}
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

export default StoreTemplate

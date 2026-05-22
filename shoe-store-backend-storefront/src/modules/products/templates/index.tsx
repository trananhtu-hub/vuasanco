import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-editorial-light w-full">
      <div
        // BỐ CỤC MỚI: Mobile dùng flex-col (1 cột). Desktop dùng grid 12 cột.
        className="content-container flex flex-col lg:grid lg:grid-cols-12 lg:items-start py-8 lg:py-12 relative gap-8 lg:gap-16"
        data-testid="product-container"
      >
        {/* ================= CỘT TRÁI (~60%): IMAGE GALLERY ================= */}
        {/* Dùng col-span-7 để chiếm không gian lớn, tôn vinh hình ảnh */}
        <div className="w-full lg:col-span-7 relative block">
          <ImageGallery images={images} />
        </div>

        {/* ================= CỘT PHẢI (~40%): THÔNG TIN & NÚT MUA ================= */}
        {/* Dùng col-span-5 và hiệu ứng sticky top-24 để ghim cố định khi cuộn ảnh */}
        <div className="flex flex-col w-full lg:col-span-5 lg:sticky lg:top-24 py-4 lg:py-0 gap-y-10">
          
          {/* Thông tin sản phẩm (Tên, Giá, Đánh giá) */}
          <ProductInfo product={product} />

          {/* Khu vực chọn Size và Nút Thêm vào giỏ hàng */}
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>

          {/* Các tab thông tin chi tiết (Mô tả, Vận chuyển, v.v.) */}
          <ProductTabs product={product} />
          
        </div>
      </div>

      {/* ================= KHU VỰC SẢN PHẨM LIÊN QUAN ================= */}
      <div
        className="content-container my-16 lg:my-32"
        data-testid="related-products-container"
      >
        <div className="mb-12 border-b-4 border-editorial-dark pb-4 flex items-end justify-between">
          <h2 className="font-editorial text-4xl lg:text-5xl font-black uppercase tracking-wider text-editorial-dark">
            Có thể bạn cũng thích
          </h2>
          <span className="hidden md:block font-sans font-bold uppercase text-xs tracking-widest text-gray-500">
            Khám phá thêm
          </span>
        </div>
        
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </div>
  )
}

export default ProductTemplate
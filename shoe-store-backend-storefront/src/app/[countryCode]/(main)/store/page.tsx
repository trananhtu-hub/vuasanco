import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Cửa hàng | Vuasanco", // Đã Việt hóa tên Tab
  description: "Khám phá bộ sưu tập giày bóng đá chính hãng của Vuasanco.",
}

type Params = {
  searchParams: Promise<{
    q?: string
    sortBy?: SortOptions
    page?: string
    sizes?: string
    studs?: string
    surfaces?: string
    price?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { q, sortBy, page, sizes, studs, surfaces, price } = searchParams

  return (
    // ĐÃ VI CHỈNH THÊM: Giảm padding-top xuống pt-4 lg:pt-6 để tối ưu khoảng cách với Header
    <div className="pt-4 lg:pt-6">
      <StoreTemplate
        q={q}
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
        sizes={sizes}
        studs={studs}
        surfaces={surfaces}
        price={price}
      />
    </div>
  )
}
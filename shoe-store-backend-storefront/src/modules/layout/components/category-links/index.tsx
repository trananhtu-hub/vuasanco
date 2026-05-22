import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Danh sách các loại giày bóng đá của shop bạn
const Categories = {
  "Cỏ Nhân Tạo (TF)": "/store?category=tf",
  "Cỏ Tự Nhiên (FG)": "/store?category=fg",
  "Futsal (IC)": "/store?category=ic",
  "Giày Trẻ Em": "/store?category=kids",
}

const CategoryLinks = () => {
  return (
    // Dùng flex-row để các chữ nằm ngang, gap-x-6 tạo khoảng cách
    <ul className="flex flex-row gap-x-6 items-center">
      {Object.entries(Categories).map(([name, href]) => (
        <li key={name}>
          <LocalizedClientLink
            href={href}
            // Style thể thao: In hoa, đậm vừa, đổi màu xanh lá khi hover
            className="text-sm font-semibold hover:text-green-500 transition-colors uppercase tracking-wide text-gray-700"
          >
            {name}
          </LocalizedClientLink>
        </li>
      ))}
    </ul>
  )
}

export default CategoryLinks
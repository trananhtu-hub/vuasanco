import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính Sách Bảo Hành Giày Bóng Đá | Vuasanco",
  description: "Thông tin chi tiết về chính sách bảo hành keo, đinh giày bóng đá chính hãng tại Vuasanco. Đảm bảo an tâm trên từng bước chạy.",
}

export default async function WarrantyPolicyPage() {
  return (
    <div className="bg-editorial-light min-h-screen py-12 border-t-8 border-editorial-dark">
      <div className="content-container max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-16 border-4 border-editorial-dark shadow-[8px_8px_0px_0px_#0F0F0F] relative overflow-hidden">
        {/* NOISE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        
        <div className="relative z-10 font-sans text-editorial-dark">
          {/* Header Trang */}
          <div className="border-b-4 border-editorial-dark pb-6 mb-8">
            <span className="font-editorial text-sm font-black uppercase tracking-[0.2em] text-editorial-neonPink bg-editorial-dark px-3 py-1 inline-block mb-3">
              Chế Độ Bảo Hành
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              Chính sách bảo hành sản phẩm
            </h1>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              1. Thời gian bảo hành tiêu chuẩn
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mọi đôi giày bóng đá chính hãng mua tại hệ thống Vuasanco đều được hưởng chế độ bảo hành sửa chữa lỗi kỹ thuật miễn phí trong vòng <strong>90 ngày (3 tháng)</strong> kể từ ngày mua hàng (được ghi nhận trên hệ thống hóa đơn điện tử).
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              2. Các lỗi được bảo hành miễn phí
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chúng tôi chịu trách nhiệm bảo hành đối với các lỗi kỹ thuật phát sinh từ nhà sản xuất hoặc keo dán trong điều kiện sử dụng bình thường:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Bung keo đế, hở keo mép:</strong> Keo dán giữa phần da (Upper) và phần đế bị tách rời, bong mép (đặc biệt khi thi đấu trong điều kiện trời mưa hoặc ẩm ướt).
              </li>
              <li>
                <strong>Bứt chỉ, đứt chỉ đế:</strong> Đường chỉ khâu gia cố phần đế hoặc các chi tiết may chịu lực bị tuột hoặc rách chỉ khâu liên kết.
              </li>
              <li>
                <strong>Lỗi gãy đinh, nứt đinh đế:</strong> Đinh giày (đối với đinh FG, AG, SG) bị nứt gãy ngang thân do lỗi đúc nhựa của nhà sản xuất (chỉ bảo hành khi đinh chưa bị mài mòn quá mức).
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              3. Trường hợp từ chối bảo hành
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rất tiếc Vuasanco không thể hỗ trợ bảo hành miễn phí đối với các lỗi hư hại do tác động ngoại lực hoặc bảo quản sai cách trong quá trình sử dụng:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                Giày bị rách da, trầy xước lớp da bề mặt (Upper) do va chạm trực tiếp với đinh giày của đối thủ hoặc đập vào vật sắc nhọn, lưới thép rào sân bóng.
              </li>
              <li>
                Khách hàng tự ý sử dụng các loại keo lạ (đặc biệt là <strong>keo 502</strong>) để dán lại giày. Keo 502 sẽ làm cứng đơ da, cháy keo và làm hỏng hoàn toàn kết cấu sợi da của giày bóng đá, khiến shop không thể xử lý nhiệt dán keo chuyên dụng lại được nữa.
              </li>
              <li>
                Đế giày bị mòn đinh tự nhiên do thi đấu quá nhiều trên mặt sân bê tông, đường nhựa hoặc các bề mặt không phù hợp với phân loại đinh của giày.
              </li>
              <li>
                Hao mòn tự nhiên theo thời gian sử dụng (bạc màu da, rách lót giày, xước logo).
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              4. Quy trình gửi và nhận bảo hành
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Bước 1:</strong> Gửi ảnh và video mô tả tình trạng lỗi của giày về Hotline/Zalo <span className="text-editorial-neonPink">0123.456.789</span> để kỹ thuật viên thẩm định sơ bộ.
              </p>
              <p>
                <strong>Bước 2:</strong> Vệ sinh giày sạch sẽ, phơi khô (không gửi giày ướt, dính bùn đất bẩn) và gửi sản phẩm về cửa hàng Vuasanco gần nhất.
              </p>
              <p>
                <strong>Bước 3:</strong> Thời gian bảo hành dán keo và ép nhiệt chuyên dụng kéo dài từ <strong>3 - 7 ngày làm việc</strong> để đảm bảo keo liên kết bền bỉ nhất trước khi giao trả khách hàng.
              </p>
              <p>
                <strong>Phí vận chuyển:</strong> Quý khách vui lòng thanh toán phí chuyển giày tới shop. Vuasanco sẽ chịu toàn bộ chi phí dán keo bảo hành và phí ship gửi giày trả lại tận nhà cho quý khách sau khi sửa xong.
              </p>
            </div>
          </div>

          {/* Lưu ý bảo quản */}
          <div className="bg-editorial-neonVolt/10 border-l-4 border-editorial-neonVolt p-6 font-bold text-sm text-gray-700 space-y-2">
            <h4 className="font-editorial text-base font-black uppercase tracking-wider text-editorial-dark mb-1">
              💡 Mẹo nhỏ để giày bóng đá bền hơn:
            </h4>
            <p>
              - Hạn chế ngâm nước giày. Nếu đá trời mưa, sau khi về nên rút lót giày ra, nhét giấy báo vào bên trong để hút ẩm và để giày khô tự nhiên ở nơi thoáng mát (không phơi trực tiếp dưới nắng gắt hoặc dùng máy sấy nhiệt độ cao).
            </p>
            <p>
              - Nên tháo lỏng dây khi xỏ giày để tránh làm gãy, hỏng gót giày phía sau.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin | Vuasanco",
  description: "Chính sách bảo mật thông tin cá nhân khách hàng tại hệ thống Vuasanco Store. Cam kết an toàn thông tin giao dịch.",
}

export default async function PrivacyPolicyPage() {
  return (
    <div className="bg-editorial-light min-h-screen py-12 border-t-8 border-editorial-dark">
      <div className="content-container max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-16 border-4 border-editorial-dark shadow-[8px_8px_0px_0px_#0F0F0F] relative overflow-hidden">
        {/* NOISE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        
        <div className="relative z-10 font-sans text-editorial-dark">
          {/* Header Trang */}
          <div className="border-b-4 border-editorial-dark pb-6 mb-8">
            <span className="font-editorial text-sm font-black uppercase tracking-[0.2em] text-editorial-neonPink bg-editorial-dark px-3 py-1 inline-block mb-3">
              Quyền Riêng Tư
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              Chính sách bảo mật thông tin
            </h1>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              1. Mục đích thu thập dữ liệu cá nhân
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hệ thống Vuasanco tiến hành thu thập thông tin khách hàng (bao gồm họ tên, số điện thoại, địa chỉ nhận hàng và email) khi quý khách tạo tài khoản hoặc đặt đơn hàng trực tuyến nhằm phục vụ các hoạt động sau:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
              <li>Xác nhận và xử lý đơn hàng nhanh chóng, giao hàng giày bóng đá đúng hẹn tới tận tay quý khách.</li>
              <li>Hỗ trợ tư vấn size giày chính xác và giải đáp các thắc mắc về kỹ thuật hay bảo hành sản phẩm.</li>
              <li>Cập nhật trạng thái đơn hàng (đã gửi hàng, đang giao hàng, giao thành công) qua tin nhắn SMS hoặc Email.</li>
              <li>Gửi các chương trình khuyến mãi độc quyền, tri ân khách hàng thân thiết của Vuasanco.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              2. Phạm vi sử dụng thông tin
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Thông tin cá nhân thu thập được chỉ sử dụng trong nội bộ Vuasanco Store. Chúng tôi tuyệt đối không cung cấp, mua bán hay chia sẻ dữ liệu của bạn cho bất kỳ bên thứ ba nào ngoại trừ các đối tác vận chuyển uy tín (ví dụ: Giao Hàng Nhanh, Viettel Post, GHTK) để thực hiện quá trình phát hàng.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              3. Cam kết an toàn thông tin
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dữ liệu của khách hàng được mã hóa và bảo mật trên hệ thống máy chủ của Vuasanco bằng các công nghệ bảo mật tiên tiến nhất (chứng chỉ SSL/TLS mã hóa đường truyền thanh toán). Chúng tôi cam kết bảo vệ dữ liệu tối đa khỏi việc truy cập trái phép, rò rỉ dữ liệu ngoài ý muốn.
            </p>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              4. Quyền lợi và trách nhiệm của khách hàng
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Quyền truy cập và tự sửa đổi:</strong> Quý khách có quyền đăng nhập vào tài khoản cá nhân trên website để cập nhật thông tin địa chỉ hoặc số điện thoại mới bất kỳ lúc nào.
              </li>
              <li>
                <strong>Yêu cầu xóa dữ liệu:</strong> Quý khách có quyền yêu cầu Vuasanco xóa vĩnh viễn thông tin cá nhân của mình trên hệ thống bằng cách liên hệ qua email support@vuasanco.vn hoặc Zalo chăm sóc khách hàng.
              </li>
              <li>
                <strong>Trách nhiệm bảo mật tài khoản:</strong> Quý khách vui lòng không chia sẻ thông tin mật khẩu tài khoản mua hàng của mình cho người khác để tránh trường hợp lộ lọt thông tin cá nhân ngoài ý muốn.
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              5. Thời gian lưu trữ dữ liệu
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Thông tin cá nhân của quý khách được lưu trữ không giới hạn thời gian trên cơ sở dữ liệu bảo mật của hệ thống để chúng tôi tra cứu thông tin phục vụ chế độ bảo hành dài hạn (dán keo trọn đời) hoặc cho tới khi có yêu cầu hủy bỏ từ chính khách hàng.
            </p>
          </div>

          {/* Footer nhỏ */}
          <div className="border-t-2 border-gray-200 pt-6 text-xs text-gray-500 font-bold uppercase tracking-wider text-center">
            Mọi ý kiến đóng góp xin liên hệ Email: support@vuasanco.vn — Điện thoại: 0123.456.789
          </div>
        </div>
      </div>
    </div>
  )
}

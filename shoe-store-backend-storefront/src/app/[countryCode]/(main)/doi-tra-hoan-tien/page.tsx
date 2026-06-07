import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả & Hoàn Tiền | Vuasanco",
  description: "Chính sách đổi trả trong vòng 7 ngày và hoàn tiền linh hoạt dành cho khách hàng mua giày bóng đá tại hệ thống Vuasanco Store.",
}

export default async function RefundPolicyPage() {
  return (
    <div className="bg-editorial-light min-h-screen py-12 border-t-8 border-editorial-dark">
      <div className="content-container max-w-4xl mx-auto bg-white p-6 sm:p-10 md:p-16 border-4 border-editorial-dark shadow-[8px_8px_0px_0px_#0F0F0F] relative overflow-hidden">
        {/* NOISE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        
        <div className="relative z-10 font-sans text-editorial-dark">
          {/* Header Trang */}
          <div className="border-b-4 border-editorial-dark pb-6 mb-8">
            <span className="font-editorial text-sm font-black uppercase tracking-[0.2em] text-editorial-neonPink bg-editorial-dark px-3 py-1 inline-block mb-3">
              Hỗ Trợ Khách Hàng
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              Chính sách đổi trả & hoàn tiền
            </h1>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              1. Thời gian áp dụng đổi trả
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hệ thống Vuasanco hỗ trợ đổi trả sản phẩm trong vòng <strong>7 ngày</strong> kể từ thời điểm quý khách nhận được hàng thành công từ đơn vị vận chuyển.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              2. Điều kiện sản phẩm đổi trả
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Giày bóng đá là sản phẩm đặc thù dễ bị trầy xước đế và da khi thử trên các bề mặt cứng hoặc ra sân. Do đó, sản phẩm đổi trả cần đáp ứng các tiêu chuẩn nghiêm ngặt sau:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                Sản phẩm phải còn <strong>mới 100%</strong>, chưa qua sử dụng (chưa mang ra sân đá thử, không bám bụi bẩn, đất cát hoặc có vết trầy xước ở phần đế và da giày).
              </li>
              <li>
                Còn nguyên vẹn tem, tag treo, hóa đơn mua hàng và các phụ kiện đi kèm (nếu có, ví dụ: lót giày tặng kèm, túi dây rút).
              </li>
              <li>
                Hộp đựng giày chính hãng không bị rách nát, biến dạng hoặc bị quấn băng keo trực tiếp lên bề mặt hộp.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              3. Chính sách đổi size và đổi mẫu
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>Đổi do chật/rộng size:</strong> Cửa hàng hỗ trợ đổi sang size vừa vặn hơn của cùng mã sản phẩm. Trường hợp hết size, quý khách có thể đổi sang sản phẩm khác có giá trị tương đương hoặc cao hơn (bù phần chênh lệch). Khách hàng thanh toán phí vận chuyển 2 chiều.
              </p>
              <p>
                <strong>Đổi do lỗi sản xuất hoặc giao sai mẫu:</strong> Nếu giày gặp lỗi kỹ thuật khi chưa sử dụng (hở keo đế lớn, rách chỉ khâu khuyết tật da, sai màu/mẫu so với đơn đặt), Vuasanco sẽ chịu toàn bộ chi phí vận chuyển thu hồi và giao lại sản phẩm mới cho quý khách.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              4. Chính sách hoàn tiền
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Cam kết chính hãng:</strong> Vuasanco cam kết 100% sản phẩm bán ra là hàng chính hãng. Nếu quý khách phát hiện và chứng minh sản phẩm là hàng giả/nhái (Fake), chúng tôi xin hoàn tiền <strong>200%</strong> giá trị đơn hàng ngay lập tức.
              </li>
              <li>
                <strong>Hoàn tiền do lỗi sản phẩm:</strong> Trong trường hợp sản phẩm nhận được bị lỗi từ nhà sản xuất nhưng hệ thống đã hết size hoặc hết mẫu tương tự để đổi thế, quý khách sẽ được hoàn tiền 100%.
              </li>
              <li>
                <strong>Phương thức hoàn tiền:</strong> Tiền được hoàn trả qua tài khoản ngân hàng cá nhân của khách hàng trong vòng <strong>2-3 ngày làm việc</strong> sau khi Vuasanco nhận lại sản phẩm và xác nhận đáp ứng đủ điều kiện đổi trả ở Mục 2.
              </li>
            </ul>
          </div>

          {/* Quy trình */}
          <div className="bg-editorial-light border-l-4 border-editorial-dark p-6">
            <h3 className="font-editorial text-lg font-black uppercase tracking-wider text-editorial-neonPink mb-2">
              Quy trình thực hiện đổi trả nhanh chóng
            </h3>
            <p className="text-sm font-bold text-gray-700 leading-relaxed">
              Vui lòng liên hệ Hotline CSKH <span className="text-editorial-neonPink">0123.456.789</span> hoặc nhắn tin qua Fanpage Vuasanco, cung cấp số điện thoại đặt hàng kèm hình ảnh/video thực tế sản phẩm để bộ phận hỗ trợ hướng dẫn đóng gói gửi hàng về kho gần nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

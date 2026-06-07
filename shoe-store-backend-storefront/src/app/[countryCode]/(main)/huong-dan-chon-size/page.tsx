import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hướng Dẫn Chọn Size Giày Bóng Đá | Vuasanco",
  description: "Bảng quy đổi size và hướng dẫn chi tiết cách đo kích thước bàn chân để chọn size giày đá bóng chuẩn nhất, tránh chấn thương và tối ưu cảm giác bóng.",
}

export default async function SizeGuidePage() {
  const sizeChart = [
    { cm: "22.5 - 23.0", eu: "37", us: "5.0", uk: "4.5" },
    { cm: "23.0 - 23.5", eu: "38", us: "5.5", uk: "5.0" },
    { cm: "23.5 - 24.0", eu: "39", us: "6.5", uk: "6.0" },
    { cm: "24.0 - 24.5", eu: "40", us: "7.0", uk: "6.5" },
    { cm: "24.5 - 25.0", eu: "41", us: "8.0", uk: "7.5" },
    { cm: "25.0 - 25.5", eu: "42", us: "8.5", uk: "8.0" },
    { cm: "25.5 - 26.0", eu: "43", us: "9.5", uk: "9.0" },
    { cm: "26.0 - 26.5", eu: "44", us: "10.0", uk: "9.5" },
    { cm: "26.5 - 27.0", eu: "45", us: "11.0", uk: "10.5" },
  ]

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
              Hướng dẫn chọn size giày bóng đá
            </h1>
          </div>

          {/* Section 1 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              1. Tại sao việc chọn đúng size giày bóng đá lại cực kỳ quan trọng?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Khác với giày chạy bộ hay giày thời trang, giày bóng đá đòi hỏi độ ôm sát tối đa để đảm bảo cảm giác bóng tốt nhất và hạn chế chấn thương cổ chân khi bứt tốc, xoay xở. Một đôi giày bóng đá quá chật sẽ làm bạn bị phồng rộp, thâm móng; ngược lại, giày quá rộng sẽ gây lỏng chân, dễ trẹo khớp cổ chân.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              2. Các bước đo chiều dài bàn chân tại nhà
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Để đo chính xác nhất, bạn nên thực hiện vào buổi chiều hoặc tối khi bàn chân đã giãn nở hoàn toàn sau một ngày vận động:
            </p>
            <ol className="list-decimal pl-6 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <strong>Chuẩn bị:</strong> Đặt một tờ giấy A4 phẳng lên sàn nhà sát mép tường.
              </li>
              <li>
                <strong>Đứng lên giấy:</strong> Đứng thẳng, đặt gót chân chạm nhẹ vào tường phía sau.
              </li>
              <li>
                <strong>Đánh dấu:</strong> Dùng bút chì dựng đứng đánh dấu điểm xa nhất của ngón chân dài nhất (thường là ngón cái hoặc ngón trỏ).
              </li>
              <li>
                <strong>Đo đạc:</strong> Dùng thước kẻ đo khoảng cách từ mép tường đến điểm vừa đánh dấu để lấy chiều dài bàn chân bằng centimet (cm).
              </li>
              <li>
                <strong>Sai số:</strong> Cộng thêm 0.5 cm vào kích thước đã đo để chọn size thoải mái nhất (đặc biệt khi bạn đeo tất chống trơn dày).
              </li>
            </ol>
          </div>

          {/* Section 3 - Bảng Quy Đổi */}
          <div className="mb-10">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-6">
              3. Bảng quy đổi size giày bóng đá chuẩn
            </h2>
            <div className="overflow-x-auto border-4 border-editorial-dark">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-editorial-neonVolt text-editorial-dark border-b-4 border-editorial-dark font-editorial text-lg font-black uppercase tracking-wider">
                    <th className="p-4 border-r-2 border-editorial-dark">Chiều dài chân (cm)</th>
                    <th className="p-4 border-r-2 border-editorial-dark">Size EU (Việt Nam)</th>
                    <th className="p-4 border-r-2 border-editorial-dark">Size US</th>
                    <th className="p-4">Size UK</th>
                  </tr>
                </thead>
                <tbody className="font-sans font-bold">
                  {sizeChart.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b-2 border-editorial-dark hover:bg-editorial-neonVolt/10 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 border-r-2 border-editorial-dark text-editorial-neonPink">{row.cm} cm</td>
                      <td className="p-4 border-r-2 border-editorial-dark">{row.eu}</td>
                      <td className="p-4 border-r-2 border-editorial-dark">{row.us}</td>
                      <td className="p-4">{row.uk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4 */}
          <div className="mb-6">
            <h2 className="font-editorial text-2xl font-black uppercase border-l-4 border-editorial-neonPink pl-3 mb-4">
              4. Lưu ý khi chọn size theo form chân đặc thù
            </h2>
            <div className="bg-editorial-light border-l-4 border-editorial-dark p-4 font-bold text-sm space-y-2">
              <p>
                💡 <span className="text-editorial-neonPink uppercase">Dành cho Chân Bè (Wide Feet):</span> Nên chọn tăng 0.5 đến 1 size hoặc ưu tiên các dòng giày da thật (K-Leather/Calfskin) như Mizuno Morelia hoặc Nike Tiempo để giày co giãn theo form chân tốt hơn.
              </p>
              <p>
                💡 <span className="text-editorial-neonPink uppercase">Dành cho Chân Thon (Slim/Narrow Feet):</span> Chọn đúng size chuẩn đo được. Ưu tiên các dòng giày thiên hướng tốc độ như Nike Mercurial hoặc Adidas F50 để có độ ôm chân khít nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

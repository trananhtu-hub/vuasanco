import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  return (
    <footer className="bg-editorial-light text-editorial-dark w-full border-t-8 border-editorial-dark relative overflow-hidden">
      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
      
      <div className="w-full flex flex-col relative z-10">

        {/* ================= HEADER BÌA SAU TẠP CHÍ ================= */}
        <div className="w-full border-b-8 border-editorial-dark pt-12 pb-6 px-4 md:px-8 text-center overflow-hidden flex flex-col items-center">
          <span className="font-sans font-black uppercase text-sm md:text-xl tracking-[0.3em] text-editorial-neonPink mb-4 border-2 border-editorial-neonPink px-4 py-1">
            Mặc đỉnh cao - Đá thăng hoa
          </span>
          <h1 className="font-editorial font-black leading-[0.8] tracking-tighter uppercase text-editorial-dark" style={{ fontSize: 'clamp(4rem, 15vw, 15rem)' }}>
            VUASANCO
          </h1>
        </div>

        {/* ================= KHU VỰC CHÍNH: BỐ CỤC LƯỚI BOXY ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-editorial-dark border-b-4 border-editorial-dark">

          {/* CỘT 1: Thông tin liên hệ */}
          <div className="flex flex-col p-8 md:p-12 hover:bg-white transition-colors duration-300">
            <span className="font-editorial text-3xl font-black uppercase tracking-wider text-editorial-dark mb-6">Liên Hệ</span>
            <p className="text-base font-sans font-bold leading-relaxed text-gray-700 mb-6">
              Hệ thống phân phối giày bóng đá chính hãng hàng đầu. Đồng hành cùng đam mê trên mọi mặt sân.
            </p>
            <div className="text-sm flex flex-col gap-4 font-sans font-bold">
              <p className="flex justify-between border-b-2 border-gray-200 pb-2"><span className="uppercase tracking-widest text-gray-500">Hotline:</span> <span className="text-editorial-neonPink text-base">0123.456.789</span></p>
              <p className="flex justify-between border-b-2 border-gray-200 pb-2"><span className="uppercase tracking-widest text-gray-500">Email:</span> <span>support@vuasanco.vn</span></p>
              <p className="flex flex-col border-b-2 border-gray-200 pb-2"><span className="uppercase tracking-widest text-gray-500 mb-1">Địa chỉ:</span> <span>Học viện Công nghệ Bưu chính Viễn thông, Hà Nội</span></p>
            </div>
          </div>

          {/* CỘT 2: Danh Mục Sản Phẩm */}
          <div className="flex flex-col p-8 md:p-12 hover:bg-white transition-colors duration-300 group">
            <span className="font-editorial text-3xl font-black uppercase tracking-wider text-editorial-dark mb-6 group-hover:text-editorial-neonPink transition-colors">Danh Mục</span>
            <ul className="flex flex-col gap-y-6 text-lg font-editorial font-bold uppercase tracking-widest">
              <li><LocalizedClientLink href="/categories/giay-san-co-nhan-tao" className="hover:text-white hover:bg-editorial-neonVolt transition-all px-2 -mx-2 inline-block">Sân Cỏ Nhân Tạo</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/categories/giay-co-tu-nhien" className="hover:text-white hover:bg-editorial-neonPink transition-all px-2 -mx-2 inline-block">Sân Cỏ Tự Nhiên</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/categories/giay-futsal" className="hover:text-white hover:bg-editorial-neonVolt transition-all px-2 -mx-2 inline-block">Giày Futsal</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/categories/giay-tre-em" className="hover:text-white hover:bg-editorial-neonPink transition-all px-2 -mx-2 inline-block">Giày Trẻ Em</LocalizedClientLink></li>
            </ul>
          </div>

          {/* CỘT 3: Chính Sách & Hỗ Trợ */}
          <div className="flex flex-col p-8 md:p-12 hover:bg-white transition-colors duration-300 group">
            <span className="font-editorial text-3xl font-black uppercase tracking-wider text-editorial-dark mb-6 group-hover:text-editorial-neonPink transition-colors">Hỗ Trợ</span>
            <ul className="flex flex-col gap-y-6 text-lg font-editorial font-bold uppercase tracking-widest">
              <li><LocalizedClientLink href="/huong-dan-chon-size" className="hover:text-white hover:bg-editorial-dark transition-all px-2 -mx-2 inline-block">Hướng dẫn chọn size</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/doi-tra-hoan-tien" className="hover:text-white hover:bg-editorial-dark transition-all px-2 -mx-2 inline-block">Đổi trả & Hoàn tiền</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/chinh-sach-bao-hanh" className="hover:text-white hover:bg-editorial-dark transition-all px-2 -mx-2 inline-block">Chính sách bảo hành</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/bao-mat-thong-tin" className="hover:text-white hover:bg-editorial-dark transition-all px-2 -mx-2 inline-block">Bảo mật thông tin</LocalizedClientLink></li>
            </ul>
          </div>

          {/* CỘT 4: Kết nối mạng xã hội */}
          <div className="flex flex-col p-8 md:p-12 bg-editorial-neonVolt hover:bg-editorial-neonPink hover:text-white transition-colors duration-300">
            <span className="font-editorial text-3xl font-black uppercase tracking-wider text-editorial-dark mb-6 inherit-color">Kết Nối</span>
            <ul className="flex flex-col gap-y-6 text-2xl font-editorial font-black uppercase tracking-widest text-editorial-dark inherit-color">
              <li><a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform"><span className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center text-sm">F</span> Facebook</a></li>
              <li><a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform"><span className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center text-sm">I</span> Instagram</a></li>
              <li><a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform"><span className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center text-sm">T</span> TikTok</a></li>
              <li><a href="#" className="flex items-center gap-4 hover:translate-x-2 transition-transform"><span className="w-8 h-8 border-2 border-current rounded-full flex items-center justify-center text-sm">Y</span> YouTube</a></li>
            </ul>
          </div>

        </div>

        {/* ================= KHU VỰC BẢN QUYỀN (BOTTOM BAR) ================= */}
        <div className="flex flex-col md:flex-row w-full py-6 px-8 justify-between items-center bg-editorial-dark text-white font-sans font-bold uppercase tracking-widest text-[10px] sm:text-xs">
          <Text>
            © {new Date().getFullYear()} Vuasanco. All rights reserved.
          </Text>
          <Text className="mt-2 md:mt-0">
            Phát triển bởi Trần Anh Tú — Thiết kế Editorial Magazine
          </Text>
        </div>

      </div>
    </footer>
  )
}
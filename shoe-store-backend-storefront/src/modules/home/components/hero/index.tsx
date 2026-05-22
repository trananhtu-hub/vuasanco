import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative w-full bg-editorial-light pt-20 pb-10 overflow-hidden">
      {/* ================= MARQUEE TICKER ================= */}
      <div className="absolute top-0 left-0 w-full bg-editorial-neonVolt py-2 border-b-2 border-editorial-dark z-20 flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex gap-10 items-center font-editorial font-bold uppercase text-editorial-dark tracking-widest text-sm md:text-base">
          {Array(10).fill("🔥 FLASH SALE - MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC 🔥").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      <div className="content-container relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-8">
        
        {/* ================= CỘT TRÁI: TYPOGRAPHY KHỔNG LỒ ================= */}
        <div className="md:col-span-7 flex flex-col justify-center animate-fade-in-up">
          <h1 className="font-editorial text-[15vw] md:text-[9vw] leading-[0.85] font-black text-editorial-dark uppercase tracking-tighter mix-blend-multiply">
            LÀM CHỦ <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #0F0F0F" }}>THẾ TRẬN</span>
          </h1>
          <p className="mt-8 text-base md:text-lg text-gray-600 max-w-md font-sans leading-relaxed border-l-4 border-editorial-neonPink pl-4">
            Khám phá bộ sưu tập giày bóng đá cao cấp. Tối ưu cảm giác chạm, bứt phá tốc độ trên mọi mặt sân.
          </p>
          
          <div className="mt-10 flex items-center gap-6">
            <LocalizedClientLink href="/store">
              <button className="px-8 py-4 bg-editorial-dark text-editorial-light text-sm font-bold font-sans uppercase tracking-widest hover:bg-editorial-neonPink transition-colors duration-300">
                Khám Phá Ngay
              </button>
            </LocalizedClientLink>
            <div className="flex -space-x-4">
              <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop" alt="User 1" className="w-12 h-12 rounded-full border-2 border-editorial-light object-cover" />
              <img src="https://images.unsplash.com/photo-1511886929837-354d827aae26?w=100&h=100&fit=crop" alt="User 2" className="w-12 h-12 rounded-full border-2 border-editorial-light object-cover" />
              <div className="w-12 h-12 rounded-full border-2 border-editorial-light bg-editorial-neonVolt flex items-center justify-center font-bold text-sm text-editorial-dark">
                +2k
              </div>
            </div>
          </div>
        </div>

        {/* ================= CỘT PHẢI: HÌNH ẢNH ASYMMETRIC ================= */}
        <div className="md:col-span-5 relative mt-12 md:mt-0">
          <div className="relative w-full aspect-[3/4] group">
            {/* Background Shape */}
            <div className="absolute inset-0 bg-editorial-neonVolt -rotate-6 transform origin-bottom-left group-hover:rotate-0 transition-transform duration-500 ease-out z-0"></div>
            
            {/* Main Image */}
            <img 
              src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000" 
              alt="Nike Mercurial"
              className="absolute inset-0 w-full h-full object-cover z-10 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out shadow-2xl"
            />

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-editorial-dark text-editorial-light p-4 z-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="font-editorial text-3xl font-bold">NEW</p>
              <p className="text-xs font-sans tracking-widest text-editorial-neonVolt">ARRIVAL</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hero
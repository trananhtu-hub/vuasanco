import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-editorial-light relative small:min-h-screen font-sans">
      <div className="h-20 bg-editorial-neonVolt border-b-4 border-editorial-dark shadow-[0px_4px_0px_0px_rgba(15,15,15,1)] relative z-20">
        {/* Noise Overlay cho Header */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        
        <nav className="flex h-full items-center content-container justify-between relative z-10">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 flex-1 basis-0 text-editorial-dark hover:text-editorial-neonPink transition-colors group font-bold uppercase tracking-wider text-sm"
            data-testid="back-to-cart-link"
          >
            <span className="w-8 h-8 flex items-center justify-center border-2 border-editorial-dark rounded-full group-hover:bg-editorial-dark group-hover:text-editorial-neonVolt transition-all">
              <ChevronDown className="rotate-90" size={16} />
            </span>
            <span className="hidden small:block mt-px">
              Giỏ hàng
            </span>
            <span className="block small:hidden mt-px">
              Back
            </span>
          </LocalizedClientLink>
          
          <LocalizedClientLink
            href="/"
            className="font-editorial font-black uppercase text-3xl tracking-widest text-editorial-dark hover:text-editorial-neonPink transition-colors"
            data-testid="store-link"
          >
            VUASANCO
          </LocalizedClientLink>
          
          <div className="flex-1 basis-0 flex justify-end">
            <span className="border-2 border-editorial-dark bg-white px-3 py-1 font-black uppercase text-xs tracking-widest text-editorial-dark shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] transform rotate-2">
              Bảo mật
            </span>
          </div>
        </nav>
      </div>
      
      <div className="relative z-10" data-testid="checkout-container">
        {/* Noise Overlay cho body */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
      
      <div className="py-8 w-full flex items-center justify-center border-t-4 border-editorial-dark bg-editorial-light relative z-20">
        <MedusaCTA />
      </div>
    </div>
  )
}

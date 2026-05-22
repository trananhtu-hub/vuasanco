import { Suspense } from "react"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavWrapper from "./nav-wrapper"
import PromoBar from "@modules/layout/components/promo-bar"
import SearchBar from "@modules/layout/components/search-bar"
import { User, ShoppingCart } from "@medusajs/icons"


export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <NavWrapper>
      {/* ============================================================
          HEADER: 2 tầng cố định (sticky)
          Tầng 1 — Logo | Search | Icons
          Tầng 2 — Danh mục ngang
      ============================================================ */}
      <header className="relative mx-auto border-b border-gray-100/50">

        {/* ---------- TẦNG 1: Logo + Icons ---------- */}
        <div className="content-container flex items-center justify-between w-full py-3 gap-x-6">

          {/* CỘT TRÁI: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-x-4 flex-shrink-0 w-1/4">
            <div className="block lg:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
            <LocalizedClientLink href="/" className="inline-block">
              <span className="font-editorial text-2xl font-bold tracking-tighter uppercase text-editorial-dark hover:text-editorial-neonVolt transition-colors duration-300 hidden md:block">
                VUA<span className="text-editorial-neonPink">SANCO</span>
              </span>
              <img
                src="/logo.png"
                alt="Vua Sân Cỏ Logo"
                className="h-10 w-auto object-contain md:hidden"
              />
            </LocalizedClientLink>
          </div>

          {/* CỘT GIỮA: Search bar */}
          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          {/* CỘT PHẢI: User + Cart */}
          <div className="flex items-center gap-x-5 flex-shrink-0 w-1/4 justify-end">
            {/* Account */}
            <LocalizedClientLink
              href="/account"
              className="hidden small:flex items-center text-editorial-dark hover:text-editorial-neonPink transition-colors"
            >
              <User className="w-6 h-6" />
            </LocalizedClientLink>

            {/* Cart */}
            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="relative flex items-center text-editorial-dark hover:text-editorial-neonPink transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-1 -right-2 flex items-center justify-center bg-editorial-neonVolt text-editorial-dark text-[10px] font-bold rounded-full w-4 h-4 shadow-sm border border-editorial-dark">
                    0
                  </span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>

        {/* ---------- TẦNG 2: Danh mục ngang (Desktop only) ---------- */}
        <div className="hidden lg:block border-t border-gray-100/50">
          <div className="content-container">
            <nav className="flex items-center gap-x-1 justify-center py-1">
              {[
                { label: "Giày sân cỏ nhân tạo", href: "/categories/giay-san-co-nhan-tao" },
                { label: "Giày cỏ tự nhiên", href: "/categories/giay-co-tu-nhien" },
                { label: "Giày futsal", href: "/categories/giay-futsal" },
                { label: "Giày trẻ em", href: "/categories/giay-tre-em" },
              ].map((item) => (
                <LocalizedClientLink
                  key={item.href}
                  href={item.href}
                  className="relative px-6 py-2 text-sm font-sans font-medium text-editorial-dark hover:text-editorial-neonPink transition-colors group uppercase tracking-wider"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-editorial-neonPink scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </LocalizedClientLink>
              ))}
            </nav>
          </div>
        </div>

      </header>

      <PromoBar />
    </NavWrapper>
  )
}
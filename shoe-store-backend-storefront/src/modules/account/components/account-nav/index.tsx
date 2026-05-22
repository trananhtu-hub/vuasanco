"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      {/* GIAO DIỆN ĐIỆN THOẠI (MOBILE) */}
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-sm font-sans font-bold uppercase tracking-widest py-4 bg-editorial-dark text-white px-6 mb-6"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>QUAY LẠI TÀI KHOẢN</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="font-editorial text-3xl font-black uppercase mb-6 px-6 text-editorial-dark">
              XIN CHÀO <br/> <span className="text-editorial-neonPink">{customer?.first_name}</span>
            </div>
            <div className="text-base font-sans font-bold uppercase tracking-widest text-editorial-dark">
              <ul className="flex flex-col gap-y-2 px-4">
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 px-6 border-2 border-editorial-dark hover:bg-editorial-neonVolt transition-colors"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-3">
                        <User size={20} />
                        <span>HỒ SƠ CÁ NHÂN</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 px-6 border-2 border-editorial-dark hover:bg-editorial-neonVolt transition-colors"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-3">
                        <MapPin size={20} />
                        <span>SỔ ĐỊA CHỈ</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 px-6 border-2 border-editorial-dark hover:bg-editorial-neonVolt transition-colors"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-3">
                      <Package size={20} />
                      <span>ĐƠN HÀNG</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 px-6 border-2 border-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-colors w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-3">
                      <ArrowRightOnRectangle />
                      <span>ĐĂNG XUẤT</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* GIAO DIỆN MÁY TÍNH (DESKTOP) */}
      <div className="hidden small:block" data-testid="account-nav">
        <div>
          <div className="pb-8">
            <h3 className="font-editorial text-3xl font-black uppercase text-editorial-dark border-b-4 border-editorial-neonPink inline-block pb-1">MENU</h3>
          </div>
          <div className="text-base font-sans font-bold uppercase tracking-widest text-editorial-dark">
            <ul className="flex flex-col gap-y-4">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                >
                  TỔNG QUAN
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                >
                  HỒ SƠ CÁ NHÂN
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                >
                  SỔ ĐỊA CHỈ
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                >
                  ĐƠN HÀNG
                </AccountNavLink>
              </li>
              <li className="mt-8 border-t-2 border-editorial-dark/10 pt-8">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                  className="w-full text-left py-4 px-6 border-2 border-editorial-dark bg-white hover:bg-editorial-neonPink hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  ĐĂNG XUẤT
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx("group relative block py-4 px-6 overflow-hidden border-2 transition-all duration-300", {
        "border-editorial-dark bg-editorial-dark text-editorial-neonVolt shadow-[4px_4px_0px_0px_rgba(211,255,36,1)] translate-x-1": active,
        "border-editorial-dark/20 bg-transparent text-editorial-dark hover:border-editorial-dark": !active,
      })}
      data-testid={dataTestId}
    >
      {/* Sliding Background for Hover */}
      <span className={clx("absolute inset-0 w-full h-full bg-editorial-dark transform -translate-x-full transition-transform duration-300 ease-out z-0", {
        "group-hover:translate-x-0": !active
      })}></span>
      
      {/* Text Content */}
      <span className={clx("relative z-10 transition-colors duration-300", {
        "group-hover:text-editorial-neonVolt": !active
      })}>
        {children}
      </span>
    </LocalizedClientLink>
  )
}

export default AccountNav
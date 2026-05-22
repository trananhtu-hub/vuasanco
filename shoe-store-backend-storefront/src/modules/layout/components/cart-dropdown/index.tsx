"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { ShoppingCart } from "@medusajs/icons"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full relative z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full focus:outline-none">
          <LocalizedClientLink
            className="hover:text-ui-fg-base relative flex items-center"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1 -right-2 flex items-center justify-center bg-editorial-neonVolt text-editorial-dark text-[10px] font-bold rounded-full w-4 h-4 shadow-sm border border-editorial-dark">
              {totalItems}
            </span>
          </LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <PopoverPanel
            static
            // UI/UX: Bo góc mượt mà (rounded-2xl), đổ bóng nổi (shadow-xl), tạo khoảng đệm trên (mt-2)
            className="hidden small:block absolute top-[calc(100%+8px)] right-0 bg-white border-2 border-editorial-dark rounded-none shadow-xl w-[400px] text-ui-fg-base overflow-hidden z-[100]"
            data-testid="nav-cart-dropdown"
          >
            <div className="p-5 border-b-2 border-editorial-dark flex items-center justify-between bg-editorial-light">
              <h3 className="text-lg font-bold text-editorial-dark font-editorial uppercase tracking-wider">Giỏ hàng</h3>
              <span className="text-sm text-editorial-dark font-editorial uppercase tracking-wide font-bold">{totalItems} sản phẩm</span>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-auto max-h-[380px] p-5 flex flex-col gap-y-6 no-scrollbar">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                    })
                    .map((item) => (
                      <div
                        className="flex gap-x-4 items-start"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          // UI/UX: Không bo góc, viền đen sắc nét của Editorial
                          className="w-20 shrink-0 rounded-none overflow-hidden border border-editorial-dark/10 hover:border-editorial-neonVolt transition-colors"
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>

                        <div className="flex flex-col flex-1 justify-between gap-y-2">
                          <div className="flex justify-between items-start gap-x-2">
                            <h3 className="text-sm font-bold text-editorial-dark font-editorial uppercase tracking-tight line-clamp-2 w-[180px] hover:text-editorial-neonPink transition-colors">
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.title}
                              </LocalizedClientLink>
                            </h3>
                            <div className="text-right whitespace-nowrap">
                              <LineItemPrice
                                item={item}
                                style="tight"
                                currencyCode={cartState.currency_code}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-y-1 text-xs text-gray-500">
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                            <span data-testid="cart-item-quantity" data-value={item.quantity}>
                              Số lượng: {item.quantity}
                            </span>
                          </div>

                          <div className="flex mt-1">
                            {/* UI/UX: Nút xóa đồng bộ font và hover màu hồng neon */}
                            <DeleteButton
                              id={item.id}
                              className="text-xs text-gray-400 hover:text-editorial-neonPink transition-colors duration-200 flex items-center gap-x-1 font-editorial uppercase tracking-wider font-bold"
                              data-testid="cart-item-remove-button"
                            >
                              Xóa
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="p-5 border-t-2 border-editorial-dark bg-editorial-light flex flex-col gap-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-editorial-dark font-editorial uppercase tracking-wider font-bold">
                      Tạm tính
                    </span>
                    <span
                      className="text-lg font-bold text-editorial-dark font-editorial"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      // UI/UX: Đồng bộ sang phong cách Editorial thô ráp, tương phản cao, bo góc vuông, viền thô
                      className="w-full h-12 text-base font-bold uppercase tracking-wider rounded-none bg-editorial-dark text-editorial-neonVolt border-2 border-editorial-dark hover:bg-editorial-neonVolt hover:text-editorial-dark transition-all duration-300 font-editorial"
                      data-testid="go-to-cart-button"
                    >
                      Xem giỏ hàng
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center gap-y-4 text-center bg-white">
                <div className="bg-editorial-light border-2 border-editorial-dark w-16 h-16 rounded-none flex items-center justify-center text-editorial-dark">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <span className="text-editorial-dark text-sm font-editorial uppercase tracking-wider font-bold mt-2">Giỏ hàng của bạn đang trống.</span>
                <LocalizedClientLink href="/store">
                  <Button onClick={close} variant="secondary" className="mt-2 rounded-none px-6 font-editorial uppercase tracking-widest border-2 border-editorial-dark bg-transparent text-editorial-dark hover:bg-editorial-dark hover:text-editorial-neonVolt transition-all duration-300 font-bold">
                    Tiếp tục mua sắm
                  </Button>
                </LocalizedClientLink>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
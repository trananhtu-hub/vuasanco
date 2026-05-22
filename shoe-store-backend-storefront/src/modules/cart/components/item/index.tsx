"use client"

import { Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState<string>(String(item?.quantity || 1))

  // Chốt chặn an toàn: Ngăn lỗi crash web nếu item bị rỗng (undefined) do cache
  if (!item) return null;

  // Số lượng tối đa hợp lệ dựa theo tồn kho thực tế
  const maxQuantity =
    item.variant?.manage_inventory && !item.variant?.allow_backorder
      ? (item.variant?.inventory_quantity ?? 99)
      : 99

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        let errorMessage = err.message
        if (errorMessage.includes("Some variant does not have the required inventory")) {
          errorMessage = "Số lượng trong kho không đủ"
        }
        setError(errorMessage)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  const handleInputChange = async (val: string) => {
    if (val === "") {
      setInputValue("")
      return
    }

    const hasTrashChars = /[^0-9]/.test(val)

    if (hasTrashChars) {
      return
    }

    setInputValue(val)
  }

  const handleBlurOrEnter = async () => {
    let parsed = parseInt(inputValue, 10)

    if (isNaN(parsed) || parsed < 1) {
      parsed = 1
    } else if (parsed > maxQuantity) {
      parsed = maxQuantity
    }

    if (parsed !== item.quantity) {
      setInputValue(String(parsed))
      await changeQuantity(parsed)
    } else {
      setInputValue(String(item.quantity))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }

  return (
    <div
      className={clx("w-full grid gap-4 items-center bg-white border-4 border-editorial-dark p-4 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,42,122,1)] overflow-hidden relative", {
        "grid-cols-[64px_1fr]": type === "preview",
        "grid-cols-1 small:grid-cols-[100px_1fr_120px_120px_120px]": type === "full",
      })}
      data-testid="product-row"
    >
      <div className="flex items-center">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex overflow-hidden border-2 border-editorial-dark", {
            "w-16 h-16": type === "preview",
            "w-24 h-24": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
            className="rounded-none object-cover"
          />
        </LocalizedClientLink>
      </div>

      <div className="flex flex-col text-left justify-center px-2">
        <Text
          className="font-editorial font-black text-xl uppercase tracking-widest text-editorial-dark line-clamp-2"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </div>

      {type === "full" && (
        <div className="hidden small:flex flex-col justify-center font-sans font-bold text-gray-600 text-sm">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      )}

      {type === "full" && (
        <div className="flex flex-col relative">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min={1}
              max={maxQuantity}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={handleBlurOrEnter}
              onKeyDown={handleKeyDown}
              className="w-16 h-12 text-center border-2 border-editorial-dark text-lg font-black focus:outline-none focus:bg-editorial-neonVolt transition-colors"
              data-testid="product-quantity-input"
            />
            <DeleteButton
              id={item.id}
              className="w-12 h-12 flex items-center justify-center border-2 border-editorial-dark bg-editorial-light text-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-colors duration-200"
              data-testid="product-delete-button"
            />
            {updating && <Spinner />}
          </div>
          {error && (
            <div className="absolute top-[calc(100%+8px)] left-0 z-10 w-max max-w-[200px] animate-fade-in-top" data-testid="product-error-message">
              <div className="bg-editorial-dark border-2 border-editorial-neonPink text-editorial-neonPink font-sans font-bold text-xs p-2 shadow-[3px_3px_0px_0px_rgba(255,0,85,1)]">
                <span className="mr-1">⚠️</span>
                {error}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-right flex items-center justify-end font-editorial font-black text-2xl text-editorial-dark">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 text-sm font-sans font-bold text-gray-500 mb-1">
              <Text>{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </div>
    </div>
  )
}

export default Item
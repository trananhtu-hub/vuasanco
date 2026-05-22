"use client"

import { setAddresses } from "@lib/data/cart"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, clx, useToggleState } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import Spinner from "@modules/common/icons/spinner"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"
import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import { SubmitButton } from "../submit-button"

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  )

  const handleEdit = () => {
    router.push(pathname + "?step=address")
  }

  const [message, formAction] = useActionState(setAddresses, null)

  // Hàm chặn và ép ghi đè dữ liệu tài khoản
  const handleFormSubmit = (formData: FormData) => {
    if (customer) {
      if (customer.first_name) formData.set("shipping_address.first_name", customer.first_name)
      if (customer.last_name) formData.set("shipping_address.last_name", customer.last_name)
      if (customer.phone) formData.set("shipping_address.phone", customer.phone)
      if (customer.email) formData.set("email", customer.email)
    }
    formAction(formData)
  }

  return (
    <div className={clx("bg-white border-2 border-editorial-dark shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] p-6 lg:p-8 rounded-none transition-all duration-150 mb-8", {
      "border-editorial-neonVolt shadow-[6px_6px_0px_0px_rgba(211,255,36,1)]": isOpen,
    })}>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className="flex flex-row text-2xl lg:text-3xl font-editorial font-black uppercase tracking-wider text-editorial-dark gap-x-2 items-center"
        >
          Địa Chỉ Giao Hàng 
          {!isOpen && <CheckCircleSolid className="text-editorial-neonPink w-6 h-6" />}
        </Heading>
        {!isOpen && cart?.shipping_address && (
          <Text>
            <button
              onClick={handleEdit}
              className="font-editorial font-black uppercase text-sm text-editorial-dark hover:text-editorial-neonPink transition-colors underline"
              data-testid="edit-address-button"
            >
              Sửa
            </button>
          </Text>
        )}
      </div>
      {isOpen ? (
        <form action={handleFormSubmit}>
          <div className="pb-4">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div>
                <Heading
                  level="h2"
                  className="font-editorial font-black uppercase text-xl lg:text-2xl text-editorial-dark gap-x-4 pb-6 pt-8"
                >
                  Địa chỉ thanh toán
                </Heading>

                <BillingAddress cart={cart} />
              </div>
            )}
            <SubmitButton className="w-full mt-6 bg-editorial-neonVolt text-editorial-dark border-2 border-editorial-dark rounded-none font-bold uppercase hover:bg-editorial-dark hover:text-editorial-neonVolt hover:translate-y-[-2px] active:translate-y-[1px] shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] transition-all duration-150 py-3" data-testid="submit-address-button">
              Tiếp Tục
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          <div className="text-small-regular">
            {cart && cart.shipping_address ? (
              <div className="flex items-start gap-x-8">
                <div className="flex items-start gap-x-1 w-full">
                  <div
                    className="flex flex-col w-1/3"
                    data-testid="shipping-address-summary"
                  >
                    <Text className="font-bold text-editorial-dark mb-1 uppercase tracking-wider text-xs">
                      Địa chỉ giao hàng
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle font-medium">
                      {cart.shipping_address.first_name}{" "}
                      {cart.shipping_address.last_name}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.address_1}{" "}
                      {cart.shipping_address.address_2}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.postal_code},{" "}
                      {cart.shipping_address.city}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.shipping_address.country_code?.toUpperCase()}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3 "
                    data-testid="shipping-contact-summary"
                  >
                    <Text className="font-bold text-editorial-dark mb-1 uppercase tracking-wider text-xs">
                      Liên hệ
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle font-medium">
                      {cart.shipping_address.phone}
                    </Text>
                    <Text className="txt-medium text-ui-fg-subtle">
                      {cart.email}
                    </Text>
                  </div>

                  <div
                    className="flex flex-col w-1/3"
                    data-testid="billing-address-summary"
                  >
                    <Text className="font-bold text-editorial-dark mb-1 uppercase tracking-wider text-xs">
                      Địa chỉ thanh toán
                    </Text>

                    {sameAsBilling ? (
                      <Text className="txt-medium text-ui-fg-subtle">
                        Địa chỉ thanh toán giống địa chỉ giao hàng.
                      </Text>
                    ) : (
                      <>
                        <Text className="txt-medium text-ui-fg-subtle font-medium">
                          {cart.billing_address?.first_name}{" "}
                          {cart.billing_address?.last_name}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.address_1}{" "}
                          {cart.billing_address?.address_2}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.postal_code},{" "}
                          {cart.billing_address?.city}
                        </Text>
                        <Text className="txt-medium text-ui-fg-subtle">
                          {cart.billing_address?.country_code?.toUpperCase()}
                        </Text>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
      <Divider className="mt-8" />
    </div>
  )
}

export default Addresses
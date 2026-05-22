"use client"

import { RadioGroup } from "@headlessui/react"
import { isStripeLike, paymentInfoMap, isVNPay } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Button, Container, Heading, Text, clx } from "@medusajs/ui"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import Divider from "@modules/common/components/divider"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  useEffect(() => {
    if (activeSession?.provider_id) {
      const stored = localStorage.getItem("selected_payment_method")
      if (stored === "vnpay" && activeSession.provider_id === "pp_system_default") {
        setSelectedPaymentMethod("vnpay")
      } else {
        setSelectedPaymentMethod(activeSession.provider_id)
      }
    }
  }, [activeSession])

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const setPaymentMethod = async (method: string) => {
    setError(null)
    setSelectedPaymentMethod(method)
    localStorage.setItem("selected_payment_method", method)
    if (isStripeLike(method)) {
      await initiatePaymentSession(cart, {
        provider_id: method,
      })
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard =
        isStripeLike(selectedPaymentMethod) && !activeSession

      const checkActiveSession =
        activeSession?.provider_id === selectedPaymentMethod

      if (isVNPay(selectedPaymentMethod)) {
        const hasBackendVNPay = availablePaymentMethods.some(m => isVNPay(m.id))
        const providerIdToInit = hasBackendVNPay ? selectedPaymentMethod : "pp_system_default"
        
        await initiatePaymentSession(cart, {
          provider_id: providerIdToInit,
        })
      } else if (!checkActiveSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(
          pathname + "?" + createQueryString("step", "review"),
          {
            scroll: false,
          }
        )
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
    const vnpayError = searchParams.get("error")
    const vnpayCode = searchParams.get("code")
    const vnpayMsg = searchParams.get("msg")

    if (vnpayError) {
      if (vnpayError === "vnpay_failed") {
        setError(`Thanh toán qua VNPay thất bại hoặc bị hủy (Mã lỗi: ${vnpayCode || "unknown"}). Vui lòng thử lại.`)
      } else if (vnpayError === "vnpay_signature_invalid") {
        setError("Chữ ký bảo mật VNPay không hợp lệ. Vui lòng liên hệ hỗ trợ.")
      } else if (vnpayError === "medusa_order_failed") {
        setError(`Thanh toán thành công nhưng không thể tạo đơn hàng: ${vnpayMsg || ""}`)
      } else {
        setError("Có lỗi xảy ra trong quá trình thanh toán qua VNPay. Vui lòng thử lại.")
      }
    }
  }, [isOpen, searchParams])

  return (
    <div className={clx("bg-white border-2 border-editorial-dark shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] p-6 lg:p-8 rounded-none transition-all duration-150 mb-8", {
      "border-editorial-neonVolt shadow-[6px_6px_0px_0px_rgba(211,255,36,1)]": isOpen,
    })}>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row text-2xl lg:text-3xl font-editorial font-black uppercase tracking-wider text-editorial-dark gap-x-2 items-center",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Thanh Toán
          {!isOpen && paymentReady && (
            <CheckCircleSolid className="text-editorial-neonPink w-6 h-6" />
          )}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="font-editorial font-black uppercase text-sm text-editorial-dark hover:text-editorial-neonPink transition-colors underline"
              data-testid="edit-payment-button"
            >
              Chỉnh sửa
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length && (() => {
            const isVND = cart.region?.currency_code === "vnd"
            const paymentMethodsToRender = [...availablePaymentMethods]
            if (isVND && !paymentMethodsToRender.some(m => isVNPay(m.id))) {
              paymentMethodsToRender.push({
                id: "vnpay",
                provider_id: "vnpay"
              } as any)
            }

            return (
              <RadioGroup
                value={selectedPaymentMethod}
                onChange={(value: string) => setPaymentMethod(value)}
              >
                {paymentMethodsToRender.map((paymentMethod) => (
                  <div key={paymentMethod.id}>
                    {isStripeLike(paymentMethod.id) ? (
                      <StripeCardContainer
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                        paymentInfoMap={paymentInfoMap}
                        setCardBrand={setCardBrand}
                        setError={setError}
                        setCardComplete={setCardComplete}
                      />
                    ) : (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
            )
          })()}

          {paidByGiftcard && (
            <div className="flex flex-col w-1/3">
              <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
                Phương thức thanh toán
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method-summary"
              >
                Thẻ quà tặng
              </Text>
            </div>
          )}

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            size="large"
            className="w-full mt-6 bg-editorial-neonVolt text-editorial-dark border-2 border-editorial-dark rounded-none font-bold uppercase hover:bg-editorial-dark hover:text-editorial-neonVolt hover:translate-y-[-2px] active:translate-y-[1px] shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] transition-all duration-150 py-3"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={
              (isStripeLike(selectedPaymentMethod) && !cardComplete) ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            {!activeSession && isStripeLike(selectedPaymentMethod)
              ? "Nhập thông tin thẻ của bạn"
              : "Tiếp tục kiểm tra đơn hàng"}
          </Button>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/2">
                <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
                  Phương thức thanh toán
                </Text>
                <Text
                  className="txt-medium text-ui-fg-subtle font-medium"
                  data-testid="payment-method-summary"
                >
                  {selectedPaymentMethod === "vnpay" 
                    ? "Thanh toán qua VNPay"
                    : (paymentInfoMap[activeSession?.provider_id]?.title || activeSession?.provider_id)}
                </Text>
              </div>
              <div className="flex flex-col w-1/2">
                <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
                  Chi tiết thanh toán
                </Text>
                <div
                  className="flex gap-2 txt-medium text-ui-fg-subtle items-center font-medium"
                  data-testid="payment-details-summary"
                >
                  <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover rounded-none border border-editorial-dark">
                    {paymentInfoMap[selectedPaymentMethod]?.icon || (
                      <CreditCard />
                    )}
                  </Container>
                  <Text>
                    {isStripeLike(selectedPaymentMethod) && cardBrand
                      ? cardBrand
                      : "Thông tin chi tiết sẽ hiển thị ở bước tiếp theo"}
                  </Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="font-bold text-editorial-dark uppercase tracking-wider text-xs mb-1">
                Phương thức thanh toán
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle font-medium"
                data-testid="payment-method-summary"
              >
                Thẻ quà tặng
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment

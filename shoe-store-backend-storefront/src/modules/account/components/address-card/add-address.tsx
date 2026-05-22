"use client"

import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { useEffect, useState, useActionState } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import { addCustomerAddress } from "@lib/data/customer"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    isDefaultShipping: addresses.length === 0,
    success: false,
    error: null,
  })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        className="border-2 border-dashed border-editorial-dark bg-white hover:bg-editorial-light transition-colors rounded-none p-6 min-h-[220px] h-full w-full flex flex-col items-center justify-center gap-y-4"
        onClick={open}
        data-testid="add-address-button"
      >
        <div className="w-16 h-16 bg-editorial-neonVolt rounded-full flex items-center justify-center border-2 border-editorial-dark shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]">
          <Plus />
        </div>
        <span className="font-sans font-bold uppercase tracking-widest text-editorial-dark mt-2">Thêm địa chỉ mới</span>
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <h2 className="font-editorial text-3xl font-black uppercase text-editorial-dark mb-6">Thêm địa chỉ</h2>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-6">
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Họ"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
                <Input
                  label="Tên"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
              </div>
              <Input
                label="Công ty (Tùy chọn)"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label="Địa chỉ"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Căn hộ, Số nhà, v.v. (Tùy chọn)"
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-4">
                <Input
                  label="Mã bưu chính"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="Thành phố"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Tỉnh / Thành phố"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="Số điện thoại"
                name="phone"
                autoComplete="phone"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="text-editorial-neonPink text-sm font-bold mt-4"
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-4 mt-8">
              <button
                type="reset"
                onClick={close}
                className="px-6 py-3 font-sans font-bold uppercase tracking-widest text-editorial-dark border-2 border-editorial-dark bg-white hover:bg-gray-100 transition-colors"
                data-testid="cancel-button"
              >
                Hủy
              </button>
              <button 
                type="submit" 
                data-testid="save-button"
                className="px-6 py-3 font-sans font-bold uppercase tracking-widest text-editorial-dark border-2 border-editorial-dark bg-editorial-neonVolt hover:bg-editorial-neonPink hover:text-white transition-colors flex-1"
              >
                Lưu địa chỉ
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress

"use client"

import React, { useEffect, useState, useActionState } from "react"
import { PencilSquare as Edit, Trash } from "@medusajs/icons"
import { Button, Heading, Text, clx } from "@medusajs/ui"

import useToggleState from "@lib/hooks/use-toggle-state"
import CountrySelect from "@modules/checkout/components/country-select"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { HttpTypes } from "@medusajs/types"
import {
  deleteCustomerAddress,
  updateCustomerAddress,
} from "@lib/data/customer"

type EditAddressProps = {
  region: HttpTypes.StoreRegion
  address: HttpTypes.StoreCustomerAddress
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(updateCustomerAddress, {
    success: false,
    error: null,
    addressId: address.id,
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

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerAddress(address.id)
    setRemoving(false)
  }

  return (
    <>
      <div
        className={clx(
          "border-2 bg-white p-6 min-h-[220px] h-full w-full flex flex-col justify-between transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,15,15,1)] hover:translate-x-1 hover:translate-y-1",
          {
            "border-editorial-neonPink": isActive,
            "border-editorial-dark": !isActive
          }
        )}
        data-testid="address-container"
      >
        <div className="flex flex-col font-sans">
          <h3
            className="text-lg font-black uppercase text-editorial-dark border-b-2 border-editorial-dark pb-2 mb-4"
            data-testid="address-name"
          >
            {address.first_name} {address.last_name}
          </h3>
          {address.company && (
            <p
              className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2"
              data-testid="address-company"
            >
              {address.company}
            </p>
          )}
          <div className="flex flex-col text-left text-sm font-medium text-editorial-dark mt-2 gap-y-1">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4 mt-6">
          <button
            className="flex-1 flex items-center justify-center gap-x-2 py-2 px-4 border-2 border-editorial-dark text-editorial-dark font-bold uppercase text-xs tracking-widest hover:bg-editorial-dark hover:text-editorial-neonVolt transition-colors"
            onClick={open}
            data-testid="address-edit-button"
          >
            <Edit />
            Sửa
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-x-2 py-2 px-4 border-2 border-editorial-neonPink text-editorial-neonPink font-bold uppercase text-xs tracking-widest hover:bg-editorial-neonPink hover:text-white transition-colors"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Spinner /> : <Trash />}
            Xóa
          </button>
        </div>
      </div>

      <Modal isOpen={state} close={close} data-testid="edit-address-modal">
        <Modal.Title>
          <h2 className="font-editorial text-3xl font-black uppercase text-editorial-dark mb-6">Chỉnh sửa địa chỉ</h2>
        </Modal.Title>
        <form action={formAction}>
          <input type="hidden" name="addressId" value={address.id} />
          <Modal.Body>
            <div className="grid grid-cols-1 gap-y-6">
              <div className="grid grid-cols-2 gap-x-4">
                <Input
                  label="Họ"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  defaultValue={address.last_name || undefined}
                  data-testid="last-name-input"
                />
                <Input
                  label="Tên"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  defaultValue={address.first_name || undefined}
                  data-testid="first-name-input"
                />
              </div>
              <Input
                label="Công ty (Tùy chọn)"
                name="company"
                autoComplete="organization"
                defaultValue={address.company || undefined}
                data-testid="company-input"
              />
              <Input
                label="Địa chỉ"
                name="address_1"
                required
                autoComplete="address-line1"
                defaultValue={address.address_1 || undefined}
                data-testid="address-1-input"
              />
              <Input
                label="Căn hộ, Số nhà, v.v. (Tùy chọn)"
                name="address_2"
                autoComplete="address-line2"
                defaultValue={address.address_2 || undefined}
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-4">
                <Input
                  label="Mã bưu chính"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  defaultValue={address.postal_code || undefined}
                  data-testid="postal-code-input"
                />
                <Input
                  label="Thành phố"
                  name="city"
                  required
                  autoComplete="locality"
                  defaultValue={address.city || undefined}
                  data-testid="city-input"
                />
              </div>
              <Input
                label="Tỉnh / Thành phố"
                name="province"
                autoComplete="address-level1"
                defaultValue={address.province || undefined}
                data-testid="state-input"
              />
              <CountrySelect
                name="country_code"
                region={region}
                required
                autoComplete="country"
                defaultValue={address.country_code || undefined}
                data-testid="country-select"
              />
              <Input
                label="Số điện thoại"
                name="phone"
                autoComplete="phone"
                defaultValue={address.phone || undefined}
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div className="text-editorial-neonPink text-sm font-bold mt-4">
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

export default EditAddress

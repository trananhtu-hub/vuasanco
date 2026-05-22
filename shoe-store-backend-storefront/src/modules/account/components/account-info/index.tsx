import { Disclosure } from "@headlessui/react"
import { Badge, clx } from "@medusajs/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Đã xảy ra lỗi, vui lòng thử lại",
  children,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()

  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div className="font-sans border-2 border-editorial-dark bg-white p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)]" data-testid={dataTestid}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</span>
          <div className="flex items-center">
            {typeof currentInfo === "string" ? (
              <span className="font-editorial text-2xl font-black text-editorial-dark" data-testid="current-info">{currentInfo}</span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          <button
            className={clx("px-6 py-2 font-bold uppercase tracking-widest text-sm border-2 transition-colors", {
              "border-editorial-dark bg-editorial-dark text-editorial-neonVolt hover:bg-white hover:text-editorial-dark": !state,
              "border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:border-gray-400": state
            })}
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "HỦY" : "CHỈNH SỬA"}
          </button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100 mt-4": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-800 px-4 py-2 font-bold text-sm uppercase tracking-wider">
            Cập nhật thành công!
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[1000px] opacity-100 mt-4": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="bg-editorial-neonPink text-white border-2 border-editorial-dark px-4 py-2 font-bold text-sm uppercase tracking-wider">
            {errorMessage}
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-4 pt-6 mt-6 border-t-2 border-dashed border-editorial-dark/20">
            <div>{children}</div>
            <div className="flex items-center justify-end mt-4">
              <button
                disabled={pending}
                className="w-full md:w-auto px-8 py-3 bg-editorial-neonVolt text-editorial-dark font-editorial font-bold text-lg uppercase tracking-widest border-2 border-editorial-dark hover:bg-editorial-neonPink hover:text-white transition-colors disabled:opacity-50"
                type="submit"
                data-testid="save-button"
              >
                {pending ? "ĐANG LƯU..." : "LƯU THAY ĐỔI"}
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo

import { Label, clx } from "@medusajs/ui" // Đã thêm clx vào đây
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // Tách riêng className ra khỏi ...props
  ({ type, name, label, touched, required, topLabel, className, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 font-sans font-bold uppercase tracking-widest text-xs text-editorial-dark">{topLabel}</Label>
        )}
        <div className="flex relative z-0 w-full font-sans">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className={clx(
              "pt-6 pb-2 block w-full h-14 px-4 mt-0 bg-white border-2 border-editorial-dark rounded-none appearance-none focus:outline-none focus:ring-0 focus:border-editorial-neonPink focus:bg-editorial-light transition-colors peer",
              className
            )}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="flex items-center justify-center mx-4 px-1 transition-all absolute duration-300 top-4 -z-1 origin-0 text-gray-500 font-bold uppercase text-xs tracking-wider peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:text-editorial-neonPink peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-editorial-dark"
          >
            {label}
            {required && <span className="text-editorial-neonPink ml-1">*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-editorial-dark px-4 focus:outline-none transition-all duration-150 outline-none hover:text-editorial-neonPink absolute right-0 top-4"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"
import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 bg-editorial-light min-h-screen py-8 md:py-16" data-testid="account-page">
      <div className="content-container max-w-6xl mx-auto flex flex-col">
        
        {/* HEADER TÀI KHOẢN */}
        <div className="mb-8 border-b-4 border-editorial-dark pb-4">
          <h1 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter text-editorial-dark">
            TÀI KHOẢN <span className="text-editorial-neonPink">CỦA TÔI</span>
          </h1>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-16">
          <div className="md:border-r-2 border-editorial-dark/20 md:pr-8">
            {customer && <AccountNav customer={customer} />}
          </div>
          
          <div className="flex-1 bg-white p-6 md:p-10 border-2 border-editorial-dark shadow-[8px_8px_0px_0px_rgba(15,15,15,1)]">
            {children}
          </div>
        </div>

        {/* FOOTER HỖ TRỢ */}
        <div className="mt-16 bg-editorial-dark text-editorial-light p-8 md:p-12 border-t-8 border-editorial-neonVolt flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="font-editorial text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 text-editorial-neonVolt">
              CẦN HỖ TRỢ?
            </h3>
            <p className="font-sans text-gray-300 leading-relaxed text-sm md:text-base">
              Mọi thắc mắc về đơn hàng, đổi trả hoặc cần tư vấn thêm, vui lòng tham khảo các câu hỏi thường gặp tại trung tâm hỗ trợ của chúng tôi.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a 
              href="/customer-service"
              className="inline-flex items-center justify-center px-8 py-4 bg-editorial-neonPink text-white font-sans font-bold uppercase tracking-widest hover:bg-white hover:text-editorial-neonPink transition-colors border-2 border-transparent hover:border-editorial-neonPink"
            >
              Trung tâm hỗ trợ
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AccountLayout

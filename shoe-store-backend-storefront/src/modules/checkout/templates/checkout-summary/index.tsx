import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-24 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 w-full z-10">
      <div className="w-full bg-editorial-neonVolt p-6 lg:p-8 border-4 border-editorial-dark shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] relative overflow-hidden flex flex-col">
        {/* Răng cưa vé VIP */}
        <div className="absolute -left-4 top-12 w-8 h-8 rounded-full border-4 border-editorial-dark bg-editorial-light"></div>
        <div className="absolute -right-4 top-12 w-8 h-8 rounded-full border-4 border-editorial-dark bg-editorial-light"></div>

        <Divider className="my-6 small:hidden border-editorial-dark border-b-2" />
        
        <div className="border-b-4 border-editorial-dark pb-4 mb-6">
          <h2 className="text-2xl lg:text-3xl font-editorial font-black uppercase tracking-wider text-editorial-dark">
            Giỏ hàng của bạn
          </h2>
        </div>
        
        <div className="font-sans font-bold text-editorial-dark mb-6">
          <CartTotals totals={cart} />
        </div>
        
        <div className="bg-white border-2 border-editorial-dark p-4 shadow-[4px_4px_0px_0px_rgba(15,15,15,1)] mb-6">
          <ItemsPreviewTemplate cart={cart} />
        </div>
        
        <div className="mt-auto pt-2 border-t-2 border-dashed border-editorial-dark">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary

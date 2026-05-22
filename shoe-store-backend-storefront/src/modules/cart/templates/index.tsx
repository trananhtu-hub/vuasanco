import ItemsTemplate from "@modules/cart/templates/items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-12 bg-editorial-light min-h-screen">
      <div className="content-container" data-testid="cart-container">
        
        <div className="mb-12 border-b-4 border-editorial-dark pb-6">
          <h1 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter text-editorial-dark">
            GIỎ HÀNG <span className="text-editorial-neonPink">CỦA BẠN</span>
          </h1>
        </div>

        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_400px] gap-x-12">
            <div className="flex flex-col gap-y-6">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              {/* Truyền cart vào ItemsTemplate đã được Việt hóa */}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              {/* Summary hiện tại đã có sticky bên trong file summary.tsx */}
              {cart && cart.region && (
                <div className="relative">
                  <Summary cart={cart as any} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
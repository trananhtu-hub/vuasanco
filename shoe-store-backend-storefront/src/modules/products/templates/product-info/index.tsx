import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-2">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs font-sans font-bold uppercase tracking-widest text-editorial-neonPink hover:text-editorial-dark transition-colors inline-block w-fit border-b border-editorial-neonPink pb-1"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <h1 
          className="font-editorial text-4xl md:text-5xl lg:text-6xl font-black uppercase text-editorial-dark leading-[0.9] tracking-tight mt-2"
          data-testid="product-title"
        >
          {product.title}
        </h1>

        <Text
          className="text-base text-gray-500 font-sans mt-4 leading-relaxed border-l-2 border-editorial-neonVolt pl-4"
          data-testid="product-description"
        >
          {product.description}
        </Text>
      </div>
    </div>
  )
}

export default ProductInfo

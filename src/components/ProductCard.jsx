import { motion } from 'framer-motion'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="group bg-white relative cursor-pointer"
    >
      {/* Wishlist Icon */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-[#282c3f]">
        <Heart size={18} />
      </button>

      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f6]">
        <img
          src={product.main_image_url || 'https://via.placeholder.com/400x533'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Rating Badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
          <span className="text-[10px] font-bold text-[#282c3f]">4.2</span>
          <Star size={10} className="fill-[#14958f] text-[#14958f]" />
          <div className="w-[1px] h-3 bg-gray-300 mx-1" />
          <span className="text-[10px] text-gray-500 font-bold">1.2k</span>
        </div>

        {/* Add to Bag on Hover */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 shadow-2xl">
          <button className="w-full py-2 border border-accent text-accent font-bold text-xs uppercase tracking-wider hover:bg-accent hover:text-white transition-colors">
            Wishlist
          </button>
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2 bg-accent text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Add to bag
          </button>
        </div>
      </div>

      <div className="p-4 pt-3 group-hover:opacity-0 transition-opacity duration-200">
        <h3 className="font-bold text-[#282c3f] text-sm mb-0.5 uppercase tracking-tight truncate">
          {product.name}
        </h3>
        <p className="text-[13px] text-[#535766] mb-1 line-clamp-1">Professional Grade Craft Kit</p>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-bold text-[#282c3f]">Rs. {product.price}</span>
          {product.compare_at_price && (
            <>
              <span className="text-[11px] text-[#7e818c] line-through">Rs. {product.compare_at_price}</span>
              <span className="text-[11px] text-[#ff905a] font-bold">
                ({Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

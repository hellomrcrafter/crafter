import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, ChevronRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'

const ProductDetail = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (name, slug),
          product_images (*)
        `)
        .eq('id', id)
        .single()

      if (!error) {
        setProduct(data)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-gray-300 uppercase tracking-widest">Product Not Found</h2>
        <Link to="/" className="btn-primary mt-6">Go Home</Link>
      </div>
    )
  }

  const images = product.product_images?.length > 0
    ? product.product_images.map(img => img.image_url)
    : [product.main_image_url || 'https://via.placeholder.com/600x800']

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 mb-12 whitespace-nowrap overflow-x-auto">
          <Link to="/" className="hover:text-accent">Home</Link>
          <ChevronRight size={10} className="mx-2" />
          <Link to={`/category/${product.categories?.slug}`} className="hover:text-accent">{product.categories?.name}</Link>
          <ChevronRight size={10} className="mx-2" />
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbs */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:max-h-[600px]">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 aspect-[3/4] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-accent ring-2 ring-accent/10' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 aspect-[3/4] bg-[#f5f5f6] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-100"
            >
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </motion.div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4 leading-none">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center gap-1 bg-white border border-gray-100 px-3 py-1 rounded shadow-sm">
                <span className="text-sm font-black text-primary">4.2</span>
                <Star size={14} className="fill-[#14958f] text-[#14958f]" />
                <div className="w-[1px] h-4 bg-gray-200 mx-2" />
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">1.2k Ratings</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-gray-100">
              <span className="text-4xl font-black text-primary">Rs. {product.price}</span>
              {product.compare_at_price && (
                <>
                  <span className="text-2xl text-gray-300 line-through font-medium">Rs. {product.compare_at_price}</span>
                  <span className="text-2xl text-orange-400 font-black tracking-tighter">
                    ({Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

            <div className="space-y-10 mb-12">
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quantity:</span>
                <div className="flex items-center border-2 border-primary rounded overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-2 hover:bg-primary hover:text-white transition-colors text-primary font-black"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 font-black text-sm w-16 text-center border-x-2 border-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-2 hover:bg-primary hover:text-white transition-colors text-primary font-black"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 btn-primary py-5 flex items-center justify-center gap-3 shadow-xl hover:shadow-accent/40"
                >
                  <ShoppingBag size={20} /> Add to Bag
                </button>
                <button className="p-5 border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all group scale-100 active:scale-90">
                  <Heart size={20} className="group-hover:fill-white" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Product Details</h3>
              <p className="text-[#535766] leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <ShieldCheck size={22} />
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">100% Original</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Truck size={22} />
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Free Shipping</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                  <RotateCcw size={22} />
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

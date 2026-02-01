import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useProducts } from '../hooks/useData'

const FeaturedProducts = () => {
  const { products, loading, error } = useProducts()

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-bold uppercase tracking-widest text-xs">
        Error loading products: {error}
      </div>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-100 pb-10">
          <div>
            <h2 className="text-3xl font-black text-[#282c3f] uppercase tracking-tighter mb-2">
              TRENDING <span className="text-gray-400 font-medium">// TOP PICKS</span>
            </h2>
            <div className="w-16 h-1.5 bg-accent" />
          </div>
          <button className="text-accent font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2 hover:translate-x-2 transition-transform">
            See the full gallery <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.length > 0 ? products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : (
            <div className="col-span-full py-10 bg-gray-50 rounded-2xl text-center border-2 border-dashed border-gray-100">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No products found. Please seed the database in Admin.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

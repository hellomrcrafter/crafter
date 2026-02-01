import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useData'

const ProductListing = () => {
  const { categorySlug } = useParams()
  const { products, loading, error } = useProducts(categorySlug)

  if (loading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="mb-10 text-center md:text-left border-b border-gray-100 pb-10">
          <h1 className="text-4xl font-black text-primary uppercase tracking-tighter mb-2">
            {categorySlug ? categorySlug.replace('-', ' ') : 'All Collections'}
          </h1>
          <p className="text-gray-500 font-medium italic">Discover our curated selection of professional craft essentials.</p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
            <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">No products found in this category</h2>
            <Link to="/" className="text-accent font-black uppercase text-sm mt-4 inline-block hover:underline">Go back home</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductListing

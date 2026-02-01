import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategorySection from './components/CategorySection'
import FeaturedProducts from './components/FeaturedProducts'
import ProductListing from './pages/ProductListing'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import Inventory from './pages/admin/Inventory'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <CategorySection />
                <FeaturedProducts />
              </main>
              <Footer />
            </>
          } />
          <Route path="/category/:categorySlug" element={<><Navbar /><ProductListing /><Footer /></>} />
          <Route path="/product/:id" element={<><Navbar /><ProductDetail /><Footer /></>} />
          <Route path="/cart" element={<><Navbar /><Cart /><Footer /></>} />
          <Route path="/profile" element={<><Navbar /><Profile /><Footer /></>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/inventory" element={<AdminLayout><Inventory /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><div className="text-2xl font-bold">Orders Management (Coming Soon)</div></AdminLayout>} />
          <Route path="/admin/promotions" element={<AdminLayout><div className="text-2xl font-bold">Promotions & Codes (Coming Soon)</div></AdminLayout>} />
          <Route path="/admin/analytics" element={<AdminLayout><div className="text-2xl font-bold">Extended Analytics (Coming Soon)</div></AdminLayout>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

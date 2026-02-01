import { useState } from 'react'
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import LoginModal from './LoginModal'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user } = useAuth()
  const { totalQuantity } = useCart()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'DIY Bases', path: '/category/diy-bases' },
    { name: 'DIY Kits', path: '/category/diy-kits' },
    { name: 'Art Forms', path: '/category/art-forms' },
    { name: 'Craft Supplies', path: '/category/craft-supplies' },
    { name: 'Offer', path: '/category/clearance-sale', highlight: true },
  ]

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-sm ring-1 ring-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center h-20">

            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 flex items-center shadow-none border-none">
                <span className="text-2xl font-black text-[#282c3f] tracking-tighter">
                  MR<span className="text-accent underline decoration-4 underline-offset-4 pointer-events-none">CRAFTER</span>
                </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-link text-xs ${link.highlight ? 'text-accent' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search Bar - Myntra Style */}
            <div className="hidden md:flex flex-1 max-w-lg mx-10 relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="w-full bg-[#f5f5f6] border-none py-2.5 pl-10 pr-4 rounded text-sm focus:ring-1 focus:ring-gray-300 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-8">
              <button
                onClick={handleProfileClick}
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
                className="flex flex-col items-center text-gray-700 hover:text-[#282c3f] transition-all group relative py-2"
              >
                <User size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold mt-1 uppercase tracking-tight">Profile</span>

                {/* Profile Hover Dropdown (Myntra Style) */}
                {isProfileOpen && !user && (
                  <div className="absolute top-full right-[-50px] w-64 bg-white shadow-2xl rounded-sm border border-gray-100 p-6 z-[60] text-left animate-in fade-in slide-in-from-top-2 duration-200">
                    <h4 className="text-sm font-black text-primary uppercase tracking-tighter mb-1">Welcome</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight mb-4">To access account and manage orders</p>
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="w-full py-2.5 border border-gray-200 text-accent font-black text-xs uppercase tracking-widest hover:border-accent transition-colors"
                    >
                      Login / Signup
                    </button>
                  </div>
                )}
              </button>

              <button className="flex flex-col items-center text-gray-700 hover:text-[#282c3f] transition-all group">
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold mt-1 uppercase tracking-tight font-sans">Wishlist</span>
              </button>
              <Link to="/cart" className="flex flex-col items-center text-gray-700 hover:text-[#282c3f] transition-all group relative font-sans">
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold mt-1 uppercase tracking-tight">Bag</span>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[9px] font-black px-1.5 py-0.5 rounded-full scale-90">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-gray-700">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="px-5 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-sm font-bold text-[#282c3f] uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/profile"
                  className="block text-sm font-bold text-accent uppercase tracking-wider"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
              ) : (
                <button
                  onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }}
                  className="block text-sm font-bold text-accent uppercase tracking-wider"
                >
                  Login / Signup
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  )
}

export default Navbar

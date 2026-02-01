import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f6] pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 border-b border-gray-200 pb-16">

          <div className="space-y-6">
            <h3 className="text-xs font-black text-[#282c3f] tracking-[0.2em] uppercase">Online Shopping</h3>
            <ul className="space-y-2 text-[#535766] text-sm">
              <li><Link to="/category/diy-bases" className="underline-offset-4 hover:underline">DIY Bases</Link></li>
              <li><Link to="/category/diy-kits" className="underline-offset-4 hover:underline">DIY Kits</Link></li>
              <li><Link to="/category/art-forms" className="underline-offset-4 hover:underline">Art Forms</Link></li>
              <li><Link to="/category/craft-supplies" className="underline-offset-4 hover:underline">Craft Supplies</Link></li>
              <li><Link to="/category/clearance-sale" className="underline-offset-4 hover:underline">Offers</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-[#282c3f] tracking-[0.2em] uppercase">Policy</h3>
            <ul className="space-y-2 text-[#535766] text-sm">
              <li><Link to="/" className="underline-offset-4 hover:underline">Contact Us</Link></li>
              <li><Link to="/" className="underline-offset-4 hover:underline">FAQ</Link></li>
              <li><Link to="/" className="underline-offset-4 hover:underline">T&C</Link></li>
              <li><Link to="/" className="underline-offset-4 hover:underline">Terms Of Use</Link></li>
              <li><Link to="/" className="underline-offset-4 hover:underline">Track Orders</Link></li>
              <li><Link to="/" className="underline-offset-4 hover:underline">Returns</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-[#282c3f] tracking-[0.2em] uppercase">Keep in touch</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#282c3f]">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#282c3f]">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#282c3f]">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm hover:scale-110 transition-transform text-[#282c3f]">
                <Youtube size={18} />
              </a>
            </div>
            <div className="pt-4 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs text-[#535766]">
                <MapPin size={16} className="text-gray-400" />
                <span>Indirapuram, Ghaziabad, UP, India</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#535766]">
                <Phone size={16} className="text-gray-400" />
                <span>+91 91522 9de-30ac</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#535766]">
                <Mail size={16} className="text-gray-400" />
                <span>contact@mrcrafter.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-[#282c3f] tracking-[0.2em] uppercase">100% Original Guarantee</h3>
            <p className="text-sm text-[#7e818c] leading-relaxed">
              Every item sold by Mr Crafter is sourced directly from professional artisans and verified for quality.
            </p>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <img src="https://via.placeholder.com/100x40?text=Razorpay" alt="Razorpay" className="grayscale opacity-50" />
              <img src="https://via.placeholder.com/100x40?text=Secure" alt="Secure" className="grayscale opacity-50" />
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-[#535766] tracking-widest uppercase">
            © 2026 MR CRAFTER. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-[10px] font-black uppercase text-gray-300 hover:text-accent transition-colors">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

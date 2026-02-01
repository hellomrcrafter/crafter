import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Heart, MapPin, LogOut, ChevronRight, Package, CreditCard, Gift, Clock } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getUserOrders } from '../lib/orders'

const Profile = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const { data, error } = await getUserOrders(user.id)
        if (!error) setOrders(data || [])
        setLoading(false)
      }
      fetchOrders()
    }
  }, [user])

  if (!user) {
    navigate('/')
    return null
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#f5f5f6] py-12">
      <div className="max-w-5xl mx-auto px-4">

        {/* Profile Header */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center text-accent font-black text-3xl ring-4 ring-white shadow-lg">
            {user.email[0].toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-black text-primary uppercase tracking-tighter mb-1">
              {user.user_metadata?.full_name || 'Member Profile'}
            </h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Pro Crafter</span>
              <span className="bg-accent text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">1240 Points</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 font-black uppercase text-xs tracking-widest px-6 py-3 border border-red-100 rounded-lg hover:bg-red-50 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Account Links */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Overview</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {[
                { title: 'Orders', icon: Package, link: '/orders' },
                { title: 'Wishlist', icon: Heart, link: '/wishlist' },
                { title: 'Coupons', icon: Gift, link: '/coupons' },
                { title: 'Saved Addresses', icon: MapPin, link: '/addresses' },
                { title: 'Saved Cards', icon: CreditCard, link: '/cards' },
              ].map((item, id) => (
                <button key={id} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 group">
                  <div className="flex items-center gap-4">
                    <item.icon size={18} className="text-gray-400 group-hover:text-accent transition-colors" />
                    <span className="text-sm font-bold text-[#282c3f] uppercase tracking-wide">{item.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Main Content: Orders History */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Recent Orders</h2>

            {loading ? (
              <div className="bg-white p-12 rounded-2xl text-center border border-gray-100">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 bg-gray-50 flex justify-between items-center border-b border-gray-100">
                      <div className="flex gap-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Placed</span>
                          <span className="text-xs font-bold text-primary">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</span>
                          <span className="text-xs font-bold text-primary">Rs. {order.total_amount}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${order.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-6">
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex gap-6">
                          <div className="w-16 h-20 bg-gray-50 rounded overflow-hidden border border-gray-100 flex-shrink-0">
                            <img src={item.products?.main_image_url} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-primary uppercase tracking-tight truncate">{item.products?.name}</h4>
                            <p className="text-xs text-gray-500 font-medium mt-1">Quantity: {item.quantity}</p>
                            <p className="text-xs text-accent font-black mt-2">Rs. {item.price_at_purchase}</p>
                          </div>
                          <button className="text-[10px] font-black text-accent uppercase tracking-widest self-center border-b border-accent/20 hover:border-accent">View Item</button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-16 rounded-2xl text-center border border-gray-100 border-dashed">
                <Package size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No orders yet. Your crafting journey starts here!</p>
                <Link to="/" className="text-accent font-black uppercase text-xs tracking-widest mt-6 inline-block border-b-2 border-accent/20 hover:border-accent transition-all pb-1">Start Shopping</Link>
              </div>
            )}

            {/* Loyalty Program Teaser */}
            <div className="bg-gradient-to-br from-primary to-slate-800 p-8 rounded-3xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black uppercase tracking-tighter mb-2 italic">Insider Rewards</h3>
                <p className="text-sm text-gray-300 font-medium mb-6 max-w-[240px]">You are 260 points away from unlocking "Master Artisan" status.</p>
                <button className="bg-accent text-white py-3 px-8 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform">View Benefits</button>
              </div>
              <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
              <Gift className="absolute bottom-[-10px] right-[-10px] w-32 h-32 text-white opacity-[0.03] rotate-12" />
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile

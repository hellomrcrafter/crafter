import { Link } from 'react-router-dom'
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { initializePayment } from '../utils/payment'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Cart = () => {
  const { cart: items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const shipping = subtotal > 1499 || subtotal === 0 ? 0 : 99
  const total = subtotal + shipping

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to proceed to checkout')
      return
    }

    const userName = user.user_metadata?.full_name || 'Valued Customer'
    const userEmail = user.email
    const userContact = '9999999999'

    await initializePayment(total, userName, userEmail, userContact, items, user.id, clearCart)
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-[1100px] mx-auto px-4">

        <header className="flex items-center justify-between mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-2xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            SHOPPING BAG <span className="text-gray-300 font-medium">({items.length} ITEMS)</span>
          </h1>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#282c3f]">
              <ShieldCheck size={16} className="text-green-500" /> 100% SECURE
            </div>
          </div>
        </header>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left Side: Items */}
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 border border-gray-100 rounded-xl relative group hover:shadow-xl hover:shadow-gray-100 transition-all">
                  <div className="w-32 aspect-[3/4] bg-[#f5f5f6] rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.main_image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col pt-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm text-primary uppercase tracking-tight">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-accent transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mb-4">Professional Grade</p>

                    <div className="flex items-center gap-6 mt-auto">
                      <div className="flex items-center bg-[#f5f5f6] rounded px-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-primary font-black hover:text-accent">-</button>
                        <span className="px-3 text-xs font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-primary font-black hover:text-accent">+</button>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-primary">Rs. {item.price * item.quantity}</span>
                        <span className="text-[10px] text-accent font-black">SAVE Rs. {(item.compare_at_price - item.price) * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-6 bg-gray-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-bold text-[#535766]">
                  <Truck size={20} className="text-primary" />
                  <span>Yay! No convenience fee on this order.</span>
                </div>
                <Link to="/" className="text-accent font-black uppercase text-[10px] tracking-widest border-b border-accent/20">Add more from wishlist</Link>
              </div>
            </div>

            {/* Right Side: Summary */}
            <div className="w-full lg:w-[380px]">
              <div className="sticky top-32 space-y-6">
                <div className="bg-white p-8 border border-gray-100 rounded-2xl">
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Price Details ({items.length} Items)</h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between text-sm text-[#282c3f] font-medium">
                      <span>Total MRP</span>
                      <span>Rs. {items.reduce((acc, i) => acc + (i.compare_at_price * i.quantity), 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#282c3f] font-medium">
                      <span>Discount on MRP</span>
                      <span className="text-green-500">-Rs. {items.reduce((acc, i) => acc + ((i.compare_at_price - i.price) * i.quantity), 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#282c3f] font-medium">
                      <span>Shipping Fee</span>
                      <span>{shipping === 0 ? <span className="text-green-500">FREE</span> : `Rs. ${shipping}`}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-black text-primary uppercase tracking-tighter mb-8">
                    <span>Total Amount</span>
                    <span>Rs. {total}</span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={items.length === 0}
                    className="w-full py-4 bg-accent text-white font-black uppercase tracking-[0.2em] rounded shadow-lg shadow-accent/20 hover:bg-[#d4145a] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                  >
                    PLACE ORDER <ArrowRight size={20} />
                  </button>

                  {!user && (
                    <p className="mt-4 text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">Login required to place order</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 opacity-50">
                  <div className="flex flex-col items-center gap-2 text-center text-[10px] font-black uppercase tracking-widest">
                    <RotateCcw size={20} /> 14 Days Return
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center text-[10px] font-black uppercase tracking-widest">
                    <Truck size={20} /> Fast Delivery
                  </div>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100">
              <ShoppingBag size={40} className="text-gray-200" />
            </div>
            <h2 className="text-2xl font-black text-primary uppercase tracking-tighter mb-4">Hey, it feels so light!</h2>
            <p className="text-gray-400 font-medium mb-10">There is nothing in your bag. Let's add some items.</p>
            <Link to="/" className="inline-block py-4 px-12 border-2 border-primary text-primary font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all rounded">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

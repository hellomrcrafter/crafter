import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = isRegistering
        ? await signUp(email, password)
        : await signIn(email, password)

      if (error) throw error
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>

            <div className="p-8 pb-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-primary uppercase tracking-tighter">
                  {isRegistering ? 'Join Mr Crafter' : 'Welcome Back'}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {isRegistering ? 'Create an account to track orders' : 'Login to access your profile'}
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#f5f5f6] border-none py-3 px-4 rounded text-sm focus:ring-1 focus:ring-accent focus:bg-white transition-all outline-none"
                    placeholder="name@example.com"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#f5f5f6] border-none py-3 px-4 rounded text-sm focus:ring-1 focus:ring-accent focus:bg-white transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary mt-4 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (isRegistering ? 'Sign Up' : 'Login')}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="ml-2 text-accent font-black uppercase text-xs tracking-wider border-b-2 border-accent/20 hover:border-accent transition-all"
                  >
                    {isRegistering ? 'Login' : 'Sign Up Now'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal

import { LayoutDashboard, Package, ShoppingBag, Tag, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const AdminLayout = ({ children }) => {
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Inventory', icon: Package, path: '/admin/inventory' },
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Promotions', icon: Tag, path: '/admin/promotions' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-gray-700">
          <Link to="/admin" className="text-xl font-display font-bold tracking-tight">
            MR<span className="text-accent">CRAFTER</span> <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded ml-1 uppercase">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </div>
                {isActive && <ChevronRight size={16} />}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-400/10 w-full transition-all">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout

import { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, ExternalLink } from 'lucide-react'

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock products list
  const products = [
    { id: 1, name: 'Victorian Lantern', category: 'DIY Bases', price: 240, stock: 45, status: 'Active' },
    { id: 2, name: 'Wool Craft Kit', category: 'DIY Kits', price: 950, stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Resin Starter', category: 'Art Forms', price: 1500, stock: 0, status: 'Out of Stock' },
    { id: 4, name: 'Lippan Base', category: 'DIY Bases', price: 450, stock: 89, status: 'Active' },
  ]

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Inventory Management</h1>
          <p className="text-gray-500">Manage your product catalog and stock levels.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} /> Add New Product
        </button>
      </header>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, SKU..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-600 transition-all font-medium">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-8 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                <th className="px-8 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-8 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-8 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200" />
                      <div>
                        <div className="font-semibold text-gray-800">{product.name}</div>
                        <div className="text-xs text-gray-400">#SKU-00{product.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-gray-500 font-medium">{product.category}</td>
                  <td className="px-8 py-6 font-bold text-primary">₹{product.price}</td>
                  <td className="px-8 py-6 font-medium text-gray-600">{product.stock} units</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.status === 'Active' ? 'bg-green-100 text-green-600' :
                        product.status === 'Low Stock' ? 'bg-orange-100 text-orange-600' :
                          'bg-red-100 text-red-600'
                      }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-accent transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventory

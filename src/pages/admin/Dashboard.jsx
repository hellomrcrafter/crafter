import { TrendingUp, Users, DollarSign, Package, ShoppingBag, Database } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { seedDatabase } from '../../utils/seed'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [isSeeding, setIsSeeding] = useState(false)
  const [seedMessage, setSeedMessage] = useState(null)

  const handleSeed = async () => {
    setIsSeeding(true)
    const result = await seedDatabase()
    if (result.success) {
      setSeedMessage('Successfully seeded database!')
    } else {
      setSeedMessage('Error: ' + result.error)
    }
    setIsSeeding(false)
    setTimeout(() => setSeedMessage(null), 5000)
  }
  const stats = [
    { name: 'Total Revenue', value: '₹45,230', trend: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Active Orders', value: '24', trend: '+3 new', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Customers', value: '1,240', trend: '+18%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Inventory Items', value: '156', trend: '5 low stock', icon: Package, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue (₹)',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      borderColor: '#d4af37',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const barData = {
    labels: ['DIY Kits', 'Bases', 'Art Supplies', 'Art Forms', 'Other'],
    datasets: [{
      label: 'Sales by Category',
      data: [45, 30, 20, 15, 10],
      backgroundColor: '#343a40',
      borderRadius: 8
    }]
  }

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-primary">Overview</h1>
          <p className="text-gray-500">Welcome back, Captain. Here's what's happening today.</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleSeed}
            disabled={isSeeding}
            className="btn-primary py-2 px-4 text-xs flex items-center gap-2"
          >
            <Database size={14} /> {isSeeding ? 'Seeding...' : 'Seed Database'}
          </button>
          {seedMessage && (
            <span className={`text-[10px] font-bold uppercase tracking-widest ${seedMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {seedMessage}
            </span>
          )}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className={`text-sm font-bold ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold text-primary">{stat.value}</h3>
            </motion.div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-primary mb-6">Revenue Growth</h2>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-primary mb-6">Category Distribution</h2>
          <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-primary mb-6">Recent Best Sellers</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-lg border border-gray-200" />
                <div>
                  <h4 className="font-semibold text-gray-800">Victorian Lantern #{i}</h4>
                  <p className="text-xs text-gray-400">Sold 12 units today</p>
                </div>
              </div>
              <span className="font-bold text-primary">₹{(i + 1) * 240}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

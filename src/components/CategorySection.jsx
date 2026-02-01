import { motion } from 'framer-motion'

const categories = [
  { name: 'DIY Bases', image: 'https://handilane.com/cdn/shop/files/victorian-lantern-without-light.jpg?v=1700204735' },
  { name: 'DIY Kits', image: 'https://handilane.com/cdn/shop/files/wool-craft-diy-kits.jpg?v=1700204735' },
  { name: 'Art Forms', image: 'https://handilane.com/cdn/shop/files/resin-art-starter-kit.jpg?v=1700204735' },
  { name: 'Craft Supplies', image: 'https://handilane.com/cdn/shop/files/lippan-art-base.jpg?v=1700204735' },
  { name: 'Clearance', image: 'https://handilane.com/cdn/shop/files/sale-banner_1.jpg?v=1700204735' },
]

const CategorySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="text-2xl font-black text-[#282c3f] mb-10 tracking-[0.2em] uppercase text-center md:text-left">
          Shop By <span className="text-accent">Category</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer text-center"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-100 ring-4 ring-white group-hover:ring-accent/20 transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-[#282c3f] text-sm uppercase tracking-wider">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative h-[65vh] md:h-[80vh] flex items-center bg-[#f5f5f6] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-[#535766] font-medium tracking-[0.2em] uppercase text-sm mb-4 italic">The Craft Collective</h2>
            <h1 className="text-5xl md:text-7xl font-black text-[#282c3f] mb-8 leading-[1.1] tracking-tighter">
              MADE FOR <br />
              <span className="text-accent underline decoration-8 underline-offset-8">THE ARTIST</span><br />
              IN YOU.
            </h1>
            <p className="text-lg md:text-xl text-[#7e818c] mb-10 max-w-md leading-relaxed">
              Premium DIY kits & handcrafted essentials.
              Elevate your creativity with our professional-grade collection.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="btn-primary">
                Explore Best Sellers
              </button>
              <button className="btn-outline">
                New Arrivals
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="aspect-[4/5] bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 border-8 border-white ring-1 ring-gray-100">
              <img
                src="https://handilane.com/cdn/shop/files/wool-craft-diy-kits.jpg?v=1700204735"
                alt="Crafting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#282c3f]/80 to-transparent p-10">
                <p className="text-white text-3xl font-black italic tracking-tighter">CRAFTING MAGIC</p>
                <div className="w-12 h-1 bg-accent mt-2" />
              </div>
            </div>

            {/* Decal Background */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          </motion.div>

        </div>
      </div>

      {/* Brand Watermark */}
      <div className="absolute bottom-10 right-[-5%] text-[15vh] font-black text-[#282c3f]/[0.02] select-none pointer-events-none uppercase tracking-tighter">
        MR CRAFTER
      </div>
    </section>
  )
}

export default Hero

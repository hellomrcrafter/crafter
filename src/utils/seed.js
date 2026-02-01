import { supabase } from '../lib/supabase'

const SEED_CATEGORIES = [
  { name: 'DIY Bases', slug: 'diy-bases' },
  { name: 'DIY Kits', slug: 'diy-kits' },
  { name: 'Art Forms', slug: 'art-forms' },
  { name: 'Craft Supplies', slug: 'craft-supplies' },
  { name: 'Clearance Sale', slug: 'clearance-sale' },
]

const SEED_PRODUCTS = [
  {
    name: 'Victorian Lantern Base',
    slug: 'victorian-lantern-base',
    description: 'A beautiful handcrafted Victorian lantern base, perfect for DIY coloring and decoration. Made from premium quality MDF.',
    price: 240,
    compare_at_price: 360,
    sku: 'CLS280',
    category_slug: 'diy-bases',
    main_image_url: 'https://handilane.com/cdn/shop/files/victorian-lantern-without-light.jpg?v=1700204735',
    stock_quantity: 45
  },
  {
    name: 'Wool Craft DIY Kit',
    slug: 'wool-craft-diy-kit',
    description: 'Complete wool craft kit for beginners. Includes high-quality wool, needles, and a detailed instruction manual.',
    price: 950,
    compare_at_price: 1200,
    sku: 'WCK001',
    category_slug: 'diy-kits',
    main_image_url: 'https://handilane.com/cdn/shop/files/wool-craft-diy-kits.jpg?v=1700204735',
    stock_quantity: 20
  },
  {
    name: 'Resin Art Starter Kit',
    slug: 'resin-art-starter-kit',
    description: 'Everything you need to start your resin art journey. Premium crystal clear resin, pigments, and molds.',
    price: 1500,
    compare_at_price: 1800,
    sku: 'RAK002',
    category_slug: 'art-forms',
    main_image_url: 'https://handilane.com/cdn/shop/files/resin-art-starter-kit.jpg?v=1700204735',
    stock_quantity: 15
  },
  {
    name: 'Lippan Art Base (12in)',
    slug: 'lippan-art-base-12in',
    description: 'Quality MDF base for Lippan art. Smooth surface for perfect clay work and mirror placement.',
    price: 450,
    compare_at_price: 600,
    sku: 'LAB012',
    category_slug: 'craft-supplies',
    main_image_url: 'https://handilane.com/cdn/shop/files/lippan-art-base.jpg?v=1700204735',
    stock_quantity: 30
  }
]

export const seedDatabase = async () => {
  try {
    console.log('Starting seed...')

    // 1. Seed Categories
    const { data: catData, error: catErr } = await supabase
      .from('categories')
      .upsert(SEED_CATEGORIES, { onConflict: 'slug' })
      .select()

    if (catErr) throw catErr
    console.log('Categories seeded:', catData)

    // 2. Map category slugs to IDs
    const categoryMap = catData.reduce((acc, cat) => ({ ...acc, [cat.slug]: cat.id }), {})

    // 3. Seed Products
    const productsToSeed = SEED_PRODUCTS.map(p => {
      const { category_slug, ...productData } = p
      return {
        ...productData,
        category_id: categoryMap[category_slug]
      }
    })

    const { data: prodData, error: prodErr } = await supabase
      .from('products')
      .upsert(productsToSeed, { onConflict: 'slug' })
      .select()

    if (prodErr) throw prodErr
    console.log('Products seeded:', prodData)

    return { success: true, categories: catData, products: prodData }
  } catch (err) {
    console.error('Seed failed:', err)
    return { success: false, error: err.message }
  }
}

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useProducts = (categorySlug = null) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            categories (
              name,
              slug
            )
          `)
          .eq('is_active', true)

        if (categorySlug) {
          // First get the category ID
          const { data: catData } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', categorySlug)
            .single()

          if (catData) {
            query = query.eq('category_id', catData.id)
          }
        }

        const { data, error: err } = await query
        if (err) throw err
        setProducts(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug])

  return { products, loading, error }
}

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*')
      setCategories(data || [])
      setLoading(false)
    }
    fetchCategories()
  }, [])

  return { categories, loading }
}

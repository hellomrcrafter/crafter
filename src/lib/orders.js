import { supabase } from './supabase'

export const createOrder = async (userId, cart, totalAmount, paymentId) => {
  try {
    // 1. Insert into orders table
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        payment_intent_id: paymentId,
        status: 'paid', // Assuming payment succeeded if this is called
        shipping_address: { dummy: true, message: 'Address collection to be implemented' }
      })
      .select()
      .single()

    if (orderError) throw orderError

    // 2. Insert order items
    const orderItems = cart.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    // 3. Update stock quantities (Omitted for simplicity in this step, but recommended)

    return { success: true, order }
  } catch (err) {
    console.error('Error creating order:', err)
    return { success: false, error: err.message }
  }
}

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
        *,
        order_items (
          *,
          products (*)
        )
      `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

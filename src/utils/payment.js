import { createOrder } from '../lib/orders'
import { supabase } from '../lib/supabase'

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initializePayment = async (amount, name, email, contact, cart, userId, clearCartCallback) => {
  const res = await loadRazorpay()

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?')
    return
  }

  const options = {
    key: 'rzp_test_YourKeyHere', // Replace with your actual Test Key ID
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Mr Crafter',
    description: 'Payment for your crafting essentials',
    image: 'https://placeholder.com/150', // Replace with your logo
    handler: async function (response) {
      console.log('Payment Successful:', response.razorpay_payment_id)

      // Save order to Supabase
      if (userId && cart) {
        const result = await createOrder(userId, cart, amount, response.razorpay_payment_id)
        if (result.success) {
          alert('Order placed successfully! Check your profile for history.')
          if (clearCartCallback) clearCartCallback()
        } else {
          alert('Payment succeeded but order recording failed: ' + result.error)
        }
      } else {
        alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id)
      }
    },
    prefill: {
      name: name,
      email: email,
      contact: contact,
    },
    notes: {
      address: 'Mr Crafter Corporate Office',
    },
    theme: {
      color: '#ff3f6c', // Myntra-style pink
    },
  }

  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}

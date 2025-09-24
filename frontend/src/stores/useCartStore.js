import { create } from 'zustand'
import API from '../utils/api'
import toast from 'react-hot-toast'
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_51Rqcq7Arl3CDhdl3iNZDWM41k15Ui01A6n8106L0JliKoQqwnMBSRxyrQjPBM0fapoSy6xDHPrQPBiBdZJc75nex002xfMFevF")

const useCartStore = create((set, get) => ({
    cart: [],
    total: 0,
    subtotal: 0,
    coupon: null,
    isCouponValid: false,
    loading: false,

    getCartItems: async () => {
        try {
            const res = await API.get('/cart')
            set({ cart: res.data })
            get().calculateTotal()
        } catch (error) {
            console.log('Error fetching cart products: ', error)
            // toast.error(error.response.data.message || 'Error fetching cart products')
        }
    },

    addToCart: async (product) => {
        try {
            await API.post(`/cart`, { productId: product._id })
            set((prevState) => {
                const existingItem = prevState.cart.find((item) => item._id === product._id) 
                const newCart = existingItem 
                    ? prevState.cart.map((item) => 
                        item._id === product._id ? {...item, quantity: item.quantity + 1} : item
                    )
                    : [...prevState.cart, {...product, quantity: 1}] 
                return { cart: newCart }
            })
            get().calculateTotal()
            toast.success('Product added successfully')
        } catch (error) {
            console.log('Error adding product to cart: ', error)
            toast.error(error.response.data.message || 'Error adding product to cart')
        }
    },

    removeFromCart: async (productId) => {
        try {
            await API.delete('/cart', { 
                data: { productId }
            })
            set((prevState) => {
                const newCart = prevState.cart.filter((item) => item._id !== productId)
                return { cart: newCart }
            })
            get().calculateTotal()
            toast.success('Product deleted sucessfully')
        } catch (error) {
            console.log('Error deleting product from cart: ', error)
            toast.error(error.response.data.message || 'Error deleting product from cart')
        }
    },

    updateItemQuantity: async (productId, quantity) => {
        try {
            if(quantity === 0) {
                get().removeFromCart(productId)
                return
            }

            await API.put(`/cart/${productId}`, { quantity })
            set((prevState) => {
                const newCart = quantity
                    ? prevState.cart.map((item) => item._id === productId
                        ? {...item, quantity}
                        : item
                    )
                    : removeFromCart()
                return { cart: newCart }
            })
            get().calculateTotal()
        } catch (error) {
            console.log('Error updating product quantity: ', error)
            toast.error(error.response.data.message || 'Error updating product quantity')
        }
    },

    calculateTotal: () => {
        const { cart, coupon } = get()
        let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        let total = subtotal

        if(coupon) {
            let discount = subtotal * (coupon.discountPercentage / 100)
            total = subtotal - discount
        }

        set({ total, subtotal })
    },

    getCoupon: async () => {
        try {
            const res = await API.get('/coupons')
            set({ coupon: res.data })
        } catch (error) {
            console.log('Error fetching discount coupon: ', error)
            toast.error(error.response.data.message || 'Error fetching discount coupon')
        }
    },

    applyCoupon: async (code, subtotal) => {
        try {
            if(subtotal < 500) {
                toast.error('Cart total must be at least ₹500 to apply coupon')
                return
            }
            // console.log('Applying coupon: ', code)
            const res = await API.post(`/coupons/validate`, { code })
            // console.log(res.data)
            set({ coupon: res.data, isCouponValid: true })
            get().calculateTotal()
            toast.success('Coupon applied successfully')
        } catch (error) {
            toast.error(error.response.data.message || 'Failed to apply coupon')
        }
    },

    removeCoupon: async () => {
        try {
            set({ coupon: null, isCouponValid: false })
            get().calculateTotal()
            toast.success('Coupon removed successfully')
        } catch (error) {
            toast.error('Coupon not removed')
        }
    },

    clearCart: async (userId) => {
        try {
            await API.delete('/cart', { 
                data: { userId }
            })
            set({
                cart: [],
                total: 0,
                subtotal: 0,
                coupon: null,
            })
        } catch (error) {
            console.log('Error clearing cart items: ', error)
        }
    },

    paymentCheckout: async (couponCode) => {
        try {
            // console.log('Initiating payment checkout...', couponCode)
            set({ loading: true })
            const cart = get().cart 
            const coupon = get().coupon

            const stripe = await stripePromise
            // console.log('stripe: ', stripe)
            const res = await API.post('/payments/create-checkout-session', {
                products: cart,
                couponCode: couponCode ? coupon?.code : null
            })

            // console.log("response: ", res.data)
            const session = res.data
            await stripe.redirectToCheckout({
                sessionId: session.sessionId,
            })
            // get().clearCart()
            set({ loading: false })
        } catch (error) {
            set({ loading: false })
            console.log('Error in payment checkout: ', error)
        }
    },

}))

export default useCartStore
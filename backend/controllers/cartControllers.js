import Product from '../models/product.js'
import User from '../models/user.js'

export const getCartProducts = async (req, res) => {
    try {

        // not working properly
        const user = req.user
        console.log('user: ', user)
        const products = await Product.find({ _id: { $in: user.cartItems.map((item) => item.id) }})

        console.log('products: ', products)
        console.log('user CartItems: ', user.cartItems)

        const cartItems = products.map((product) => {
            const item = user.cartItems.find((cartItem) => cartItem.id === product.id)
            return {
                ...product.toJSON(),
                quantity: item.quantity,
            }
        })

        console.log('cartItems: ', cartItems)

        res.json(cartItems)
    } catch (error) {
        console.log("Error in getting cart products:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body
        console.log('product Id: ' ,productId)
        const user = req.user
        console.log('user: ' ,user)

        let existingProduct = user.cartItems?.find((item) => item.id === productId)
        console.log('cart:', user.cartItems)

        if(existingProduct) {
            existingProduct.quantity += 1
        } else {
            user.cartItems.push(productId)
        }

        console.log('user: ', user)

        await user.save()
        res.json(user.cartItems)
    } catch (error) {
        console.log("Error in addToCart controller:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const updateQuantity = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body
        const user = req.user

        const existingProduct = user.cartItems.find((item) => item.id === productId)
        if(existingProduct) {
            if(quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId)
                await user.save()
                return res.json(user.cartItems)
            } 
            existingProduct.quantity = quantity
            await user.save()
            return res.json(user.cartItems)
        } else {
            return res.status(404).json(user.cartItems)
        }
    } catch (error) {
        console.log("Error updating quantity of item:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const removeAllItems = async (req, res) => {
    try {
        const { productId } = req.body
        const user = req.user

        if(!productId) {
            user.cartItems = []
        } else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId)
        }

        await user.save()
        return res.json(user.cartItems)
    } catch (error) {
        console.log("Error in removing item from cart:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}

export const clearCart = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if(!user) {
            return res.json({
                message: 'User not found'
            })
        }

        user.cartItems = []
        await user.save()
        return res.status(200).json({
            message: 'Cart cleared successfully'
        })
    } catch (error) {
        console.log('Error clearing cart items: ', error)
        return res.status(500).json({
            message: 'Server Error',
            error: error.message,
        })
    }
}

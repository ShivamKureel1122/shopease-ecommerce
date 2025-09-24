import express from 'express'

import { protectRoute } from '../middlewares/auth.js'
import { 
    addToCart, 
    getCartProducts, 
    removeAllItems, 
    updateQuantity,
    clearCart,
} from '../controllers/cartControllers.js'

const router = express.Router()

router.get('/', protectRoute, getCartProducts)
router.post('/', protectRoute, addToCart)
router.put('/:id', protectRoute, updateQuantity)
router.delete('/', protectRoute, removeAllItems)
router.delete('/:id', protectRoute, clearCart)

export default router
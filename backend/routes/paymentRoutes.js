import express from 'express'
import { checkoutSuccess, createCheckoutSession } from '../controllers/paymentControllers.js'
import { protectRoute } from '../middlewares/auth.js'

const router = express.Router()

router.post('/create-checkout-session', protectRoute, createCheckoutSession)
router.post('/checkout-success', protectRoute, checkoutSuccess)

export default router
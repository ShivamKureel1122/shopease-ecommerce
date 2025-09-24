import express from 'express'
import { adminRoute, protectRoute } from '../middlewares/auth.js'
import {
    getAllProducts, 
    createProduct, 
    deleteProduct, 
    toogleFeaturedProduct, 
    getProductsByCategory, 
    getRecommendedProducts,
    getFeaturedProducts,
} from '../controllers/productControllers.js'

const router = express.Router()

router.get('/', protectRoute, adminRoute, getAllProducts)
router.post('/', protectRoute, adminRoute, createProduct)
router.post('/:id', protectRoute, adminRoute, toogleFeaturedProduct)
router.delete('/:id', protectRoute, adminRoute, deleteProduct)

router.get('/category/:category', getProductsByCategory)
router.get('/recommendations', getRecommendedProducts)
router.get('/featured', getFeaturedProducts)

export default router
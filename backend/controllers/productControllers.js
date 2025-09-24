import Product from '../models/product.js'
import cloudinary from '../lib/cloudinary.js'
import { redis } from '../lib/redis.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean()
        res.json({ products })
    } catch (error) {
        console.log("Error in getting all products:", error)
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category, image } = req.body
        let cloudinaryResponse = null

        if(image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products"})
        }

        const product = await Product.create({
            name,
            description,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            price,
            category
        })

        res.status(201).json(product)
    } catch (error) {
        console.log("Error in creating new product:", error.message)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        console.log(productId)
        const product = await Product.findById(productId)
        console.log(product)

        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        if(product.image) {
            // extracting public id of image from its url
            const publicId = product.image.split('/').pop().split('.')[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log('Image deleted from cloudinary')
            } catch (error) {
                console.log("Error deleting image from cloudinary:", error)
                return res.status(500).json({
                    message: "Error deleting image from cloudinary"
                })
            }
        }

        await Product.findByIdAndDelete(productId)
        await updateFeaturedProductsCache()

        res.json({
            message: 'Product deleted successfully'
        })
    } catch (error) {
        console.log('Error in deleting product:', error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: {
                    size: 4,
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                }
            }
        ])

        res.json(products)
    } catch (error) {
        console.log("Error in getting recommendations:", error)

        res.status(500).json({
            message: "Error in getting recommendations",
            error: error.message
        })
    }
}


export const getProductsByCategory = async (req, res) => {
    const { category } = req.params
    // console.log(category)
    try {
        const products = await Product.find({ category })
        // console.log(products)
        if(!products) {
            return res.status(404).json({
                message: "Products not found"
            })
        }

        res.json({ products })
    } catch (error) {
        console.log("Error in fetching products by category:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const toogleFeaturedProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)

        if(!product) {
            res.status(404).json({
                message: "Product not found"
            })
        }

        product.isFeatured = !product.isFeatured
        const updatedProduct = await product.save()
        await updateFeaturedProductsCache()
        res.json(updatedProduct)

    } catch (error) {
        console.log("Error toggling featured product:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


async function updateFeaturedProductsCache() {
    try {
        const featuredProducts = await Product.find({ isFeatured: true })
        console.log(featuredProducts)
        await redis.set("featured_products", JSON.stringify(featuredProducts))
    } catch (error) {
        console.log("Error updating featured products cache:", error)
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await redis.get("featured_products")
        console.log("featured products: ", featuredProducts)
        if(featuredProducts) {
            return res.json(featuredProducts)
        }

        featuredProducts = await Product.find({ isFeatured: true })

        if(!featuredProducts) {
            return res.status(404).json({
                message: "No featured products found"
            })
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts))
        res.json({ featuredProducts })
    } catch (error) {
        console.log("Error in getting featured products:", error)
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }

}

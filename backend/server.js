import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
// import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import couponRoutes from './routes/couponRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import { connectDB } from './lib/dbConnect.js'
import { createAdminIfNotExists } from './lib/createAdmin.js'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5000

// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }))
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/payments', paymentRoutes)

const startServer = async () => {
    try {
        await connectDB()
        await createAdminIfNotExists()

        app.listen(PORT, () => {
            console.log('server is running on http://localhost:' + PORT)
        })
    } catch (error) {
        console.log('Error: Server startup failed.', error)
    }
}

startServer()


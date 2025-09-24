import User from "../models/user.js"
// import dotenv from 'dotenv'

// dotenv.config()

export const createAdminIfNotExists = async () => {
    const adminExists = await User.findOne({ role: "admin" }) 

    if(!adminExists) {
        // const password = bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        await User.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            cartItems: [],
            role: "admin",
        })

        console.log('Admin created from environment variables')
    } 
} 
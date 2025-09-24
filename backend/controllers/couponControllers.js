import Coupon from "../models/coupon.js"

export const getCoupon = async (req, res) => {
    try {
        const user = req.user
        const coupon = await Coupon.findOne({
            userId: user._id,
            isActive: true
        })
        res.json(coupon || null)
    } catch (error) {
        console.log("Error in getCoupon controller:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}


export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body
        const user = req.user

        console.log('Validating coupon code: ', code)
        console.log('For user: ', user._id)
        const coupon = await Coupon.findOne({
            userId: user._id,
            code: code,
            isActive: true,
        })

        if(!coupon) {
            return res.status(404).json({
                message: "Coupon not found"
            })
        }

        if(coupon.expirationDate < new Date()) {
            coupon.isActive = false
            await coupon.save()
            return res.status(404).json({
                message: "Coupon expired"
            })
        }

        res.json(coupon)
        // res.json({
        //     message: "coupon valid",
        //     code: coupon.code,
        //     discountPercentage: coupon.discountPercentage,
        // })
    } catch (error) {
        console.log("Error in validateCoupon controller:", error)

        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}
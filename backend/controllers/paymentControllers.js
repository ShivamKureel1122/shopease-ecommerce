import dotenv from 'dotenv'

import Coupon from '../models/coupon.js'
import Order from '../models/order.js'
import { stripe } from '../lib/stripe.js'
import currency from 'currency.js'

dotenv.config()
const INR_TO_USD = 0.011
const USD_TO_INR = 88.09

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT10",
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // valid till 30 days from now
		userId: userId,
		description: "Save 10% off on orders above ₹500",
	});
	console.log('Coupon: ' ,newCoupon)

	await newCoupon.save();
	console.log('Coupon created and saved successfully')

	return newCoupon;
}

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body
		console.log('products: ', products)
		console.log('coupon: ', couponCode)

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ 
                error: "Invalid or empty products array" 
            });
		}

        let totalAmount = 0

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100) // rupees to paise
			totalAmount += amount * product.quantity

			return {
				price_data: {
					currency: "inr",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			}
		})

        let coupon = null
		if (couponCode) {
			coupon = await Coupon.findOne({ 
                code: couponCode, 
                userId: req.user._id, 
                isActive: true 
            })
			if (coupon) {
				// totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100)
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100)
			}
		}

		console.log("Total Amount: ", totalAmount) // in paise

        const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-failed`,
			discounts: coupon
				? [
						{
							coupon: await createStripeCoupon(coupon.discountPercentage),
						},
				  ]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		})


        // if total amount is greater than $200 then generate a gift coupon 
        if (totalAmount >= 500000) {
			await createNewCoupon(req.user._id)
			console.log('new coupon created')
		}

        res.status(200).json({
            sessionId: session.id,
            totalAmount: totalAmount / 100
        })
    } catch (error) {
        console.log("Error processing checkout:", error)

        res.status(500).json({
            message: "Error processing checkout",
            error: error.message
        })
    }
}


export const checkoutSuccess = async (req, res) => {
    try {
		console.log('function called')

        const { sessionId } = req.body
		const session = await stripe.checkout.sessions.retrieve(sessionId)

		console.log('Stripe session:', session)

        if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: session.metadata.couponCode,
						userId: session.metadata.userId,
					},
					{
						isActive: false,
					}
				)
			}

			// create a new Order
			const products = JSON.parse(session.metadata.products)
			const newOrder = new Order({
				userId: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, //inr to paise
				stripeSessionId: sessionId,
			})

			await newOrder.save()

			console.log('order saved to DB')

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
				amount: session.amount_total / 100,
			})
		} else {
			console.log("payment status - not paid")
            res.status(400).json({
                message: "payment status - not paid"
            })
        }
    } catch (error) {
        console.log("Error processing successful checkout:", error)

        res.status(500).json({
            message: "Error processing successful checkout",
            error: error.message
        })
    }
}

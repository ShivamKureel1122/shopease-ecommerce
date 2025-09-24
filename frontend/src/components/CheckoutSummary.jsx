import { useNavigate } from "react-router-dom"
import useCartStore from "../stores/useCartStore"
import FullScreenLoader from "./FullScreenLoader.jsx"
import { useEffect, useState } from "react"
import Coupon from '../components/Coupon.jsx'

const CheckoutSummary = () => {
  const {
    subtotal,
    total,
    paymentCheckout,
    loading,
    coupon, 
    getCoupon,
    applyCoupon,
    removeCoupon,
  } = useCartStore()

  // const loading = true

  const navigate = useNavigate()
  const discount = subtotal - total
  const formattedDiscount = discount.toFixed(2)
  const formattedTotal = total.toFixed(2)
  const formattedSubtotal = subtotal.toFixed(2)

  const [appliedCoupon, setAppliedCoupon] = useState("")
  const [couponCode, setCouponCode] = useState("")
  const [renderCoupon, setRenderCoupon] = useState(false)

  useEffect(() => {
    getCoupon()
  }, [])

  const handleApply = async (codeApplied) => {
    if(codeApplied) {
      setAppliedCoupon(couponCode)
      // console.log('Applying coupon: ', couponCode)
      await applyCoupon(couponCode, subtotal)
    }
  } 

  const handleRemove = async () => {
    setCouponCode("")
    setAppliedCoupon("")
    await removeCoupon()
  }

  const handleSelectCoupon = (code) => {
    if(couponCode) {
      setCouponCode("")
    } else {
      setCouponCode(code)
    }
  }

  // console.log('Code applied:', appliedCoupon)
  // console.log('Coupon in store:', coupon)

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-4">
      { loading && <FullScreenLoader text={'Processing...'} /> }

      <h2 className="text-xl font-semibold text-gray-700">Order Summary</h2>

      <div className="space-y-2 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{formattedSubtotal}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount</span>
            <span>- ₹{formattedDiscount}</span>
          </div>
        )}
        <div className="border-t border-gray-200 my-2"></div>
        <div className="flex justify-between text-lg font-medium text-gray-900">
          <span>Payable Amount</span>
          <span>₹{formattedTotal}</span>
        </div>
      </div>

      {/* coupon code input */}
      <div>
        <div className="flex items-center space-x-3 mt-10">
          <input
            type="text"
            value={couponCode}
            placeholder="Enter coupon code"
            className="flex-1 border border-gray-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            disabled={appliedCoupon}
          />
          {!appliedCoupon ? (
            <button
              onClick={handleApply}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition hover:cursor-pointer"
            >
              Apply
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition hover:cursor-pointer"
            >
              Remove
            </button>
          )}
        </div>

        <p className="text-md mt-2 text-purple-900 hover:underline hover:cursor-pointer hover:decoration-indigo-900 hover:decoration-1"
        onClick={() => setRenderCoupon(true)}
        >
          Available Coupons
        </p>

        { renderCoupon && (
          coupon ? ( 
            <Coupon coupon={coupon} onSelect={handleSelectCoupon} isSelected={couponCode === coupon.code} /> 
          ) : ( 
            <p className="text-md text-red-600">No coupons available.</p> 
          ))
        }
      </div>

      <button
        className= "w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl shadow transition duration-200 hover:cursor-pointer mt-2"
        onClick={() => paymentCheckout(appliedCoupon)}
      >
        Proceed to checkout
      </button>

      <p className="text-center text-sm text-gray-500">
        Want to shop more?{" "}
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 font-medium hover:underline hover:cursor-pointer"
        >
          Continue Shopping
        </button>
      </p>
    </div>
  )
}

export default CheckoutSummary

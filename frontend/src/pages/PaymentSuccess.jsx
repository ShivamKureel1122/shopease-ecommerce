import { CheckCircle2 } from "lucide-react"; // success icon
import { useNavigate } from "react-router-dom";
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import { useSearchParams } from "react-router-dom";
import API from '../utils/api.js'
import { useUserStore } from "../stores/useUserStore.js";

const PaymentSuccess = () => {
  const [orderDetails, setorderDetails] = useState({
    orderId: "",
    amount: 0,
  })
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { clearCart } = useCartStore()
  const { user } = useUserStore()

  useEffect(() => {
    const handlePaymentSuccess = async (sessionId) => {
      try {
      // console.log('before API call')
        const res = await API.post('/payments/checkout-success', {
          sessionId
        })
      // console.log(res.data)
      // console.log(res.data.amount)
      // console.log(res.data.orderId)
      // console.log('after API call')
        clearCart(user._id)
        setorderDetails({
          orderId: res.data.orderId,
          amount: res.data.amount,
        })
      } catch (error) {
        console.log('Error handling payment success', error)
      }
    }

    // const sessionId = new URLSearchParams(window.location.search).get("session_id")
    const sessionId = searchParams.get("session_id")
    if(sessionId) {
      handlePaymentSuccess(sessionId)
    } else {
      console.log('Session Id is not provided in URL')
    }

  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center space-y-6">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle2 className="text-green-500 w-16 h-16" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl text-green-500 font-bold ">
          Payment Successful
        </h2>

        {/* Catchy Line */}
        <p className="text-gray-600">
          Thank you for your purchase! Your payment has been received securely.
        </p>

        {/* Payment Details */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-left space-y-2">
          <div className="flex-cols-1">
            <div className="flex flex-cols-2">
              <span className="w-1/2 font-medium text-gray-700">Order ID</span>
              <span className="w-1/2">{orderDetails?.orderId}</span>
            </div>
            <div className="flex flex-cols-2 pt-1">
              <span className="w-1/2 font-medium text-gray-700">Amount Paid</span>
              <span className="w-1/2" >₹ {orderDetails?.amount.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {/* Home Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition duration-200 hover:cursor-pointer"
        >
          Continue Shopping <ArrowRight className='inline h-6 w-6 pl-1' />
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccess

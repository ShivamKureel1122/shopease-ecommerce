import { XCircle } from "lucide-react"; // error icon
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  // const [amount, setAmount] = useState(null)

  useEffect(() => {
    const sessionId = searchParams.get("session_id")
    console.log('Session ID from URL:', sessionId)
    // setAmount(sessionId.amount_total)
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center space-y-6">
        
        {/* Error Icon */}
        <div className="flex justify-center">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800">
          Payment Failed
        </h2>

        {/* Catchy Line */}
        <p className="text-gray-600">
          Oops! Something went wrong while processing your payment.  
          Don’t worry you can try again or choose another payment method.
          If payment is deducted, it will be refunded within 5-7 business days.
        </p>

        {/* Payment Details */}
        {/* {amount && (
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-left space-y-2">
            <p>
              <span className="font-medium text-gray-700">Amount: </span>
              ₹{amount.toFixed(2)}
            </p>
            <p>
              <span className="font-medium text-gray-700">Order ID: </span>
              {orderId}
            </p>
          </div>
        )} */}

        {/* Actions */}
        <div className="">
          {/* <button
            onClick={() => navigate("/payment")}
            className="w-1/2 bg-red-600 text-white py-3 rounded-xl shadow hover:bg-red-700 transition duration-200 hover:cursor-pointer"
          >
            Retry Payment
          </button> */}

          <button
            onClick={() => navigate("/")}
            className="w-1/2 bg-gray-200 text-gray-700 py-3 rounded-xl shadow hover:bg-gray-300 transition duration-200 hover:cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;

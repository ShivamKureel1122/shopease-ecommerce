const CartSummary = ({ subtotal, totalQuantity }) => {
  return (
    <div className="mt-6 p-5 bg-gray-100 rounded-xl flex justify-end items-center">
      <p className="text-gray-700 text-lg mr-2">
        Subtotal ({totalQuantity} items):
      </p>
      <p className="text-xl font-bold text-gray-900">&#8377; {subtotal}</p>
    </div>
  )
}

export default CartSummary

import useCartStore from "../stores/useCartStore"
import { useUserStore } from "../stores/useUserStore"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"

const ProductCard = ({ product, role }) => {
  const { addToCart } = useCartStore()
  const { user } = useUserStore()
  const navigate = useNavigate()

  const [productId, setProductId] = useState(true)
  // const [loading, setLoading] = useState(false)

  const handleAddItem = async (productId) => {
    if(!user) {
      navigate('/login')
    }
    setProductId(product._id)
    await addToCart(productId)
    setProductId(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-54 object-contain"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">&#8377; {product.price}</p>
        <button
          onClick={() => handleAddItem(product)}
          className={`mt-3 h-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white
          rounded-md flex justify-center items-center transition duration-300 ease-in-out border-indigo-600 font-medium hover:cursor-pointer`}
          disabled={role==='admin'}
        >
          {
            productId === product._id
              ? <LoaderCircle className="animate-spin h-5 w-5 text-white" />
              : 'Add to Cart'
          }
        </button>
      </div>
    </div>
  )
}

export default ProductCard

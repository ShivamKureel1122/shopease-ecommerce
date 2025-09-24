import { useState } from "react"
import useProductStore from "../stores/useProductStore"
import { LoaderCircle } from 'lucide-react'

const AdminProductCard = ({ product, onToggleFeatured }) => {
    const { deleteProduct } = useProductStore()
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [featuredLoading, setFeaturedLoading] = useState(false)
    const [currProductId, setCurrProductId] = useState('')

    const onDelete = async (productId) => {
      setCurrProductId(productId)
      setDeleteLoading(true)
      // console.log(productId)
      try {
        await deleteProduct(productId)
        setDeleteLoading(false)
        setCurrProductId('')
      } catch (error) {
        setDeleteLoading(true)
        setCurrProductId('')
        console.log('Error occurrd: ', error)
      }
    }

    const onToggle = async (productId) => {
      setCurrProductId(productId)
      setFeaturedLoading(true)
      try {
        await onToggleFeatured(productId)
        setFeaturedLoading(false)
        setCurrProductId('')
      } catch (error) {
        setFeaturedLoading(false)
        setCurrProductId('')
        console.log('Error occurrd: ', error)
      }
    } 

  return (
    <div className="flex items-center justify-between rounded-lg p-4 shadow-md mb-4 bg-white">
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-contain rounded-md"
        />
      </div>

      <div className="flex-1 px-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">&#8377; {product.price}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onToggle(product._id)}
          className={`py-1 rounded hover:cursor-pointer ${
            product.isFeatured
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 text-gray-700"
          } ${
            !featuredLoading 
              ? 'px-3' 
              : 'px-10'
          }`}
        >
          {
            featuredLoading && currProductId === product._id
              ? <LoaderCircle className="animate-spin h-5 w-5 text-gray-500"/> 
              : product.isFeatured ? "★ Featured" : "☆ Feature"
          }
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className={`py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer ${
            deleteLoading ? 'px-7' : 'px-3'
          }`}
        >
          {
            deleteLoading && currProductId === product._id
              ? <LoaderCircle className="animate-spin h-5 w-5 text-gray-500"/> 
              : 'Delete'
          }
        </button>
      </div>
    </div>
  )
}

export default AdminProductCard
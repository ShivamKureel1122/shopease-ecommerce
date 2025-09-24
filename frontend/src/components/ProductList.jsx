import { useEffect, useState } from "react"
import useProductStore from '../stores/useProductStore'
import AdminProductCard from "./AdminProductCard"

const ProductList = () => {
    const { products, toogleFeaturedProduct } = useProductStore()
    const [filterCategory, setFilterCategory] = useState('home')
    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        setFilteredProducts(products.filter((p) => p.category === filterCategory))
    }, [filterCategory, products])
    // console.log(products)
    const categories = [
      'Outfits', 
      'Footwear',
      'Grooming & Personal Care',
      'Acessories',
    ]

    const onToggleFeatured = async (productId) => {
    //   console.log(productId)  
      try {
        await toogleFeaturedProduct(productId)
      } catch (error) {
        console.log('Error occurred: ', error)
      }
    }

   return (
    <div className="mt-6">
      <div className="mb-4 flex justify-center">
        <div className="flex justify-center border border-gray-500 rounded-lg pl-3">
            <p className="text-gray-500 font-semibold text-lg mr-2 py-1.5">
                Select Category:
            </p>
            <div className="bg-gray-100 rounded-r-lg">
                <select
                    className="pl-2 pr-14 focus:outline-none text-lg py-1.5 hover:cursor-pointer"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    {categories.map((cat, idx) => (
                        <option 
                            key={idx} 
                            value={cat}
                        >
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex justify-center">
            <p className="text-gray-500 text-2xl font-bold mt-6">
                No products found..
            </p>
        </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 px-40">
            {filteredProducts.map((product) => (
                <AdminProductCard key={product._id} product={product} onToggleFeatured={onToggleFeatured}/>
            ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
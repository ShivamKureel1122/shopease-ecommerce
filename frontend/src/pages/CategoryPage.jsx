import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useProductStore from "../stores/useProductStore";
import { useEffect, useState } from "react";
import { Carousel } from '../components/Carousel'
import { useUserStore } from "../stores/useUserStore";

const CategoryPage = () => {
  const { category } = useParams();
  const { user } = useUserStore()
  const { products, fetchProductsByCategory, fetchFeaturedProducts, featuredProducts } = useProductStore()
  const categories = [
    { href: "/outfits", cat: 'Outfits' }, 
    { href: "/footwear", cat: 'Footwear' },
    { href: '/grooming-and-personal-care', cat: 'Grooming & Personal Care' },
    { href: '/acessories', cat: 'Acessories' },
  ]
  const [formattedCategory, setFormattedCategory] = useState("")
  const [featuredProductsByCategory, setfeaturedProductsByCategory] = useState([])

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  useEffect(() => {
    formatCategory(category)
    fetchProductsByCategory(formattedCategory)
    filterFeaturedProductsByCategory(formattedCategory)
    // console.log("featuredProductsByCategory updated: ", featuredProductsByCategory)
  }, [category, formattedCategory])

  const formatCategory = (category) => {
    if(category.includes('-')) {
      let cat = category.split('-')
      // console.log('cat value: ', cat)

      const formattedCat = cat.map(c => c === 'and' ? '&' : c.charAt(0).toUpperCase() + c.slice(1) )
      // console.log("formattedCat: ", formattedCat)

      const newCategory = formattedCat.map(c => c).join(" ")

      setFormattedCategory(newCategory)
    } else {
      setFormattedCategory(category.charAt(0).toUpperCase() + category.slice(1))
    }
  }

  const filterFeaturedProductsByCategory = (category) => {
    const products = featuredProducts.filter((product) => (
      product.category === category
    ))
    setfeaturedProductsByCategory(products)
  }

  // console.log(category)
  // console.log(formattedCategory)
  // console.log(products)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24 pb-16">
      <div className="flex justify-center gap-8 font-semibold text-md mb-10">
        {categories.map((cat, index) => (
          <CategoryText
            key={index}
            cat={cat}
            category={formattedCategory}
          />
        ))}
      </div>

      <div className="flex justify-center mb-16">
        <h1 className="text-3xl font-bold text-gray-400 capitalize">
          { formattedCategory === "" ? "Category" : formattedCategory }
        </h1>
      </div>

     { featuredProductsByCategory.length > 0 && (
      <div className="px-28 mb-18 bg-gray-50 py-12">
        <h2 className="text-gray-700 font-bold text-2xl mb-6">Featured Products</h2>
        <Carousel products={featuredProductsByCategory} />
      </div>
     )}

      <div className="grid gap-12 sm:grid-cols-2 sm:px-18 md:grid-cols-3 md:px-28 lg:grid-cols-3 lg:px-38">
        {
          products?.length === 0 
            ? <h2 className='text-4xl font-bold text-gray-600 text-center col-span-full'>
              No products found..
            </h2>
            : products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  role={user?.role}
                />
              ))
        }
      </div>
    </div>
  )
}

const CategoryText = ({cat, category}) => {
  return (
    <Link to={'/category' + cat.href}>
      <div className={`hover:cursor-pointer px-1 duration-100 ${cat.cat === category ? 'border-b-indigo-600 border-b-2' : 'hover:border-b-gray-300 hover:border-b-2'}`}>
        <h2 className={`${cat.cat === category ? 'text-indigo-600' : 'text-gray-500'}`}>{cat.cat}</h2>
      </div>
    </Link>
  )
}

export default CategoryPage
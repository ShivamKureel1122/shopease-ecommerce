// src/pages/Home.jsx
import CategoryCard from "../components/CategoryCard";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useUserStore } from "../stores/useUserStore";

const HomePage = () => {
  const {
    recommendations,
    featuredProducts,
    fetchFeaturedProducts,
    fetchRecommendedProducts,
  } = useProductStore()
  const { user } = useUserStore()


  useEffect(() => {
    fetchRecommendedProducts()
  }, [])

  const categories = [
    { href: "/outfits", title: "Outfits", image: "/category-images/outfits.jpg" },
    { href: "/footwear", title: "Footwear", image: "/category-images/footwear.jpg" },
    { href: "/grooming-and-personal-care", title: "Grooming & Personal Care", image: "/category-images/grooming.jpg" },
    { href: "/acessories", title: "Acessories", image: "/category-images/accessories.jpg" },
  ]

  return (
    <div className="mt-8 min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 class="text-4xl text-gray-800 font-bold mb-4">Find Everything You Need, All in One Place!</h1>
        <div className="flex justify-center">
          <p class="text-lg mb-6 text-gray-600 max-w-3xl">Quality products, curated recommendations, and unbeatable deals at your fingertips. Explore a wide range of categories curated just for you.
          Click and start shopping now.</p>
        </div>
        <div className="flex justify-center">
          <Link
            to={""}
            className='bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3
            rounded-2xl flex items-center transition duration-300 text-md font-semibold'
          >
            Shop
            <ArrowRight className='ml-2' size={18} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-full mx-auto px-52 pt-12 pb-20 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
            />
          ))}
        </div>
      </section>

      <div className="max-w-full mx-auto px-36 pt-12 pb-18 bg-white mt-26">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {recommendations.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              role={user?.role}
            />
          ))}
        </div>
      </div>
      

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default HomePage
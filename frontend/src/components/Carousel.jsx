import { useState } from "react";
import ProductCard from "./ProductCard";
import { useUserStore } from "../stores/useUserStore";

export const Carousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useUserStore()

  const total = products.length;
  const visibleItems = 3; // Number of items visible at once

  // Move to previous item
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : 0 // Prevent going negative
    )
  }

  // Move to next item
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < total - visibleItems ? prevIndex + 1 : total - visibleItems
    )
  }

//   if (!products || products.length === 0) {
//     return <p>No featured products available.</p>;
//   }

  return (
    <div className="w-full max-w-5xl mx-auto flex justify-center gap-6 ">
        <div className="flex items-center">
            <button
                onClick={handlePrev}
                className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700"
                disabled={currentIndex === 0}
            >
                &#10094;
            </button>
        </div>

        <div className="overflow-hidden w-full max-w-4xl mx-auto">
            <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${(100 / visibleItems) * currentIndex}%)` }}
            >
            {products.map((product, index) => (
                <div
                key={index}
                className="w-1/3 flex-shrink-0 p-2"
                >
                    <ProductCard product={product}  role={user.role}/>
                </div>
            ))}
            </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center">
            <button
                onClick={handleNext}
                className="bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700"
                disabled={currentIndex >= total - visibleItems}
            >
                &#10095;
            </button>
        </div>
    </div>
  )
}

export default Carousel

import { Link } from "react-router-dom"

export default function CategoryCard({ category }) {
  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
    >
      <Link to={'/category' + category.href}>
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
            {category.title}
          </h3>
        </div>
      </Link>
    </div>
  )
}

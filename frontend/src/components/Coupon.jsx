const CouponCard = ({ coupon, onSelect, isSelected }) => {
    return (
        <div
            onClick={() => onSelect(coupon.code)}
            className={`border rounded-2xl px-4 py-3 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md mt-3 
            ${isSelected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"}`}
        >
            <h3 className="text-md font-semibold text-gray-800">{coupon.code}</h3>
            <p className="text-sm text-gray-600">{coupon.description}</p>
            <p className="text-sm font-medium text-green-600 mt-1">
                Save {coupon.discountPercentage}%
            </p>
        </div>
    )
}

export default CouponCard
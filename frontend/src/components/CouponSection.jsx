import { useState } from "react"

const CouponCard = ({ coupon, onSelect, isSelected }) => (
  <div
    onClick={() => onSelect(coupon.code)}
    className={`border rounded-2xl p-4 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md 
      ${isSelected ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"}`}
  >
    <h3 className="text-lg font-semibold text-gray-800">{coupon.code}</h3>
    <p className="text-sm text-gray-600">{coupon.description}</p>
    <p className="text-sm font-medium text-green-600 mt-1">
      Save {coupon.discount}%
    </p>
  </div>
);

const CouponSection = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  
  // Example fetched coupons
  const coupons = [
    { code: "WELCOME10", description: "Get 10% off on your first order!", discount: 10 },
    { code: "FREESHIP", description: "Free shipping on orders above ₹500", discount: 0 },
    { code: "BIGSAVE20", description: "Flat 20% off on electronics", discount: 20 },
  ];

  const handleApply = () => {
    if (couponCode) {
      setAppliedCoupon(couponCode);
    }
  };

  const handleRemove = () => {
    setAppliedCoupon("");
    setCouponCode("");
  };

  const handleSelectCoupon = (code) => {
    setCouponCode(code);
  };

  return (
    <div className="mt-30 max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Apply Your Coupon</h2>
        <p className="text-sm text-gray-600 mt-1">
          Save more on your purchase with exclusive deals below.
        </p>
      </div>

      {/* Input + Button */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
          disabled={!!appliedCoupon}
        />
        {!appliedCoupon ? (
          <button
            onClick={handleApply}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Apply
          </button>
        ) : (
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Remove
          </button>
        )}
      </div>

      {/* Coupons List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Available Coupons</h3>
        <div className="grid gap-4 sm:grid-cols-1">
          {coupons.map((coupon) => (
            <CouponCard
              key={coupon.code}
              coupon={coupon}
              onSelect={handleSelectCoupon}
              isSelected={couponCode === coupon.code}
            />
          ))}
        </div>
      </div>

      {/* Applied message */}
      {appliedCoupon && (
        <div className="bg-green-50 text-green-700 text-sm font-medium px-4 py-2 rounded-lg text-center">
          Coupon <span className="font-bold">{appliedCoupon}</span> applied successfully!
        </div>
      )}
    </div>
  );
};

export default CouponSection;


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">ShopEase</h3>
          <p>
            Your one-stop destination for premium products at unbeatable prices.
            Trusted by thousands of customers for seamless shopping and fast delivery.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Track Order</a></li>
            <li><a href="#" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:underline">Shipping Information</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">About Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About ShopEase</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Press & Media</a></li>
            <li><a href="#" className="hover:underline">Affiliate Program</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Stay Updated</h3>
          <p className="mb-4">Subscribe to get the latest offers, new arrivals, and shopping tips.</p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Legal and Payment Options */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        <div className="mb-4">
          <a href="#" className="hover:underline mx-2">Privacy Policy</a> | 
          <a href="#" className="hover:underline mx-2">Terms of Service</a> | 
          <a href="#" className="hover:underline mx-2">Cookie Policy</a>
        </div>
        <p>© 2025 ShopEase. All rights reserved.</p>
        {/* <div className="mt-4 space-x-4 flex justify-center items-center">
          <img src="/images/visa-logo.png" alt="Visa" className="h-6" />
          <img src="/images/mastercard-logo.png" alt="Mastercard" className="h-6" />
          <img src="/images/paypal-logo.png" alt="PayPal" className="h-6" />
          <img src="/images/amex-logo.png" alt="American Express" className="h-6" />
        </div> */}
      </div>
    </footer>
  )
}

export default Footer

import useCartStore from "../stores/useCartStore";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CheckoutSummary from "../components/CheckoutSummary";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
    const {
        cart,
        subtotal,
        updateItemQuantity,
        removeFromCart,
    } = useCartStore()

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center pt-30 pb-16 pl-45 pr-33">
            {
                cart.length === 0 ? (
                    <EmptyCartUI/>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 p-0 items-start pl-0">
                        <div className="bg-white max-w-4xl rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-6 border-b pb-5">
                            Shopping Cart
                            </h2>

                            {cart.length > 0 && (
                                cart.map((item) => (
                                    <CartItem
                                        key={item._id}
                                        item={item}
                                        updateQuantity={updateItemQuantity}
                                        removeItem={removeFromCart}
                                    />
                                ))      
                            )}

                            {cart.length > 0 && (
                                <CartSummary subtotal={subtotal} totalQuantity={cart?.length}/>
                            )}

                        </div>

                        <div className="flex flex-col gap-0">
                            <CheckoutSummary/>
                        </div>
                    </div>
                    
                )
            }
        </div>
    )
}

export default CartPage

const EmptyCartUI = () => (
    <div className='flex flex-col items-center justify-center space-y-4 py-16'>
        <ShoppingCart className='h-24 w-24 text-gray-300' />
		<h3 className='text-2xl font-semibold text-gray-800'>Your cart is empty</h3>
		<p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
		<Link
			className='mt-4 rounded-md bg-indigo-500 px-6 py-2 text-white transition-colors hover:bg-indigo-600'
			to='/'
		>
			Start Shopping
		</Link>
    </div>
)

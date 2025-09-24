import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from "../stores/useUserStore";
import useCartStore from "../stores/useCartStore";

const Navbar = () => {
    const { user, logout } = useUserStore()
	const { cart } = useCartStore()
    const isAdmin = user?.role === 'admin'

	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/')
	}

    return (
        <header className="bg-white shadow-md shadow-gray-300 fixed top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex-shrink-0 text-xl font-bold text-indigo-600">
                        ShopEase
                    </div>

                    <div className='flex flex-wrap items-center gap-5'>
                        <Link to={'/'} className="hover:text-indigo-500 transition text-gray-400 duration-300 
						ease-in-out font-medium">
                            Home
                        </Link>

						<Link to={'/category/outfits'} className="hover:text-indigo-500 transition text-gray-400 duration-300 
						ease-in-out font-medium">
                            Categories
                        </Link>

                    {user?.role === 'customer' && (
							<Link
								to={"/cart"}
								className='relative group text-gray-400 hover:text-indigo-500 transition duration-300 
								ease-in-out'
							>
								<ShoppingCart className='inline-block mr-1' size={22} />
								<span className='hidden sm:inline font-medium'>Cart</span>
								
								{cart.length > 0 && (
									<span
									className='absolute -top-2 -left-2 bg-indigo-600 text-white rounded-full px-2 py-0.5 
									text-xs transition duration-300 ease-in-out font-medium'
									>
										{cart.length}	
									</span>
								)}
							</Link>
						)
                    }

                    {isAdmin && (
                        <Link
                            className='bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-md font-medium
                                transition duration-300 ease-in-out flex items-center'
                            to={"/secret-dashboard"}
                        >
                            <Lock className='inline-block mr-2' size={18} />
                            <span className='hidden sm:inline'>Dashboard</span>
                        </Link>
					)}


                    {
                        user ? 
                    	(
							<button
								className='bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer'
							onClick={handleLogout}>
								<LogOut size={18} />
								<span className='hidden sm:inline ml-2'>Log Out</span>
							</button>
						)
                         :
                        (   <>
								<Link
									to={"/signup"}
									className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-md font-medium transition duration-300 flex items-center ease-in-out"
								>
									<UserPlus className='mr-2' size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className='bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out border-indigo-600 font-medium'
								>
									<LogIn className='mr-2' size={18} />
									Login
								</Link>
							</>
                        )
                    }
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Navbar
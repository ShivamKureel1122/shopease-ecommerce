import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
    return (
        <div className="flex gap-1 items-center py-4 border-b border-gray-200 mb-7 pr-3">
            <div className="w-2/10">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-30 h-30 rounded-lg object-contain"
                />
            </div>

                <div className="w-6/10 flex-1 ml-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <p className="text-gray-800 font-medium mt-1">&#8377; {item.price}</p>
                </div>

                <div className="w-2/10 ml-3"> 
                    <div className="flex items-center gap-2">
                        <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
                        >
                        <Minus size={16} />
                        </button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button
                        onClick={() => {
                            // console.log(item._id)
                            updateQuantity(item._id, item.quantity + 1)
                        }}
                        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 hover:cursor-pointer"
                        >
                        <Plus size={16} />
                        </button>

                        <button
                            onClick={() => removeItem(item._id)}
                            className="ml-2 p-2 text-red-500 hover:text-red-700 hover:cursor-pointer"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default CartItem

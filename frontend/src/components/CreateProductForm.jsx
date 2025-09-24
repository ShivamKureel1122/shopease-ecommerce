import { useState } from "react"
import { PlusCircle, Loader, Upload } from "lucide-react"
import useProductStore from "../stores/useProductStore"

const CreateProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
    })
    const { loading, createProduct } = useProductStore()
    const categories = [
        'None', 
        'Outfits',
        'Footwear',
        'Grooming & Personal Care',
        'Acessories',
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            console.log(formData)
            await createProduct(formData)
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image: '',
            })
        } catch(error) {
            console.log('Error occurred: ', error)
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData({...formData, image: reader.result})
            }
            reader.readAsDataURL(file) // base64
            // setFormData({ ...formData, image: file })
        }
    }

    return (
        <form className="max-w-lg mx-auto mt-6 px-6 pt-6 pb-8 border border-gray-400 rounded-lg shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-xl text-gray-500 font-semibold mb-5">
                Add New Product
            </h2>
            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-500">Product Name</label>
                <input
                    type="text"
                    placeholder="Product Name"
                    className="w-full p-2 border mb-3 rounded-md focus:outline-none border-gray-400"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            
            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-500">Price</label>
                <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border mb-3 rounded-md focus:outline-none border-gray-400"
                    step='0.5'
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
            </div>
            
            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-500">Select Category</label>
                <select
                    className="w-full p-2 border mb-3 rounded-md focus:outline-none border-gray-400"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                        {cat}
                    </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-500">Description</label>
                <textarea
                    placeholder="Description"
                    className="w-full p-2 border rounded-md mb-2 border-gray-400 focus:outline-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-500">Upload Image</label>
                <div className="relative flex items-center justify-center border border-gray-400 rounded-md p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer ">
                    <Upload className="absolute left-3 text-gray-600" size={18} />
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="pl-7 pr-3 py-0.5 w-full text-sm text-gray-600 cursor-pointer focus:outline-none border-none bg-transparent"
                    />
                </div>
            </div>

            <button 
                type="submit" 
                className='bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 
                            rounded-md flex items-center transition duration-300 ease-in-out border-indigo-600 font-medium mt-6 hover:cursor-pointer'
            >
                {loading ? (
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                        Loading...
                    </>
                ) : (
                    <>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        Add
                    </>
                )}
            </button>
        </form>
    )
}

export default CreateProductForm
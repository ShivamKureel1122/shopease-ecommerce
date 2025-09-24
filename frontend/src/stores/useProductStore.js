import { create } from 'zustand'
import API from '../utils/api'
import toast from 'react-hot-toast'

const useProductStore = create((set, get) => ({
    loading: false,
    products: [],
    recommendations: [],
    featuredProducts: [],

    setProducts: (products) => set({ products }),
    createProduct: async (productData) => {
        set({ loading: true })

        try {
            const res = await API.post('/products', productData)
            set((prevState) => ({
                products: [...prevState.products, res.data],
                loading: false,
            }))
            toast.success('Product created successfully')
        } catch (error) {
            toast.error(error.response.data.error)
            set({ loading: false })
        }
    },

    deleteProduct: async (productId) => {
        set({ loading: true })

        try {
            const res = await API.delete(`/products/${productId}`)
            set((prevState) => ({
                products: prevState.products.filter((product) => product._id !== productId),
                loading: false,
            }))
            set({ loading: false })
            toast.success(res.data.message)
        } catch (error) {
            set({ loading: false })
            console.error('Error occurred: ', error.response.data.error)
        }
    },

    toogleFeaturedProduct: async (productId) => {
        set({ loading: true })

        try {
            const res = await API.post(`/products/${productId}`)
            // console.log('toogle res: ' + res.data.isFeatured)
            set((prevState) => ({
                products: prevState.products.map((product) => 
                    product._id === productId 
                        ? {...product, isFeatured: res.data.isFeatured} 
                        : product
                ),
                loading: false
            }))
        } catch (error) {
            set({ loading: false })
            toast.error(error.response.data.error || 'Failed to toggle product')
        }
    },

    fetchAllProducts: async () => {
        set({ loading: true })

        try {
            const res = await API.get('/products')
            set({
                products: res.data.products,
                loading: false,
            })
        } catch (error) {
            set({ loading: false })
            console.error(error.response.data.error || 'Failed to fetch products')
        }
    },

    fetchFeaturedProducts: async () => {
        set({ loading: true })

        try {
            const res = await API.get('/products/featured')
            set({
                featuredProducts: res.data,
                loading: false,
            })
        } catch (error) {
            set({ loading: false })
            console.log('Error fetching featured products: ', error)
        }
    },

    fetchRecommendedProducts: async () => {
        set({loading: true})

        try {
            const res = await API.get('/products/recommendations')
            set({
                recommendations: res.data,
                loading: false,
            })
            // console.log(res.data)
        } catch (error) {
            set({loading: false})
            console.log('Error fetching recommended products: ', error)
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true })
        try {
            const res = await API.get(`/products/category/${category}`)
            set({
                products: res.data.products,
                loading: false
            })
        } catch (error) {
            set({ loading: false })
            console.error(error.response.data.error || 'Failed to fetch products')
        }
    },

}))

export default useProductStore
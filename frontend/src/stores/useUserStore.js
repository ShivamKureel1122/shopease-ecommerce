import { create } from 'zustand'
import toast from 'react-hot-toast'
import API from '../utils/api.js'
// import { useNavigate } from 'react-router-dom'

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({name, email, password, confirmPassword}) => {
        set({loading: true})

        if(password != confirmPassword) {
            set({ loading: false })
            return toast.error("Password do not match")
        }

        try {
            await API.post('/auth/signup', { name, email, password })
            set({ loading: false})
        } catch (error) {
            set({loading: false})
            toast.error(error.response?.data?.message || "An error occurred")
        } 
    },

    login: async ({ email, password }) => {
        set({ loading: true })

        try {
            const res = await API.post('/auth/login', { email, password })
            set({ user: res.data, loading: false })
        } catch (error) {
            set({ loading: false })
            toast.error(error.response.data.message || "An error occurred")
        } 
    },

    logout: async () => {
        try {
            await API.post('/auth/logout')
            set({ user: null })
        } catch (error) {
            toast.error(error.response.data.message || "An error occurred")
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true })

        try {
            const response = await API.get('/auth/profile')
            set({ checkingAuth: false, user: response.data })
        } catch(error) {
            console.log('Error occurred: ' + error.message)
            set({ checkingAuth: false, user: null })
        }
    },

}))
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useUserStore } from "./stores/useUserStore"
import { useEffect } from "react"

import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import Navbar from "./components/Navbar"
import CategoryPage from "./pages/CategoryPage"
import AdminPage from "./pages/AdminPage"
import CartPage from "./pages/CartPage"
import useCartStore from "./stores/useCartStore"
import PaymentSuccess from "./pages/PaymentSuccess"
import FullScreenLoader from "./components/FullScreenLoader"
import PaymentFailed from "./pages/PaymentFailed"

function App() {
  const { user, checkAuth, checkingAuth }  = useUserStore()
  const { getCartItems } = useCartStore()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
		if (!user) return
		getCartItems()
	}, [getCartItems, user])

  if(checkingAuth) {
    return <FullScreenLoader/> 
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage/>
          }
        />
        <Route
          path="/signup"
          element={
            !user ? <SignupPage/> : <Navigate to="/" />
          }
        />
        <Route
          path="/login"
          element={
            !user ? <LoginPage/> : <Navigate to="/" />
          }
        />
        <Route
          path='/category/:category'
          element={
            <CategoryPage/>
          }
        />
        <Route
          path="/secret-dashboard"
          element={
            user?.role === 'admin'
            ? <AdminPage/>
            : <Navigate to="/"/>
          }
        />
        <Route
          path='/cart'
          element={
            user ? <CartPage/> : <Navigate to='/login' />
          }
        />
        <Route
          path="/purchase-success"
          element={
            user ? <PaymentSuccess/> : <Navigate to='/login' />
          }
        />
        <Route
          path='/purchase-failed'
          element={
            user ? <PaymentFailed/> : <Navigate to='/login' />
          }
        />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App

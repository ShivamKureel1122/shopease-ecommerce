import { useEffect, useState } from "react"
import useProductStore from "../stores/useProductStore"

import Tabs from '../components/Tabs'
import CreateProductForm from "../components/CreateProductForm"
import ProductList from "../components/ProductList"

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create")
  const { fetchAllProducts } = useProductStore()

  useEffect(() => {
    fetchAllProducts()
  }, [])

  // console.log(activeTab)

  return (
    <div className="mt-22 p-6 mb-18">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-500">Admin Dashboard</h1>
      </div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'create' && <CreateProductForm/>}
      {activeTab === 'list' && <ProductList/>}
    </div>
  )
}

export default AdminPage
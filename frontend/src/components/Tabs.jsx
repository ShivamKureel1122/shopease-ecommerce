import { PlusCircle, ShoppingBasket } from "lucide-react"

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        {id: 'create', label: 'Add Product', icon: PlusCircle},
        {id: 'list', label: 'List Product', icon: ShoppingBasket},
    ]

  return (
    <div className="flex space-x-4 border-b ml-8 mr-8 mb-12 pb-6 border-gray-400 justify-center">
        {
            tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                <button
                    key={tab.id}
                    className={`px-4 py-2 rounded-md font-medium flex items-center hover:cursor-pointer ${activeTab === tab.id ? 'bg-indigo-600 text-white transition':'border border-indigo-600 text-indigo-600'}`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    <Icon className='mr-2' size={18}/>
                    {tab.label}
                </button>)
            })
        }
    </div>
  )
}

export default Tabs

import { useState } from "react"
import { Button, Card, TextInput } from "flowbite-react";
import { HiMail, HiLockClosed } from "react-icons/hi"
import { Link } from "react-router-dom"
import { LogIn, ArrowRight, Loader } from 'lucide-react'
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useUserStore()

  const handleSignUp = (e) => {
    e.preventDefault()
    // console.log(formData)
    login(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <Card className="w-full max-w-sm px-3">
        <div>
            <p className="text-xl font-bold text-gray-600" >Login</p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                <TextInput id="email" type="email" icon={HiMail} placeholder="johndoe@example.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
            </div>
            <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Password</label>
                <TextInput id="password" type="password" icon={HiLockClosed} placeholder="••••••••" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            </div>

            <Button className="bg-indigo-600 hover:bg-indigo-500 transition duration-300 ease-in-out disabled:opacity-70" disabled={loading} type="submit">
              { loading ? (
                <>
									<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
									Loading...
								</>
              ) 
              : 
              ( <>
                  <LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
                  Login
                </>
              )}
            </Button> 
            <div>
                <p className="text-gray-600">Don't have an account yet?&nbsp;
                    <Link to='/signup' className="text-indigo-600 ">
                        Create one <ArrowRight className='inline h-4 w-4' />
                    </Link>
                </p>
            </div>
        </form>
        </Card>
    </div>
  )
}

export default LoginPage
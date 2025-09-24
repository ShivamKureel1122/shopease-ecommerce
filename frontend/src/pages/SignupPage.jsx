import { useState } from "react"
import { Button, Card, TextInput } from "flowbite-react";
import { HiMail, HiUser, HiLockClosed } from "react-icons/hi"
import { Link } from "react-router-dom"
import { ArrowRight, UserPlus, Loader } from 'lucide-react'
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // const loading = false

    const { loading, signup } = useUserStore()

    const handleSignUp = async (e) => {
        e.preventDefault()
        // console.log(formData)
        try {
            await signup(formData)
            navigate('/login')
        } catch (error) {
            console.log('Error occured: ', error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-sm px-3">
            <div>
                <p className="text-xl font-bold text-gray-600" >Sign Up</p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Full Name</label>
                    <TextInput id="fullname" type="text" icon={HiUser} placeholder="John Doe" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Email</label>
                    <TextInput id="email" type="email" icon={HiMail} placeholder="johndoe@example.com" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Password</label>
                    <TextInput id="password" type="password" icon={HiLockClosed} placeholder="••••••••" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-600">Confirm Password</label>
                    <TextInput id="password" type="password" icon={HiLockClosed} placeholder="••••••••" required value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}/>
                </div>

                <Button className="bg-indigo-600 hover:bg-indigo-500 transition duration-300 ease-in-out hover:cursor-pointer disabled:opacity-70" 
                disabled={loading} 
                type="submit"
                onClick={handleSignUp}>
                { loading ? (
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                        Loading...
                    </>
                    )
                    :
                    ( 
                    <>
                        <UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
                        Sign Up
                    </>
                )}
                    
                </Button>
                <div>
                    <p className="text-gray-600">Already have an account?&nbsp;
                        <Link to='/login' className="text-indigo-600 ">
                            Login <ArrowRight className='inline h-4 w-4' />
                        </Link>
                    </p>
                </div>
            </form>
            </Card>
        </div>
    )
}

export default SignupPage
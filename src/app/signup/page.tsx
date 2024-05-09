"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [btnDisabled, setBtnDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup successfully", response.data);
            router.push('/login')
            

        } catch (error: any) {
            console.log("Signup failed")
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Loading" : "Signup" }</h1>
            <hr />

            <label htmlFor="username">Username</label>
            <input 
            id="username"
            value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}
            placeholder='Enter Username'
            type="text" />
            
            <label htmlFor="email">Email</label>
            <input 
            id="email"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder='Enter Email'
            type="text" />

            <label htmlFor="password">Password</label>
            <input 
            id="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder='Enter Username'
            type="text" />

            <button
            onClick={onSignup}
            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
            >
                {btnDisabled ? "Please input all the fields" : "Signup"}
            </button>
            <Link href="/login">Visit Login Page</Link>
            
        </div>
    )
}

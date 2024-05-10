"use client"

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("")

    const getUserDetails = async () => {
        const response = await axios.post("/api/users/me")
        // console.log(response);
        setData(response.data.data.username)
    }

    const onLogout = async () => {
        try {
            await axios.post("/api/users/logout")
            toast.success("Logged Out")
            router.push("/login")

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile Page</h1>
            <hr />
            <h2> { 
                data === "" ? 
                "No data available" : 
                <Link href={`/profile/${data}`}> 
                User data: 
                {data} 
                </Link>
                } 
            </h2>
            <hr />

            <button
            className=' bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={onLogout}
            >
                Logout
            </button>
            
            <button
            className=' bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={getUserDetails}
            >
                Get User Details
            </button>
        </div>
    )
}

'use client'

import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { Slide, toast } from "react-toastify";

export default function Verify(){
    const params = useSearchParams()
    const email = params.get("email");
    const userId = Number(params.get("userId"));
    const [code, setcode] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    async function VerifyOtp() {
        try {
            setIsLoading(true)
            await axios.put('http://localhost:3000/api/auth/signup',{
                code,
                userId: userId
            })
            toast("Verification Successful." ,{
                position: "top-right",
                theme: "dark",
                hideProgressBar: false,
                autoClose: 3000,
                transition: Slide,
            })
            router.replace('/')
            
        } catch (error) {
            console.log(error);
            // @ts-ignore
            toast(error.response.data.msg ,{
                position: "top-right",
                theme: "dark",
                hideProgressBar: false,
                autoClose: 3000,
                transition: Slide,
        
            })
            
        } finally{
            setIsLoading(false)
        }
        
    }

    return (
        <div className=" flex items-center justify-center w-screen h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-700 via-stone-500 to-stone-300">
            <div className="flex flex-col items-center space-y-10 h-[40vh] w-[80vw]">
                <div className="flex flex-col items-center space-y-3">
                    <h1 className="text-5xl font-extrabold">Verify your email address</h1>
                    <h2 className="text-xl">Email has sent to {email}</h2>

                </div>
                <input
                autoFocus={true} 
                onChange={(e) => setcode(Number(e.target.value))} 
                type="text" 
                maxLength={6} 
                className="w-[28vw] tracking-widest font-bold outline-none rounded-md text-center bg-gray-700 p-4 text-3xl" 
                />
                <button
                disabled={isLoading} 
                onClick={VerifyOtp} className={`flex justify-center ${isLoading ? "cursor-not-allowed" : ""} bg-gray-700 tracking-widest rounded-md font-bold w-[28vw] p-4 text-3xl`}>{isLoading ? <LoaderIcon className="animate-spin"/> : "Verify"}</button>
            </div>
        </div>
    )
}
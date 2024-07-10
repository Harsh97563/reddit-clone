'use client'
import axios from "axios";
import { Eye, EyeOff, Key, Lock, Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
    const [passwordVisible, setpasswordVisible] = useState(false)
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    async function  SignUp(){
        try {
            const signinRes = await signIn('credentials',{
                callbackUrl: "http://localhost:3000/",
                email,
                password
            })
            console.log(signinRes);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div className="flex h-screen w-full border">
            <div className="flex w-[50%] items-center justify-center">
                <div className="flex border border-emerald-800 flex-col justify-evenly h-[49%] w-[40%] rounded-2xl p-4">
                    <div className="h-[10%] flex items-center border-b border-emerald-400">
                        <Mail/>
                        <input type="text" className=" w-96 outline-none p-2 text-white bg-transparent" placeholder="Email"
                        onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>
                    <div className="h-[10%] flex items-center border-b border-emerald-400">
                        <Lock/>
                        <input type={passwordVisible ? "test": "password"} className="w-96 outline-none p-2 text-white bg-transparent" placeholder="Password"
                        onChange={(e)=> setPassword(e.target.value)}
                        />
                        <button onClick={()=> setpasswordVisible(prev => !prev)}>
                            {passwordVisible ? <EyeOff/> : <Eye/>}
                        </button>
                    </div>
                    <button onClick={()=> SignUp()}>Sign In</button>
                    <div className="flex items-center w-full justify-center">
                        Don't have an account? 
                        <Link href={'/auth/signup'} className=" text-emerald-400 pl-1 underline" >Register</Link>
                    </div>
                </div>
            </div>
            <div className="flex w-[50%] items-center justify-center ">
                <Image src={'/signup.svg'} width={700} height={700} alt="Sign In"/>
            </div>
        </div>
    )
}
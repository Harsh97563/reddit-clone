'use client'
import axios from "axios";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Slide, toast } from "react-toastify";

export default function SignUp() {
    const [passwordVisible, setpasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter()

    async function  SignUp(){
        try {
            setIsLoading(true);
            const signup = await axios.post("/api/auth/signup", {
                username,
                email,
                password
            })
            
            const signinRes = await signIn('credentials',{
                callbackUrl: `http://localhost:3000/auth/verify?email=${email}&userId=${signup.data.userId}`,
                email,
                password
            })
              
            
        } catch (error) {
            console.log(error, "ca");
            // toast(error.response.data.msg ,{
            //     position: "top-right",
            //     theme: "dark",
            //     hideProgressBar: false,
            //     autoClose: 3000,
            //     transition: Slide,
        
            // })
            
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex h-screen w-full border">
            <div className="flex w-[50%] items-center justify-center">
                <div className="flex border border-emerald-800 flex-col justify-evenly h-[49%] w-[40%] rounded-2xl p-4">
                    <div className="h-[10%] flex items-center border-b border-emerald-400">
                        <User/>
                        <input type="text" className=" w-96 outline-none p-2 text-white bg-transparent" placeholder="Username"
                        onChange={(e)=> setUsername(e.target.value)}
                        />
                    </div>
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
                    <button disabled={isLoading} className={`flex ${isLoading ? "cursor-not-allowed": ""} justify-center`} onClick={()=> SignUp()}>{isLoading ? <Loader2 className=" animate-spin"/> : "Sign Up"}</button>
                    <div className="flex items-center w-full justify-center">
                        Already have an account? 
                        <button className=" text-emerald-400 pl-1 underline" onClick={()=> signIn()}>Login</button>
                    </div>
                </div>
            </div>
            <div className="flex w-[50%] items-center justify-center ">
                <Image src={'/signup.svg'} alt="image" width={700} height={700}/>
            </div>
        </div>
    )
}
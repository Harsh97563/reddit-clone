'use client'
import { CircleUserIcon, Plus } from "lucide-react";
import { signIn} from "next-auth/react"
import {  useRouter } from "next/navigation";
import UserDropBox from "./user-dropbox";
import { useState } from "react";
import Link from "next/link";

export const Login =  ({session}: any)=> {
    const [visible, setVisible] = useState(false)
    const router = useRouter()
    return (
        <div>
            {session ? <div className="flex justify-center items-center">
                <Link href={'/post'} className="flex hover:bg-slate-700 p-2 rounded-2xl">
                    <Plus/> Create
                </Link>
                <button
                onClick={() => setVisible((prev) => !prev)}
                className=" hover:bg-slate-900 p-2 rounded-full">
                    <CircleUserIcon/>
                </button>
                <UserDropBox visible={visible} />

            </div> : <button className=" bg-orange-700 p-2 rounded-2xl" onClick={()=> signIn()}>Login</button>}
        </div>
    )
}
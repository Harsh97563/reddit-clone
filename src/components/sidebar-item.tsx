'use client'
import { Home } from "lucide-react"
import Link from "next/link"
import {  usePathname, useRouter } from "next/navigation"


export const SideBarItem = ({label, href}: {label: string, href: string})=> {
    const router = useRouter()
    const pathname = usePathname()

    const isActive = pathname === href;
    
    return (
        <Link href={`/${href}`}>
            <button className={` w-56 h-10 flex space-x-2 items-center px-2 rounded-xl hover:bg-slate-900 ${isActive ? "bg-gray-700":""}`}
            >
                <Home/>
                <span>
                    {label}
                </span>
            </button>
        </Link>
    )
}
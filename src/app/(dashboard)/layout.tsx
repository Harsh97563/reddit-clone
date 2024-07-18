import { NavBar } from "@/components/nav-bar";
import { SideBar } from "@/components/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react"
import "@uploadthing/react/styles.css";

const dashboardLayout = async({children}: {children: React.ReactNode}) => {
    const session = await getServerSession(authOptions)
    
    return (

        <div>
            <NavBar session= {session}/>
            <SideBar/>
            <div className="h-full max-w-[1240px] mx-auto mt-16 p-2">
                {children}
            </div>
        </div>
    )
}

export default dashboardLayout;
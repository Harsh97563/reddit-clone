import { RedoDot, Search } from "lucide-react"
import { Login } from "./loginbtn"


export const NavBar =({session}: any)=> {
    
    return (
        <header className=" flex justify-between w-full border-b-2 h-16 items-center px-4 fixed z-50 top-0 bg-black">
            <div className="flex items-center space-x-2">
                <RedoDot height={40} width={40}/>
                <h3 className=" font-bold text-2xl">Reddit</h3>
            </div>
            <div className="flex bg-slate-600 h-9 items-center w-[30vw] space-x-2 rounded-2xl px-2">
                <span>
                    <Search/>
                </span>
                <span>
                    <input type="text" className="bg-slate-600 decoration-transparent outline-none" placeholder="Search Reddit" />
                </span>
            </div>
            <div className="flex items-center space-x-2">
                <Login session = {session}/>
            </div>
        </header>
    )
}
import { LogOut, UserCog2Icon } from "lucide-react";
import { signOut } from "next-auth/react";


export default function UserDropBox({visible}:boolean){
    return (
        <div className={`${visible? "fixed" : "hidden"} transition-all duration-500 top-20 px-3 p-2  space-y-2 font-serif right-2 bg-zinc-900 w-64 h-24`}>
            <button className="flex space-x-2"><UserCog2Icon/>
            <div>
                Profile
            </div>
            </button>
            <button className="flex space-x-2"
            onClick={() => signOut()}
            >
                <LogOut/>
                <div>
                    Sign Out
                </div>
                </button>
        </div>
    )
}
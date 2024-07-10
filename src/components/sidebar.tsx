import { SideBarItem } from "./sidebar-item"


export const SideBar = ()=> {

    return (
        <div className=" w-72 border-r h-full fixed top-16">
            <div className="flex items-center flex-col space-y-2 p-2">
                <SideBarItem href="/" label="Home"/>
                <SideBarItem href="explore" label="Explore"/>
            </div>
        </div>
    )
}
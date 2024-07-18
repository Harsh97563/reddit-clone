import { Bookmark, Dot, MessageSquare, Share, UserPlus } from "lucide-react"
import Link from "next/link"
import UpvoteBtn from "./upvotebtn"
import PostTime from "./posttime"

type Props = {
    userId: number,
    username: string,
    userprofile:string,
    title: string,
    description: string,
    imageSrc: string | null
    id: number
    date: Date
    votes: number
    voteData: any

}
export const Post = ({userId, 
    username, 
    userprofile, 
    title, 
    description, 
    imageSrc, 
    id, 
    date, 
    voteData}: Props)=> {
    
    
    return (
        
        <div className=" flex border-b w-full my-1  bg-gray-900 hover:bg-slate-700 py-2">
            <UpvoteBtn voteData={voteData} userId={userId} id={id}/>
            <div className="w-full px-1 h-full">
                <div className="flex justify-between">
                    <div className="flex space-x-1">
                        <img className="rounded-full w-5 h-5" src={userprofile} alt="" />
                        <Link className=" hover:underline" href={`/user/${username}`}>{username}</Link>
                        <Dot/>
                        <PostTime date={date} />
                    </div>
                    <div>
                        <Link className=" hover:underline" href={`/user/${username}`}>
                            Follow
                        </Link>
                    </div>

                </div>
                <Link href={`/${id}`}>
                    <div className=" my-3">
                        <div className=" font-bold text-2xl">
                            {title}
                        </div>
                        <div>
                            {description}
                        </div>
                        {/* <Image src={imageSrc} width={1000} height={100} alt="image" className=" rounded-lg"/> */}
                        <div className="">
                            {imageSrc ? <img className="rounded-xl border" src={imageSrc} alt="" /> : null}
                        </div>
                    </div>
                </Link>

            </div>
            <div className="flex space-y-1 mx-2 h-full flex-col items-center ">
                <button className="flex space-x-1 bg-slate-900 p-2 rounded-2xl">
                    <UserPlus/>
                </button>
                <Link href={`/${id}`} className="flex space-x-1 bg-slate-900 p-2 rounded-2xl">
                    <MessageSquare/>
                </Link>
                <button className="flex space-x-1 bg-slate-900 p-2 rounded-2xl">
                    <Share/>
                </button>
                <button className="flex space-x-1 bg-slate-900 p-2 rounded-2xl">
                    <Bookmark/>
                </button>
            </div>
        </div>
    )
}
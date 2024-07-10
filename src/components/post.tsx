import { Dot, MessageSquare, Share } from "lucide-react"
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
    id: string
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
        
            <div className=" border-b w-full bg-gray-900 p-3 hover:bg-slate-700 space-y-2 mt-2">
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
                <div className="flex space-x-2 items-center mt-2 ">
                    <UpvoteBtn voteData={voteData} userId={userId} id={id}/>
                    <Link href={`/${id}`} className="flex space-x-1 bg-slate-900 p-2 rounded-2xl">
                        <MessageSquare/>
                        <span>
                            Comments
                        </span>
                    </Link>
                    <button className="flex space-x-1 bg-slate-900 p-2 rounded-2xl">
                        <Share/>
                        <span>
                            Share
                        </span>
                    </button>
                </div>
            </div>
    )
}
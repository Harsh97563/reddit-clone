'use client'

import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";



async function postComments({comment, authorId, postId}: any) {
    
    const response = await axios.post('http://localhost:3000/api/comments', {
        comment,
        authorId,
        postId
        
    })
    console.log(response);
    
}
export default function PostComment({ postId}: any){
    const session = useSession()
    const authorId = Number(session.data?.user.id)
    const [comment, setComment] = useState("")
    return (
        <div className="flex flex-col justify-end items-end space-y-3">
                <input id="InputField" type="text" className="w-full bg-black border border-white rounded-md h-11 outline-none p-2"
                onChange={(e) => setComment(e.target.value)}
                />
                <button className=" flex justify-center w-[8vw] rounded-md p-2 bg-orange-700"
                onClick={() => postComments({comment, authorId, postId})}
                >Comment</button>
        </div>
    )
}
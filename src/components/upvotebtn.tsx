'use client'
import axios from "axios"
import { ArrowBigDown, ArrowBigUp, ArrowUp, ChevronUp } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Slide, toast } from "react-toastify"

interface VoteData {
    type: "UPVOTE" | "DOWNVOTE",
    userId: number
}

export default function UpvoteBtn({voteData, userId, id}:any){
    const Session = useSession()
    const [isIncreased, setIsIncreased] = useState(false)
    const [votes, setVotes] = useState(0)
    // @ts-ignore
    const activeUserId = Session.data?.user?.id
    useEffect(() => {
        voteData.map((data: VoteData) => {
            
            if(data.userId == activeUserId){
                if(data.type == 'UPVOTE') setIsIncreased(true)
                else setIsIncreased(false)    
            }
        })
        const Upvotes = voteData.filter((data: VoteData) => data.type === 'UPVOTE')
        setVotes(Upvotes.length)
    }, [])
    
    async function Upvote() {
        if(!Session.data){
            toast("You are not logged In." ,{
                position: "bottom-right",
                theme: "dark",
                hideProgressBar: false,
                autoClose: 3000,
                transition: Slide,
        
            })
            return
        }
        if(isIncreased){
            setIsIncreased(false)
            setVotes((prev) => prev - 1)
            await axios.put('http://localhost:3000/api/post', {
                userId,
                postId: id,
                type: 'DOWNVOTE'
            })
            return
        }
        setIsIncreased(true)
        setVotes((prev) => prev + 1)
        await axios.put('http://localhost:3000/api/post', {
            userId,
            postId: Number(id),
            type: 'UPVOTE'
        })

    }

    return (
        <div className={`flex items-center flex-col`}
        >
            <div className={`flex flex-col transition-all duration-500 items-center relative ${isIncreased ? "-top-3": "top-[50%]"}`}>
                <button 
                onClick={(e)=> {
                    Upvote()   
                }
                }>
                    <ChevronUp size={42} />
                </button>
                <span>{votes}</span>
            </div>
        </div>
    )
}
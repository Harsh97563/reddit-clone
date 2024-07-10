'use client'
import axios from "axios"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Slide, toast } from "react-toastify"


export default function UpvoteBtn({voteData, userId, id}:any){
    const Session = useSession()
    const [isIncreased, setIsIncreased] = useState(false)
    const [isDecreased, setIsDecreased] = useState(false)
    const [votes, setVotes] = useState(0)
    const activeUserId = Session.data?.user?.id
    useEffect(() => {
        voteData.map((data) => {
            
            if(data.userId == activeUserId){
                if(data.type == 'UPVOTE') setIsIncreased(true)
                else setIsDecreased(true)    
            }
        })
        const Upvotes = voteData.filter((data) => data.type === 'UPVOTE')
        const Downvotes = voteData.filter((data) => data.type === 'DOWNVOTE')
        setVotes(Upvotes.length - Downvotes.length)
    }, [])
    
    async function Upvote(increase: boolean) {
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
        if(increase){
            if(isIncreased){
                return
            }
            setIsIncreased(true)
            setIsDecreased(false)
            setVotes((prev) => prev + 1)
            await axios.put('http://localhost:3000/api/post', {
                userId,
                postId: Number(id),
                type: 'UPVOTE'
            })

            return
        }
        if(isDecreased){
            return
        }
        setIsDecreased(true)
        setIsIncreased(false)
        setVotes((prev) => prev - 1)
        await axios.put('http://localhost:3000/api/post', {
            userId,
            postId: id,
            type: 'DOWNVOTE'
        })
        return

    }
    return (
        <a onClick={(e) => e.preventDefault()}>
            <div className={`flex space-x-1 ${isIncreased || isDecreased ? "border border-orange-700": ""} bg-slate-900 p-2 rounded-2xl`}
            >
                <button onClick={(e)=> {
                    Upvote(true)   
                }
                }>
                    <ArrowBigUp fill={isIncreased ? "red":"transparent"} />
                </button>
                <span>{votes}</span>
                <button onClick={(e)=> {
                    Upvote(false)
                }}>
                    <ArrowBigDown fill={isDecreased ? "red":"transparent"}/>
                </button>
            </div>
        </a>
    )
}
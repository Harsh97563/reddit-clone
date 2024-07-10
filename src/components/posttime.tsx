'use client'
import { useEffect, useState } from "react";


export default function PostTime({date}: any){
    const [timesAge, setTimesAge] = useState("")
    
    useEffect(()=> {
        
        setTimesAge(calculateTimeAge(new Date(date)))
        
    }, [])

    function calculateTimeAge(date: Date){
        const now = new Date();
        const diffMs = now.getTime() - date.getTime()
        const diffHs = Math.floor(diffMs/(1000*60*60));
        const diffDays = Math.floor(diffHs/24)

        if(diffDays >0){
            return `${diffDays} day ago`
        }else {
            return `${diffHs} hours ago`
        }
    }
    return (
        <span>{timesAge}</span>
    )
}
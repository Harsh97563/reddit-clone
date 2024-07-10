'use client'

import axios from "axios";
import { useState } from "react";

export default function FollowButton({followedId, followedbyId, following}: {followedId: any, followedbyId: any, following: any}){

    const [isFollowing, setIsFollowing] = useState(following)

    async function followUser() {
        try {
    
            setIsFollowing(prev => !prev)
            await axios.put('http://localhost:3000/api/user', {
                followedId,
                followedbyId
            })

            
        } catch (error) {
            console.log(error);        
        }
    
    }

    return (
      <button
       className={`${followedbyId == followedId ? "hidden": ""} ${isFollowing ? "bg-orange-600 text-white" : "border border-orange-600 text-orange-600"} border transition-all w-full p-2 rounded-xl font-semibold `}
      onClick={followUser}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    );
}
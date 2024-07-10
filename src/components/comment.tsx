import { User2 } from "lucide-react";


export default function Comment({comment}:any){
    return (
        <div className="flex flex-col space-y-2 border rounded-md p-2">
            <div className="flex">
                <User2/> 
                {comment.author.username}
            </div>
            <div className="pl-6">
                {comment.comment}           
            </div>
            <div className="flex">
                <div>Likes</div>
                <div>Comment</div>
            </div>
        </div>
    )
}
import Comment from "@/components/comment"
import { Post } from "@/components/post"
import PostComment from "@/components/post-comments"
import axios from "axios"

async function getComments(id: Number){
    try {
        const response = await axios.get(`http://localhost:3000/api/comments?postId=${id}`)
        return response
        
    } catch (error) {
        console.log(error);
        
    }

}

export default async function singlePost({ params }: any) {
    const {id} = params 
    const response = await getComments(id)
    
    
    
    return (
        <div className="flex flex-col space-y-6">
            <div>
                <Post id={response?.data.post.id} date={response?.data.post.createdAt} title={response?.data.post.title} description={response?.data.post.description} userprofile={response?.data.post.author.profileImgSrc} voteData={response?.data.post.voteRecords} userId={response?.data.post.authorId} username={response?.data.post.author.username} imageSrc={response?.data.imageSrc} votes={response?.data.post.votes}/>
            </div>
            <PostComment authorId={Number(response?.data.post.authorId)} postId={Number(id)}/>
            <div className="flex flex-col space-y-3">
                <h1 className=" text-3xl">
                Comments
                </h1>
                <div>

                </div>
                {response?.data.post.comments.length ? null : <p>No Comments</p>}

                {response?.data.post.comments.map((data:any) => (
                    <Comment key={data.id} comment={data}/>
                ))}
            </div>
        </div>
    )
}
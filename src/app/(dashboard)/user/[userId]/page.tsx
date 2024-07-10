import FollowButton from "@/components/followbtn";
import { Post } from "@/components/post";
import { authOptions } from "@/lib/auth";
import { PostData } from "@/lib/types";
import axios from "axios";
import { getServerSession } from "next-auth";

async function getUserInfo(username: String) {
    try {
        const response = await axios.get(`http://localhost:3000/api/user?username=${username}`)
        console.log(response.data.response);
        
        return response.data.response
        
    } catch (error) {
        console.log(error);
    }
}

async function CheckFollowing({userId, followingUSerId}: {userId: number, followingUSerId: []}) {
    followingUSerId.map(id => {
        if(id === userId){
            return true
        }

        return false
    })
}

export default async function Profile({params}: any){

    const { userId } = params;
    const response = await getUserInfo(userId)
    console.log(response);
    
    const session = await getServerSession(authOptions)
    const isFollowing = CheckFollowing({
        userId: session.user.id,
        followingUSerId: response.followers
    })
    
    return (
        <div className=" w-full">
            <div className="flex items-center justify-evenly w-full p-4">
                <div className="text-center">
                    <img className="w-36 h-36 rounded-full" src={response.profileImgSrc} alt="Profile Img"/>
                    <div className="texl-xl font-bold">
                        {response.username}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center text-center text-2xl justify-center space-x-7">
                        <div>
                            <div className="font-bold">{response.posts.length}</div>
                            <div>Post</div>
                        </div>
                        <div>
                            <div className="font-bold">{response.followers.length}</div>
                            <div>Followers</div>
                        </div>
                        <div>
                            <div className="font-bold">{response.following.length}</div>
                            <div>Following</div>
                        </div>
                    </div>
                    <FollowButton followedbyId={session.user.id} followedId={response.id} following={isFollowing} />
                </div>
            </div>
            <div>
                <h2 className="text-3xl text-center border-b mt-3">Posts</h2>
                <div className="">
                    {response.posts.map(({post}: {post: PostData}) => (
                        <Post
                        userId={post.authorId}
                        votes={post.votes}
                        voteData={post.voteRecords}
                        key={post.id} 
                        // @ts-ignore
                        id={post.id} 
                        date={post.createdAt} 
                        username={response.username}
                        userprofile={response.profileImgSrc}
                        description={post.description}
                        title={post.title}
                        imageSrc={post.imageSrc}
                        /> 
                    ))}
                </div>
            </div>
        </div>
    )
}
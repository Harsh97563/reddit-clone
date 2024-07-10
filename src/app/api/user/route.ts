import prisma from "@/lib/prismaSingleton";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(request: Request){

    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');
        
        const response = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true,
                username: true,
                profileImgSrc: true,
                verified: true,
                votes: true,
                posts: {
                    include: {
                        voteRecords: true
                    }
                },
                followers: true,
                following: true,
            }
        })

        if(!response){
            return NextResponse.json({
                msg: "Post not found."
            }, {status: 404})
        }
        return NextResponse.json({
            msg: "Post found.",
            response
        }, {status: 200})
        
    } catch (error) {
        return NextResponse.json({
            msg: "Unable to get User Detail.",
            error: error
        }, {status: 400})
    }

}

export async function PUT(req: Request) {

    const {followedId, followedbyId} = await req.json()

    try {
        
        const parsedFollowedId = parseInt(followedId);
        const parsedFollowedbyId = parseInt(followedbyId);

        const userExist = await prisma.user.findUnique({
            where: {
                id: parsedFollowedbyId
            },
            select: {
                following: true
            }
        })
        const user2Exist = await prisma.user.findUnique({
            where: {
                id: parsedFollowedId
            },
            select: {
                followers: true
            }
        })
        
        const isAlreadyFollowing = userExist.following.some(id => id === followedId)

        if(isAlreadyFollowing){

            await prisma.user.update({
                where: {
                    id: parsedFollowedbyId
                },
                data: {
                    following: {
                        set: userExist.following.filter(id => id !== parsedFollowedId)
                    }
                }
            })
            
            await prisma.user.update({
                where: {
                    id: parsedFollowedId
                },
                data: {
                    followers: {
                        set: user2Exist.followers.filter(id => id !== parsedFollowedbyId)
                    }
                }
            })

            return NextResponse.json({
                msg: "You unfollowed user!"
            }, {status: 200})
        }
        
        
        await prisma.user.update({
            where: {
                id: parsedFollowedbyId
            },
            data: {
                following: {
                    push: parsedFollowedId
                }
            }
        })
        
        await prisma.user.update({
            where: {
                id: parsedFollowedId
            },
            data: {
                followers: {
                    push: parsedFollowedbyId
                }
            }
        })
        
        return NextResponse.json({
            msg: "You followed user!"
        }, {status: 200})
        
    } catch (error) {
        
        return NextResponse.json({
            msg: "Issue in following the user.",
            error
        }, {status: 400})

    } finally {
        await prisma.$disconnect();
    }
}
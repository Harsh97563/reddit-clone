import prisma from "@/lib/prismaSingleton";
import { NextResponse } from "next/server";

export async function GET(request: Request){

    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');
        
        if(!postId){
            return NextResponse.json({
                msg: "Post Id not found."
            })
        }
        const post = await prisma.post.findUnique({
            where: {
                id: Number(postId)
            },
            include: {
                author: true,
                comments: {
                    include: {
                        author: true
                    }
                },
                voteRecords: true
            }
        })

        if(!post){
            return NextResponse.json({
                msg: "Post not found."
            }, {status: 404})
        }
        return NextResponse.json({
            msg: "Post found.",
            post
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            msg: "Error in getting single post.",
            error
        })
        
    }
}

export async function POST(request: Request){
    try {
        const {comment, authorId, postId} = await request.json()
        
        const data = await prisma.comments.create({
            data: {
                comment,
                authorId,
                postId
            }
        })

        if(!data){
            return NextResponse.json({
                msg: "Issue in posting comment."
            })
        }

        return NextResponse.json({
            msg: "Comment posted successfully!"
        }, {status: 201})


    } catch (error) {
        console.log("error", error);
        
        return NextResponse.json({
            msg: "Error",
            error: error.message
        }, {status: 500})
    }
}
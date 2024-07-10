import prisma from "@/lib/prismaSingleton";

import { NextResponse } from "next/server";
import { skip } from "node:test";


export async function POST(request: Request){

    try {
        const {title, description, imageSrc, authorId} = await request.json()
        console.log(title, description, imageSrc, authorId); 
        const post = await prisma.post.create({
            data: {
                title: title,
                description: description || null,
                imageSrc: imageSrc || null,
                author:{
                    connect: {id: Number(authorId)}
                }
            }
        })

        if(!post){
            return NextResponse.json({
                msg: "Some issue in posting stuff.",
                post
            })
        }
        return NextResponse.json({
            msg: "Successfully Posted."
        })

    } catch (error) {
        return NextResponse.json({
            msg: "error",
            error
        }, {status: 500})
        
    }
}


export async function GET(request: Request){
    const { searchParams } = new URL(request.url);
    const take = parseInt(searchParams.get('pageParam'));
    const ITEMS_PER_PAGE = 6;
    
    try {
        
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select:{
                        id: true,
                        username: true,
                        profileImgSrc: true,
                        following: true
                    }
                },
                voteRecords: true,
            },
            take: take*ITEMS_PER_PAGE,
            skip: (take-1)*ITEMS_PER_PAGE
        })
        const totalPosts = await prisma.post.count();
        const hasNextPage = take * ITEMS_PER_PAGE < totalPosts;
        const nextPage = hasNextPage ? take + 1 : null;
        return NextResponse.json({
            msg: "All post",
            posts,
            nextPage
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({
            msg: "Error",
            error
        }, {status: 400})
    }
}

export async function PUT(request: Request){
    const {userId, postId, type} = await request.json()
    console.log(userId, postId, type);
    
    try {
        const existingVote = await prisma.vote.findUnique({
            where: {
              userId_postId: {
                userId: userId,
                postId: postId
              }
            }
        });
      
        if (existingVote) {
        
            await prisma.vote.update({
              where: {
                id: existingVote.id
              },
              data: {
                type: type
              }
            });
        }
        
        await prisma.vote.create({
            data: {
                userId,
                postId,
                type
            }
        })
        return NextResponse.json({
            msg: "Sucessfully updated votes."
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Error in updating votes",
            error: error
        })
        
    }
}

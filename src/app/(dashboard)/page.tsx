'use client'

import { Post } from "@/components/post";
import { PostData } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

async function fetchPosts({pageParam = 1}) {

  try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/post`, {
        params: {
          pageParam
        }
      });
      const posts = response.data.posts;
      const nextPage = response.data.nextPage;
      
      return {posts, nextPage}

  } catch (error) {
      console.error('Error fetching posts:', error);
  }
}

export default function Home() {
  
  const {ref, inView} = useInView({
    rootMargin: "600px",
  });
  
  const {data, fetchNextPage, isFetching, isLoading, hasNextPage} = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage?.nextPage ?? undefined
  })
  
  useEffect(() => {
    if(inView && hasNextPage){
      fetchNextPage()
    }
  }, [hasNextPage, inView])
  
  
  if(isLoading){
    return (
      <div className="flex flex-col space-y-5 animate-pulse duration-100">
        <div className="h-[30vh] p-3 bg-gray-600">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"/>
          <div className="h-44 bg-gray-200 dark:bg-gray-700 mb-2.5"/>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"/>
        </div>
        <div className="h-[30vh] p-3 bg-gray-600">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"/>
          <div className="h-44 bg-gray-200 dark:bg-gray-700 mb-2.5"/>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"/>
        </div>
        <div className="h-[30vh] p-3 bg-gray-600">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"/>
          <div className="h-44 bg-gray-200 dark:bg-gray-700 mb-2.5"/>
          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"/>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">

      {data?.pages.map((page) => (
        <div>
          {page?.posts.map((post: PostData) => (
            <Post
            id={post.id} 
            key={post.id}
            userId={post.authorId}
            userprofile={post.author.profileImgSrc}
            username={post.author.username}
            title={post.title}
            description={post.description}
            imageSrc={post.imageSrc}
            date={post.createdAt} 
            votes={post.votes}
            voteData={post.voteRecords}  
            /> 
          ))}
        </div>
      ))}
      <div ref={ref}>
        {isFetching ? <Loader2 className=" animate-spin"/>: hasNextPage ? "": "No more Posts."}
      </div>
    </div>
  );
}

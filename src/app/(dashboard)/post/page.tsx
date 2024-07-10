'use client'
import { UploadDropzone } from '@/lib/uploadthing'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Slide, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


 function Post() {
  const [title, settitle] = useState<string | null >(null)
  const [description, setDescription] = useState<string | null >(null)
  const [imageSrc, setImageSrc] = useState<string | null >(null)
  const session =  useSession()

  async function postdata(){
    console.log(imageSrc);
    
    try {
      const postResponce = await axios.post('/api/post', {
        title,
        description,
        imageSrc,
        authorId: session.data?.user?.id
      })
      toast(postResponce.data.msg ,{
        position: "bottom-right",
        theme: "dark",
        hideProgressBar: false,
        autoClose: 3000,
        transition: Slide,

      })
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <div className='flex flex-col space-y-4'>
      <div>
        <h3 className=' text-2xl'>Title</h3>
        <input type="text" className=' bg-gray-700 outline-none w-[40vw] h-10 rounded-xl p-3' placeholder='Title'
        onChange={(e) => settitle(e.target.value)}
        />
      </div>
      <div>
        <h3 className=' text-2xl'>Description</h3>
        <input type="text" className=' bg-gray-700 outline-none w-[40vw] h-10 rounded-xl p-3' placeholder='Description'
        onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div> 
        <h3 className=' text-2xl'>Photos</h3>
        <UploadDropzone
        endpoint='imageUploader'
        onClientUploadComplete={async (res)=> {
          console.log(res);
          console.log(res[0].url);
          
          setImageSrc(res[0].url)
          
          
        }}
        />
      </div>
      <button className='border w-[40vw] h-10 rounded-xl' onClick={() => postdata()}>Post</button>
      <Link href={'/sss'}>
        <div>
          <div onClick={(e)=> {
            e.stopPropagation()
          }}>
            hii
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Post
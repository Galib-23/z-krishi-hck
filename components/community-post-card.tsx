import { Info } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CommunityPostCard = ({ post }: any) => {
  const upvotes = post.votes.filter((vote: any) => vote.type === "UPVOTE").length || 0;
  const downvotes = post.votes.filter((vote: any) => vote.type === "DOWNVOTE").length || 0;
  return (
    <div className="w-full max-w-4xl rounded-md border bg-transparent flex items-center ">
      <Image className="w-44 h-32 object-cover rounded-l-md" width={288} height={192} src={post.postImage} alt="productimage" />

      <div className="w-full p-4">
        <div className="">
          <h1 className="font-semibold text-black">{post.postTitle}</h1>
          <p className="text-sm line-clamp-2">{post.postDescription}</p>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between items-center mt-3'>
          <Link href={`/community/${post.id}`}>
            <button className="text-sm bg-transparent border border-blue-400 text-blue-400 py-1 px-5 flex flex-row-reverse gap-2 items-center hover:text-black rounded-md hover:bg-blue-400">View Details <Info size={14} /></button>
          </Link>
          <div className='flex gap-3'>
            <p className='text-xs text-gray-600'><span className='font-semibold'>Upvotes: </span>{upvotes}</p>
            <p className='text-xs text-gray-600'><span className='font-semibold'>Downvotes: </span>{downvotes}</p>
            <p className='text-xs text-gray-600'><span className='font-semibold'>Answers: </span>{post.answers?.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommunityPostCard
import CommunityNav from '@/components/community-nav'
import CommunityPostCard from '@/components/community-post-card'
import prisma from '@/lib/prisma'
import React from 'react'

const Community = async () => {
  const communityPosts = await prisma.communityPost.findMany({
    include: {
      answers: true,
      votes: true
    }
  });
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='w-full '>
        {/* nav */}
        <CommunityNav />
        {/* others */}
        <div className='flex flex-col items-center mt-6'>
          <h2 className='text-xl mb-4 underline'>Posts</h2>
          <div className='flex flex-col gap-4'>
            {
              communityPosts?.map((post: any) => (
                <CommunityPostCard post={post} key={post.id} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
import prisma from "@/lib/prisma";
import Image from "next/image";
import { CommunityNav } from "../page";
import PostVotes from "@/components/post-votes";
import CommunityAnswers from "@/components/community-answers";

interface PostPageProps {
  params: {
    postId: string;
  };
}

const CommunityPostDetails = async ({ params }: PostPageProps) => {
  const { postId } = await params;
  let formattedDate;
  const post = await prisma.communityPost.findUnique({
    where: {
      id: postId
    },
    include: {
      votes: true
    }
  });
  if (post) {
    const createdAt = post.createdAt;
    formattedDate = new Date(createdAt).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
  return (
    <div className="min-h-screen">
      <CommunityNav />
      <div className="flex flex-col items-center mt-6">
        <Image className="rounded-xl shadow-lg h-[300px] w-[300px]" src={post?.postImage as string} height={500} width={500} alt="postimg" />
        <div className="max-w-4xl mt-8">
          <h1 className="text-xl text-center md:text-3xl font-bold">{post?.postTitle}</h1>
          <p className="text-sm text-left text-gray-600 mt-5">{post?.postDescription}</p>
          <p className="text-xs text-left text-gray-600 mt-6">{formattedDate}</p>
          <PostVotes post={post} />
          {
            post && <div className="mt-10">
            <CommunityAnswers post={post} />
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default CommunityPostDetails
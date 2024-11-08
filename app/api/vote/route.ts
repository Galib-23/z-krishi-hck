import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import { auth } from "@/auth";

export async function POST(request: Request) {
  const { postId, voteType } = await request.json();
  const session = await auth();
  if (!session || !session.user) {
    throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
  }

  const userId = session.user.id;

  console.log(postId, voteType);

  if (!postId || !voteType) {
    throw new CustomError("Please fill all the fields", 401, "MISSING_FIELDS");
  }

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: userId,
        communityPostId: postId,
      },
    });

    let post;

    if (existingVote) {
      post = await prisma.communityPost.findUnique({
        where: { id: postId },
        include: {
          votes: true,
        },
      });
      const upvotes =
        post?.votes.filter((vote) => vote.type === "UPVOTE").length || 0;
      const downvotes =
        post?.votes.filter((vote) => vote.type === "DOWNVOTE").length || 0;

      return NextResponse.json({ upvotes, downvotes });
    }

    const vote = await prisma.vote.create({
      data: {
        userId: userId!,
        communityPostId: postId,
        type: voteType === "UPVOTE" ? "UPVOTE" : "DOWNVOTE",
      },
    });

    post = await prisma.communityPost.findUnique({
      where: { id: postId },
      include: {
        votes: true,
      },
    });

    const upvotes =
      post?.votes.filter((vote) => vote.type === "UPVOTE").length || 0;
    const downvotes =
      post?.votes.filter((vote) => vote.type === "DOWNVOTE").length || 0;

    return NextResponse.json({ upvotes, downvotes });
  } catch (error) {
    console.error("Error casting vote:", error);
    return errorHandler(error);
  }
}

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const postId = url.searchParams.get("postId");

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const post = await prisma.communityPost.findUnique({
      where: { id: postId },
      include: {
        votes: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const upvotes =
      post?.votes.filter((vote) => vote.type === "UPVOTE").length || 0;
    const downvotes =
      post?.votes.filter((vote) => vote.type === "DOWNVOTE").length || 0;

    console.log(post?.votes);

    return NextResponse.json({ upvotes, downvotes });
  } catch (error: any) {
    console.error("Error fetching vote counts:", error);
    return errorHandler(error.message);
  }
};

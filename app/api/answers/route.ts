import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { answerContent, communityPostId } = await req.json();
  
    if (!answerContent || !communityPostId) {
      throw new CustomError("Fields missing", 400, "MISSING_FIELDS");
    }
  
    const session = await auth();
    if (!session || !session.user) {
      throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }
  
    const answer = await prisma.answer.create({
      data: {
        answerContent,
        communityPostId,
        userId: session.user.id!
      },
      include: {
        user: true
      }
    });
    return NextResponse.json(answer);
  } catch (error) {
    return errorHandler(error);
  }
};

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
  }
  try {
    const answers = await prisma.answer.findMany({
      where: {
        communityPostId: postId,
      },
      include: {
        user: true,
        votes: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ answers });
  } catch (error) {
    console.error('Error fetching answers:', error);
    return NextResponse.json({ error: 'Error fetching answers' }, { status: 500 });
  }
}
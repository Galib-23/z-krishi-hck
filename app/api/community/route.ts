import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { postTitle, postDescription, postImage } = await req.json();
    console.log({
      postTitle,
      postDescription,
      postImage
    })
    if (!postTitle || !postDescription || !postImage) {
      throw new CustomError("Fields missing", 400, "MISSING_FIELDS");
    }

    const session = await auth();
    if (!session || !session.user) {
      throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }

    const userId = session.user.id;

    const newCommunityPost = await prisma.communityPost.create({
      data: {
        postTitle,
        postDescription,
        postImage,
        userId: userId!,
      },
    });

    return NextResponse.json(newCommunityPost);
  } catch (error) {
    return errorHandler(error);
  }
};

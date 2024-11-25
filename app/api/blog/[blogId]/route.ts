import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { blogId: string } },
) => {
  try {
    const { blogId } = await params;

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId
      },
      include: {
        user: true
      }
    });

    if (!blog) {
      throw new CustomError("Blogblog not found", 404, "NOT_FOUND");
    }

    return NextResponse.json(blog);
  } catch (error) {
    return errorHandler(error);
  }
};
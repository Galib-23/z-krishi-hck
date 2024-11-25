import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const {
      blog_title,
      blog_description,
      blog_img
    } = await request.json();
    const session = await auth();
    if (!session) {
      throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }
    if (
      !blog_title ||
      !blog_description ||
      !blog_img
    ) {
      throw new CustomError("Fields missing", 400, "MISSING_FIELDS");
    }
    const blog = await prisma.blog.create({
      data: {
        blogTitle: blog_title,
        blogContent: blog_description,
        blogImage: blog_img,
        userId: session.user.id!
      }
    });
    return new Response(JSON.stringify(blog), { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const GET = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        user: true
      }
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return errorHandler(error);
  }
}

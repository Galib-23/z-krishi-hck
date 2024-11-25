import { auth } from "@/auth"
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    if (!session) {
        throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    })
    return NextResponse.json(user);
  } catch (error) {
    return errorHandler(error);
  }
}
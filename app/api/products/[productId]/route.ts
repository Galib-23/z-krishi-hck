import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { productId: string } },
) => {
  try {
    const { productId } = await params;
    const user = await auth();

    if (!user) {
      throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }

    //TODO: user.id != product.userId
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) {
      throw new CustomError("Product not found", 404, "NOT_FOUND");
    }

    return NextResponse.json(product);
  } catch (error) {
    return errorHandler(error);
  }
};

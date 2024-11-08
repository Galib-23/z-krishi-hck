import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { cartItemId: string } },
) => {
  try {
    const { cartItemId } = await params;
    if (!cartItemId) {
      throw new CustomError("Cart Id missing", 401, "MISSING_ID");
    }
    const session = await auth();
    if (!session || !session.user) {
      throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }

    await prisma.cartItem.delete({
      where: {
        id: cartItemId
      }
    });

    return NextResponse.json({message: "Delete successfully"}, {status: 200})

  } catch (error) {
    return errorHandler(error);
  }
};

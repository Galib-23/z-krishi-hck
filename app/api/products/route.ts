import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const {
      product_name,
      product_type,
      product_description,
      product_image,
      product_price,
      product_remaining,
    } = await request.json();

    const user = await auth();
    if (!user) {
      throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
    }

    if (
      !product_name ||
      !product_type ||
      !product_description ||
      !product_image ||
      !product_price ||
      !product_remaining
    ) {
      throw new CustomError("Fields missing", 400, "MISSING_FIELDS");
    }

    const productPrice = parseInt(product_price);
    const productRemaining = parseInt(product_remaining);

    const product = await prisma.product.create({
      data: {
        productName: product_name,
        productType: product_type,
        productDescription: product_description,
        productImage: product_image,
        productPrice: productPrice,
        productRemaining: productRemaining,
        userId: user.user.id!,
      },
    });

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
};

export const GET = async (request: NextRequest) => {
  const productType = request.nextUrl.searchParams.get("productType");
  const user = await auth();

  let products;

  if (!user) {
    products = await prisma.product.findMany({
      where: {
        productType: productType as ProductType,
      },
    });
  } else {
    products = await prisma.product.findMany({
      where: { productType: productType as ProductType },
    });
  }

  return NextResponse.json(products, { status: 200 });
};

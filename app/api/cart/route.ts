import { auth } from "@/auth";
import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session || !session.user) {
    throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
  }
  const userId = session.user.id;

  const { productId, quantity } = await req.json();

  if (!productId || !quantity) {
    throw new CustomError("Fields missing", 403, "MISSING_FIELDS");
  }

  try {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: userId!,
          items: {
            create: {
              productId,
              quantity: +quantity,
            },
          },
        },
        include: { items: true },
      });
    } else {
      const cartItem = cart.items.find((item) => item.productId === productId);

      if (cartItem) {
        await prisma.cartItem.update({
          where: {
            id: cartItem.id,
          },
          data: {
            quantity: cartItem.quantity + parseInt(quantity),
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: +quantity,
          },
        });
      }
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new CustomError("Product not found", 404, "NOT_FOUND");
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        productRemaining: product?.productRemaining - parseInt(quantity),
      },
    });

    return NextResponse.json(cart);
  } catch (error) {
    return errorHandler(error);
  }
};

export const GET = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
  }
  const userId = session.user.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                productName: true,
                productDescription: true,
                productImage: true,
                productPrice: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return errorHandler(error);
  }
};

export const DELETE = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new CustomError("Unauthorized", 401, "UNAUTHORIZED");
  }
  const userId = session.user.id;
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        userId: userId,
      },
    });
    const cartItems = await prisma.cartItem.findMany({
      where: {
        cartId: cart?.id,
      },
      include: {
        product: true,
      },
    });

    for (const cartItem of cartItems) {
      if (cartItem.product) {
        await prisma.product.update({
          where: {
            id: cartItem.productId,
          },
          data: {
            totalSold: {
              increment: cartItem.quantity,
            },
          },
        });
      }
    }
    await prisma.cart.deleteMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Checkout Successfull" });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return errorHandler(error);
  }
};

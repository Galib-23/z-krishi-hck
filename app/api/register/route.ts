import { CustomError } from "@/errors/custom-error";
import prisma  from "@/lib/prisma";
import { errorHandler } from "@/lib/error-handler";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    let user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new CustomError("User already exists", 401, "USER_ALREADY_EXISTS");
    }

    const userAvatar = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
    
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: userAvatar
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return errorHandler(error);
  }
};

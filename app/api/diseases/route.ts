import { CustomError } from "@/errors/custom-error";
import { errorHandler } from "@/lib/error-handler";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const diseaseName = req.nextUrl.searchParams.get('diseaseName');
    if (!diseaseName) {
      throw new CustomError("Please provide diseasName", 401, "MISSING_FIELDS");
    }
    const disease = await prisma.disease.findFirst({
      where: {
        diseaseName: diseaseName,
      },
    });
    if (!disease) {
      throw new CustomError("Disease not found", 404, "NOT_FOUND");
    }
    return NextResponse.json(disease);
  } catch (error) {
    return errorHandler(error);
  }
};

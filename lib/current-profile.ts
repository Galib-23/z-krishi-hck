import { auth } from "@/auth"
import prisma from "./prisma";
import { redirect } from "next/navigation";

export const currentProfile = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return null;
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  });

  if (!profile) {
    redirect('/');
  }

  return profile;
}
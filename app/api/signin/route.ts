import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(request: Request) {
  const { email, password } = await request.json();


  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (result?.error) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }
  return NextResponse.json({ message: "Successfully signed in!" });
}

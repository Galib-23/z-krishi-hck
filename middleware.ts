import {
  SIGNIN,
  PROTECTED_SUB_ROUTES,
  PUBLIC_ROUTES,
  ROOT,
} from "@/constants/routes";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";


export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();

  const isAuthenticated = !!session?.user;
  //console.log(isAuthenticated, nextUrl.pathname);

  const isPublicRoute =
    PUBLIC_ROUTES.find(
      (route) =>
        nextUrl.pathname.startsWith(route) || nextUrl.pathname === ROOT,
    ) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(SIGNIN, nextUrl));
  }
}

//without these route, in every route middleware will be invoked
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

import NextAuth, { AuthError } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export class CustomAuthError extends AuthError {
  constructor(msg: string) {
    super();
    this.message = msg;
    this.stack = undefined;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }
        try {
          const user = (await prisma.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          }));
          if (user) {
            const isPasswordCorrect = bcrypt.compareSync(
              credentials.password as string,
              user.password!,
            );
            if (isPasswordCorrect) {
              console.log("Returned user");
              return user;
            } else {
              throw new CustomAuthError("Wrong credentials");
            }
          } else {
            throw new CustomAuthError("User not found");
          }
        } catch (error: any) {
          console.log("Error in authorize fun: ", error);
          throw new CustomAuthError(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: session.user.email,
          emailVerified: null,
          role: session.user.role,
        }
      }
      return session;
    },
  },
});

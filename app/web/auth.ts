import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { db } from "@/lib/db";
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
  trustHost: true,
})
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [
    Google,
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          // const passwordsMatch = await bcrypt.compare(
          //     password,
          //     user.password
          // );

          const passwordsMatch = password === user.password;

          if (passwordsMatch) {
            // Return a user object that matches the expected User type
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role || undefined,
              image: user.image,
              emailVerified: user.emailVerified,
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

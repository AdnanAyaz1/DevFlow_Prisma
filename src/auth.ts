import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // Assuming you're using bcrypt for password hashing
import { db } from "./lib/primsadb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: email as string,
          },
        });
        if (!user) {
          throw new Error("The Email or the Password is incorrect");
        }
        const isValid = await bcrypt.compare(
          password as string,
          user?.password as string
        );
        if (!isValid) {
          throw new Error("The Email or the Password is incorrect");
        }

        if (user && isValid)
          return {
            id: user.id as string,
            email: user.email as string,
            name: user.name as string,
            provider: "credentials",
          };
        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // in case of credentials login only the user is created and the account is not created
      // in case of social login both the user and the account are created
      if (account) {
        // If it's a social login, handle creation of user and token
        if (account.provider !== "credentials") {
          const providerAccountId = account.providerAccountId;
          const provider = account.provider;

          let existingUser = await db.user.findFirst({
            where: {
              provider: provider as string,
            },
          });

          if (!existingUser) {
            existingUser = await db.user.create({
              data: {
                name: user?.name as string,
                email: user?.email as string,
                image: user?.image as string,
                provider: provider as string,
              },
            });
          }

          // Attach the user ID to the token for session handling
          token.sub = existingUser.id;
        }
      }
      if (account?.provider === "credentials") {
        // If the user logs in using credentials
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});

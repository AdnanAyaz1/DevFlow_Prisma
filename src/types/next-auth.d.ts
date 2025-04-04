import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      bookmarks?: string[];
      provider: string;
      providerAccountId: string;
    } & DefaultSession["user"]; // Extend DefaultSession["user"] to keep existing properties
  }

  interface User extends DefaultUser {
    bookmarks?: string[];
    provider: string;
    providerAccountId?: string;
  }
}

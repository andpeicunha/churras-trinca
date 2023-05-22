import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "@/app/lib/mongoConnect";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),

  pages: {
    verifyRequest: "/auth/verify",
    signIn: "/auth/signin",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

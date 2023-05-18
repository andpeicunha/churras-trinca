import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "@/app/lib/mongoConnect";

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // pages: {
  //   verifyRequest: "/auth/verify",
  // },
  providers: [
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
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import clientPromise from "@/app/lib/mongoConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    verifyRequest: "/auth/verify",
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({
        signInUser: user,
        signInAccount: account,
        signInProfile: profile,
        signInEmail: email,
        signInCredentials: credentials,
      });
      if (account?.provider === "google") {
        console.log("Google sign-in detected.");
        console.log("User email:", user.email);
        console.log("Profile:", profile);
        console.log("Account:", account);
      }

      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt callback");
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      console.log({ token, user, account, profile, isNewUser });
      return token;
    },

    async session({ session, user, token, newSession }) {
      console.log("session callback");

      console.log({ YESESSIONHERE: session, YESUSER: user, token, newSession });
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
        // (session.user.id = token.sub as string),
        //   (session.user.email = token.email as string);
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

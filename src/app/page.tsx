// "use client";
import "./global.css";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { Agenda } from "./components/agenda";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <body className={inter.className}>
        <Agenda />
      </body>
    </>
  );
}

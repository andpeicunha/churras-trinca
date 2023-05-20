// "use client";

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "./api/auth/[...nextauth]/route";
import { Agenda } from "./components/agenda/page";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <Agenda />
    </>
  );
}

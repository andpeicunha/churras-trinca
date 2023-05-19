"use client";
import React from "react";

import { signOut, useSession } from "next-auth/react";

export function Agenda() {
  const { data: session } = useSession({
    required: true,
    // onUnauthenticated() {
    //   redirect("/auth/signin?callbackUrl=/agenda");
    // },
  });

  return (
    <>
      <div>Agenda</div>
      <div>{session?.user?.email}</div>
      <button onClick={() => signOut()}>Sair</button>
    </>
  );
}

"use client";

import { LoginButton, LogoutButton } from "@/components/buttons.component";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <head>
        <title>Churras</title>
        <meta property="og:title" content="Churras - Trinca" key="title" />
      </head>
      <body>
        <div>
          <LoginButton />
          {JSON.stringify(session?.user)}
          <LogoutButton />
        </div>
      </body>
    </>
  );
}

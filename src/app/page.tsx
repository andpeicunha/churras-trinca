"use client";

import Style from "./styles/page.module.scss";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <>
      <head>
        <title>Churras</title>
        <meta property="og:title" content="Churras - Trinca" key="title" />
      </head>
      <body>
        <div className={Style.main}>
          <button onClick={() => signIn()}>Login</button>
        </div>
      </body>
    </>
  );
}

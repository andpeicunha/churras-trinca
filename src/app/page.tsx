"use client";

import "./globals.css";

import { useSession } from "next-auth/react";

import Style from "./styles/page.module.scss";
import { Login } from "./components/login";
import { Agenda } from "./components/agenda";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <div className={Style.main}>
          <div id="valida">Verificando usuário...</div>
        </div>
      </>
    );
  }

  if (!session) {
    return (
      <>
        <div className={Style.main}>
          <Login />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={Style.main}>
        <Agenda />
      </div>
    </>
  );
}

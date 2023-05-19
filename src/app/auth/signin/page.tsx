"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { ButtonSubmit } from "@/app/components/button.component";
import { Agenda } from "@/app/components/agenda/page";

import Style from "./page.module.scss";

export default function SignInPage() {
  const [email, setEmail] = useState("");

  const { data: session, status } = useSession();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn("email", { redirect: true, email: email });
  };

  if (status === "loading") {
    return <div className={Style.main}>Verificando Login...</div>;
  }

  if (session) {
    return (
      <>
        <Agenda />
      </>
    );
  }

  return (
    <>
      <div className={Style.main}>
        <div className={Style.img}>
          <Image
            src="/churras-firma.jpg"
            alt="logo"
            fill={true}
            priority
            sizes="(max-width: 1000px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className={Style.formMain}>
          <h1>Agenda de Churras</h1>

          <form onSubmit={onSubmit}>
            <label>Email</label>
            <br />
            <input
              type="text"
              placeholder="E-mail"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            <ButtonSubmit value="Entrar" />
          </form>
        </div>
      </div>
    </>
  );
}

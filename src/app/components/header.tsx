"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";
import { getEvents, Event, addEvent } from "@/app/lib/axiosFetch";

import Style from "./header.module.css";

export function Agenda() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <>
      <section className={Style.main}>
        <div>{session?.user?.email}</div>

        <button onClick={() => signOut()}>Sair</button>
        <Image
          src="/bg-home-full.png"
          alt="background"
          fill
          sizes="(max-width: 768px) 100vw"
          quality={90}
          priority
          className={Style.imgBg}
        />
      </section>
    </>
  );
}

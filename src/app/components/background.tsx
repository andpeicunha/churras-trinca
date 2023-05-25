import React from "react";
import Image from "next/image";

import S from "./background.module.scss";
export function BgMain(props: { status?: string; type?: "one" | "two" }) {
  const status = props.status;
  const type = props.type;

  return (
    <>
      <section className={S.mainBg}>
        <Image
          src="/bg-home-full.png"
          alt="background"
          fill
          sizes="(max-width: 768px) 100vw"
          quality={90}
          priority
          className={S.imgBg}
        />
        {type === "one" ? null : status === "loading" ? (
          <div className={S.bgCinzaLoad} />
        ) : (
          <div className={S.bgCinza} />
        )}
      </section>
    </>
  );
}

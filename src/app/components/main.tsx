import React from "react";
import Image from "next/image";

import Style from "@/app/agenda/page.module.scss";
export function BgMain(props: any) {
  const status = props.status;
  return (
    <>
      <Image
        src="/bg-home-full.png"
        alt="background"
        fill
        sizes="(max-width: 768px) 100vw"
        quality={90}
        priority
        className={Style.imgBg}
      />
      {status === "loading" ? <div className={Style.bgCinzaLoad} /> : <div className={Style.bgCinza} />}
    </>
  );
}

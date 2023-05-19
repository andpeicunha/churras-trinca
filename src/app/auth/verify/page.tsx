import React from "react";

import Image from "next/image";
import Style from "./page.module.scss";

export default function Verify() {
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

        <div className={Style.container}>
          <div className={Style.box}>
            <h1 className={Style.title}>Verifique seu E-mail</h1>

            <div className={Style.divider} />
            <h5 className={Style.subtitle}>Enviamos um e-mail com o link para liberar seu acesso</h5>
            <h6 className={Style.subtitle}>Lembre de ver também o Lixo Eletrônico ou Spam. </h6>
          </div>
        </div>
      </div>
    </>
  );
}

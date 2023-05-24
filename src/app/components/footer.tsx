import React from "react";
import Image from "next/image";

import Style from "./footer.module.scss";
export function Footer() {
  return (
    <>
      <div className={Style.footerMain}>
        <Image src={"/logo-trinca.png"} alt="Logotipo Trinca" width={48} height={48} />
      </div>
    </>
  );
}

import React from "react";

import style from "./button.module.scss";

interface IPropsButtonSubmit {
  value: string;
}
export function ButtonSubmit(props: IPropsButtonSubmit) {
  return (
    <>
      <button className={style.button} type="submit">
        {props.value}
      </button>
    </>
  );
}

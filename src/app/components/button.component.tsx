import React from "react";

import style from "./button.module.scss";

interface IPropsButtonSubmit {
  value: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}
export function ButtonSubmit(props: IPropsButtonSubmit) {
  return (
    <>
      <button className={style.button} type={props.type} onClick={props.onClick}>
        {props.value}
      </button>
    </>
  );
}

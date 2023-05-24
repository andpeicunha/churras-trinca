import React from "react";
import Image from "next/image";
import style from "./button.module.scss";
import Style from "@/app/agenda/page.module.scss";

interface IPropsButtonSubmit {
  value: string;
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
}

interface IPropsButtonEvent {
  onClick: () => void;
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

export function ButtonViewMore() {
  return (
    <>
      <Image src="/icon-add-user.png" alt="Inserir Novos ChurrasLovers" width={20} height={20} />
    </>
  );
}

export function ButtonAddEvent({ ...props }: IPropsButtonEvent) {
  return (
    <div className={Style.eventContainer} data-testid="bt-add-event">
      <button onClick={props.onClick}>
        <Image src="/bt-add-event-redondo.png" alt="plus" width={90} height={90} priority />
      </button>
    </div>
  );
}

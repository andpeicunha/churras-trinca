import React from "react";
import Style from "./agenda.module.scss";
import Image from "next/image";

interface IPropsButtonEvent {
  onClick: () => void;
}
export default function ButtonAddEvent({ ...props }: IPropsButtonEvent) {
  return (
    <div className={Style.eventContainer} data-testid="bt-add-event">
      <button onClick={props.onClick}>
        <Image src="/bt-add-event-redondo.png" alt="plus" width={90} height={90} priority />
      </button>
    </div>
  );
}

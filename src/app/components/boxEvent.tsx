import React from "react";

import Image from "next/image";
import Link from "next/link";

import { IPropsEvent } from "@/app/lib/axiosFetch";

import Style from "@/app/agenda/page.module.scss";

interface IPropsBoxEvent extends IPropsEvent {
  onClick: () => void;
}

export function BoxEvent({ ...props }: IPropsBoxEvent) {
  return (
    <div
      data-testid={`section-event-${props._id.toString()}`}
      key={props._id.toString()}
      className={Style.eventContainer}
      onClick={props.onClick}
    >
      <div>
        <div className={Style.date}>{props.date}</div>
        <div className={Style.nameEvent}>{props.name}</div>
        <div className={Style.description}>{props.description}</div>
      </div>

      <div className={Style.details}>
        <div className={Style.people}>
          <Image src="/icon-people.png" alt="Qtde de Pessoas" width={20} height={20} />
          <span>{!props.total_people ? " -" : props.total_people}</span>
        </div>
        <div className={Style.money}>
          <Image src="/icon-money.png" alt="Qtde de Pessoas" width={20} height={20} />
          <span>{!props.current_total ? " -" : `R$ ${props.current_total}`}</span>
        </div>
      </div>
    </div>
  );
}

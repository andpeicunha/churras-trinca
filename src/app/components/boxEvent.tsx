"use client";
import React, { useEffect } from "react";
import Image from "next/image";

import { IPropsEvent } from "@/app/lib/axiosFetch";
import Style from "@/app/agenda/page.module.scss";

interface IPropsBoxEvent extends IPropsEvent {
  onClick: () => void;
}

export function BoxEvent({ ...props }: IPropsBoxEvent) {
  const [sumTotal, setSumTotal] = React.useState(0);
  const [countUsers, setCountUsers] = React.useState(0);

  console.log(props.users?.length);
  useEffect(() => {
    if (props.users) {
      const countValorTotal = props.users.reduce((acc: number, curr: { value: any }) => acc + Number(curr.value), 0);
      const countTotalUsers = props.users.length;
      setSumTotal(countValorTotal);
      setCountUsers(countTotalUsers);
    }
  }, []);

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
          <span className={Style.number}>{!countUsers ? " -" : countUsers}</span>
        </div>
        <div className={Style.money}>
          <Image src="/icon-money.png" alt="Qtde de Pessoas" width={20} height={20} />
          <span className={Style.number}>{!sumTotal ? " -" : `R$ ${sumTotal}`}</span>
        </div>
      </div>
    </div>
  );
}

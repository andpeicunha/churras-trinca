"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { getEvents, Event, addEvent } from "@/app/lib/axiosFetch";
import { HeaderUser } from "./header";

import Style from "./agenda.module.scss";
import { Modal, Skeleton } from "@mui/material";
import { raleway } from "@/app/styles/fonts";

export function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession({
    required: true,
  });

  useEffect(() => {
    async function fetchEvents() {
      const eventsList = await getEvents();

      if (eventsList) {
        //@ts-ignore
        const eventData = eventsList.events;
        setEvents(eventData);
      }
    }
    if (events.length === 0) {
      fetchEvents();
    }
  }, [events]);

  function handleAddNewEvent() {
    const newName = "New Event 2";
    const newDate = "05-06-2023";
    addEvent(newName, newDate);
  }

  function handleViewDetailsEvent(event: string) {
    console.log(event);
    setEvents([]);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className={Style.main}>
        <HeaderUser />
        <div className={Style.title}>Agenda de Churras</div>

        {status === "loading" ? (
          <>
            <div className={Style.eventsMain}>
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
            </div>
          </>
        ) : (
          events.length !== 0 && (
            <div className={Style.eventsMain}>
              {events.map((e) => (
                <div
                  key={e._id.toString()}
                  className={Style.eventContainer}
                  onClick={() => handleViewDetailsEvent(e._id.toString())}
                >
                  <div>
                    <div className={Style.date}>{e.date}</div>
                    <div className={Style.nameEvent}>{e.name}</div>
                  </div>

                  <div className={Style.details}>
                    <div className={Style.people}>
                      <Image src="/icon-people.png" alt="Qtde de Pessoas" width={20} height={20} />
                      <span className={raleway.className}>{!e.total_people ? "0" : e.total_people}</span>
                    </div>
                    <div className={Style.money}>
                      <Image src="/icon-money.png" alt="Qtde de Pessoas" width={20} height={20} />
                      <span className={raleway.className}>{!e.current_total ? "R$ 150" : `R$ ${e.current_total}`}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className={Style.eventContainer}>
                <button onClick={handleOpen}>
                  <Image src="/bt-add-event.png" alt="plus" width={90} height={90} priority />
                  <span>Adicionar Churras</span>
                </button>
              </div>
            </div>
          )
        )}

        <Image
          src="/bg-home-full.png"
          alt="background"
          fill
          sizes="(max-width: 768px) 100vw"
          quality={90}
          priority
          className={Style.imgBg}
        />
        <div className={Style.bgCinza} />
      </section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>Teste Children</div>
      </Modal>
    </>
  );
}

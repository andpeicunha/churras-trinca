"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";
import { getEvents, Event, addEvent } from "@/app/lib/axiosFetch";

import Style from "./agenda.module.scss";

export function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);
  const { data: session } = useSession({
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

  function handleNewEvent() {
    const newName = "New Event 2";
    const newDate = "05-06-2023";
    addEvent(newName, newDate);
  }

  return (
    <>
      <section className={Style.main}>
        <div className={Style.title}>Agenda de Churras</div>
        <div>{session?.user?.email}</div>

        {Array.isArray(events) && events.length !== 0 && (
          <div>
            <ul>
              {events.map((e) => (
                <li key={e._id.toString()}>{e.name}</li>
              ))}
            </ul>
          </div>
        )}
        <button onClick={handleNewEvent}>Novo Evento</button>
        <button onClick={() => signOut()}>Sair</button>
        <Image
          src="/bg-home-full.png"
          alt="background"
          fill
          sizes="(max-width: 768px) 100vw"
          quality={90}
          priority
          className={Style.imgBg}
        />
      </section>
    </>
  );
}

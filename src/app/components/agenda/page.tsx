"use client";
import React, { useEffect, useState } from "react";

import { signOut, useSession } from "next-auth/react";
import { getEvents, Event } from "@/app/lib/axiosFetch";

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

  return (
    <>
      <div>Agenda</div>
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

      <button onClick={() => signOut()}>Sair</button>
    </>
  );
}

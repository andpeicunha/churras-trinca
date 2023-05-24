"use client";
import "@/app/global.css";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Inter, Raleway } from "next/font/google";
import { Box } from "@mui/material";

import { getEvents } from "@/app/lib/axiosFetch";
import { HeaderUser } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { BgMain } from "@/app/components/main";
import SAgenda from "@/app/agenda/page.module.scss";
import S from "./page.module.scss";

const inter = Inter({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});
const rale = Raleway({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

interface IProps {
  _id: string;
  name: string;
  date: string;
  description: string;
}

export default function EventDetails() {
  const { status } = useSession({
    required: true,
  });
  const [events, setEvents] = useState<IProps>();
  const params = useParams();
  const id = params.id.toString();

  useEffect(() => {
    if (events === undefined) {
      fetchEvents();
    }
  }, [events]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchEvents() {
    const eventsList = await getEvents(id);

    if (eventsList) {
      //@ts-ignore
      const response = eventsList.event;
      return setEvents(response);
    }
  }

  return (
    <>
      <main className={`${inter.className} ${rale.className}`}>
        <section data-testid="section-agenda" className={SAgenda.main}>
          <HeaderUser />
          <h1 data-testid="title-page" className={SAgenda.title}>
            Agenda de Churras
          </h1>

          <Box className={S.boxDetailMain}>
            {events === undefined ? (
              <>Carregando</>
            ) : (
              <>
                <div className={S.TitleDate}>
                  <div data-testid="event-date">{events.date}</div>
                  <div>Qtde Pessoal</div>
                </div>
                <div className={S.TitleName}>
                  <div data-testid="event-name">{events.name}</div>
                  <div>Valor</div>
                </div>
              </>
            )}
          </Box>

          <BgMain status={status} />
          <Footer />
        </section>
      </main>
    </>
  );
}

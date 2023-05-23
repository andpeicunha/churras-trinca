"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { getEvents, addEvent, IPropsEvent } from "@/app/lib/axiosFetch";
import { HeaderUser } from "./header";

import Style from "./agenda.module.scss";
import { Box, Modal, Skeleton, Input } from "@mui/material";

import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { ButtonSubmit } from "./button.component";
import BoxEvent from "./boxEvent";
import ButtonAddEvent from "./buttonAddEvent";

interface IFormInputs {
  name: string;
  description?: string;
  date: string;
  multipleErrorInput: string;
}

export function Agenda() {
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    criteriaMode: "all",
  });

  const [events, setEvents] = useState<IPropsEvent[]>([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
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

  // const onSubmit = (data: IFormInputs) => alert(JSON.stringify(data));
  function onSubmit(data: IFormInputs) {
    const newEvent = `name=${data.name}&date=${data.date}&description=${data.description}`;
    addEvent(newEvent)
      .then((response) => {
        console.log(response?.status);
        if (response?.status === 200) {
          resetField("name");
          resetField("date");
          resetField("description");
          setEvents([]);
          setMessage("Evento adicionado com sucesso!");
          setOpen(false);
        }
      })
      .catch((error) => {
        // Lida com o erro de chamada da API, se necessário
        console.error("Erro ao adicionar evento: ", error);
      });
  }

  function handleViewDetailsEvent(event: string) {
    console.log(event);
    setEvents([]);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section data-testid="section-agenda" className={Style.main}>
        <HeaderUser />
        <div data-testid="section-title" className={Style.title}>
          Agenda de Churras
        </div>
        {status === "loading" ? (
          <>
            <div data-testid="section-skeleton-loading" className={Style.eventsMain}>
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
              <Skeleton variant="rectangular" width={150} height={150} className={Style.skeleton} />
            </div>
          </>
        ) : (
          events.length !== 0 && (
            <>
              <div data-testid="section-events-main" className={Style.eventsMain}>
                {events.map((e) => (
                  <BoxEvent
                    key={e._id.toString()}
                    onClick={() => handleViewDetailsEvent(e._id.toString())}
                    _id={e._id}
                    name={e.name}
                    date={e.date}
                    description={e.description}
                  />
                ))}
                <ButtonAddEvent onClick={handleOpen} />
              </div>
            </>
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
        {status === "loading" ? <div className={Style.bgCinzaLoad} /> : <div className={Style.bgCinza} />}
      </section>

      <Modal open={open} onClose={handleClose}>
        <Box className={Style.modal} component="form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className={Style.title}>Cadastrar Novo Churras</div>

          <div className={Style.label} data-req>
            Nome do Evento
          </div>
          <Input
            {...register("name", {
              required: "Campo obrigatório",
              maxLength: {
                value: 35,
                message: "Excedeu o tamanho máximo de 35 caracteres.",
              },
            })}
            className={Style.input}
            placeholder="Coloque aqui o nome do evento (Max: 20 caracteres)"
            disableUnderline
          />
          <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message}</p>} />

          <div className={Style.label} data-req>
            Data do Evento
          </div>
          <Input
            {...register("date", {
              required: "Campo obrigatório",
              pattern: {
                value: /\d{2}\/\d{2}/,
                message: "Formato inválido (DD/MM) ex: 05/06",
              },
            })}
            className={Style.input}
            placeholder="Preencha a Data do Evento (DD/MM)"
            disableUnderline
          />
          <ErrorMessage errors={errors} name="date" render={({ message }) => <p>{message}</p>} />

          <div className={Style.label}>Descrição</div>
          <Input
            disableUnderline
            className={Style.input}
            placeholder="Coloque aqui uma breve descrição do evento"
            {...register("description", {
              maxLength: {
                value: 80,
                message: "Excedeu o tamanho máximo de 80 caracteres.",
              },
            })}
          />
          <ErrorMessage errors={errors} name="description" render={({ message }) => <p>{message}</p>} />

          <ButtonSubmit type="submit" value="Cadastrar Evento" />
        </Box>
      </Modal>
    </>
  );
}

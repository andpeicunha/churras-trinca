"use client";
import "@/app/global.css";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Accordion, AccordionDetails, AccordionSummary, Box, Input, InputAdornment, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { addUserEvent, getEvents, IPropsEvent } from "@/app/lib/axiosFetch";
import { HeaderUser } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { BgMain } from "@/app/components/background";
import { ButtonSubmit, ButtonViewMore } from "@/app/components/button";
import SAgenda from "@/app/agenda/page.module.scss";
import S from "./page.module.scss";

interface IProps {
  _id: string;
  name: string;
  date: string;
  description: string;
}

interface IAddUser {
  name: string;
  value: string;
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
      <section data-testid="section-agenda" className={`${SAgenda.main} ${S.main}`}>
        <HeaderUser />
        <h1 data-testid="title-page" className={SAgenda.title}>
          Agenda de Churras
        </h1>
        <Box className={S.boxDetailMain}>
          {events === undefined ? (
            <>Carregando</>
          ) : (
            <>
              <TitleEvent date={events.date} name={events.name} />
              <AddUser />
              <ListUser />
            </>
          )}
        </Box>
        <BgMain status={status} />
        <Footer />
      </section>
    </>
  );
}

function TitleEvent(props: { date: string; name: string }) {
  return (
    <>
      <section className={S.titleSection}>
        <div className={S.TitleDate}>
          <div data-testid="event-date">{props.date}</div>
          <div>
            <Image src="/icon-people.png" alt="Qtde de Pessoas" width={20} height={20} />
          </div>
        </div>
        <div className={S.TitleName}>
          <div data-testid="event-name">{props.name}</div>
          <div>
            <Image src="/icon-money.png" alt="Qtde de Pessoas" width={20} height={20} />
          </div>
        </div>
      </section>
    </>
  );
}

function AddUser() {
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState<IPropsEvent[]>([]);
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddUser>({
    criteriaMode: "all",
  });

  function onSubmit(data: IAddUser) {
    setMessage(" Realizando cadastro, por favor aguarde...");
    const newEvent = `name=${data.name}&value=${data.value}`;
    addUserEvent(newEvent)
      .then((response) => {
        if (response?.status === 200) {
          resetField("name");
          resetField("value");
          setEvents([]);
          setMessage(" Usuário adicionado com sucesso!");

          setTimeout(() => {
            setMessage("");
          }, 1000);
        }
      })
      .catch((error) => {
        // Lida com o erro de chamada da API, se necessário
        console.error("Erro ao adicionar evento: ", error);
      });
  }

  const numCaracterFieldName = 30;

  return (
    <>
      <section className={S.addUserSection}>
        <div className={S.iconAddUser}></div>
        <Accordion className={S.accordionTitle}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Cadastrar Usuários</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <form onSubmit={handleSubmit(onSubmit)} className={S.formAddUser}>
              <div data-testid="input-name">
                <div data-req>Nome</div>
                <Input
                  {...register("name", {
                    required: "Campo obrigatório",
                    maxLength: {
                      value: numCaracterFieldName,
                      message: `Excedeu o tamanho máximo de ${numCaracterFieldName} caracteres.`,
                    },
                  })}
                  placeholder={`Preencha o Nome`}
                  fullWidth
                  autoFocus
                />
                <ErrorMessage errors={errors} name="name" render={({ message }) => <p>{message}</p>} />
              </div>

              <div data-testid="input-valor">
                <div data-req>Valor</div>
                <Input
                  className={S.inputValue}
                  startAdornment="R$"
                  {...register("value", {
                    required: "Campo obrigatório",
                    pattern: { value: /^(?!0+$)\d+$/i, message: "Valor dever maior que 0" },
                    maxLength: {
                      value: 3,
                      message: `Excedeu o tamanho, pode ser de 1 a 999.`,
                    },
                  })}
                  type="number"
                  placeholder={`Valor da contribuição`}
                  fullWidth
                  autoFocus
                />
                <ErrorMessage errors={errors} name="value" render={({ message }) => <p>{message}</p>} />
              </div>
              <ButtonSubmit type="submit" value="Salvar" />
            </form>
          </AccordionDetails>
        </Accordion>
      </section>
    </>
  );
}

function ListUser() {
  return (
    <>
      <div>Lista de Usuários</div>
    </>
  );
}

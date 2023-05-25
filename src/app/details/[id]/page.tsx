"use client";
import "@/app/global.css";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Input,
  InputAdornment,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { v4 as uuidv4 } from "uuid";

import { addUserEvent, deleteUserEvent, getEvents, IPropsEvent } from "@/app/lib/axiosFetch";
import { HeaderUser } from "@/app/components/header";
import { Footer } from "@/app/components/footer";
import { BgMain } from "@/app/components/background";
import { ButtonSubmit, ButtonViewMore } from "@/app/components/button";
import SAgenda from "@/app/agenda/page.module.scss";
import S from "./page.module.scss";
import Link from "next/link";

interface IPropsEvents {
  _id: string;
  name: string;
  date: string;
  description: string;
  users: {
    idUser: string;
    id: string;
    name: string;
    value: string;
  }[];
}

interface IAddUser {
  id?: string;
  idUser: string;
  name: string;
  value: string;
  status: string;
}

export default function EventDetails() {
  const { status } = useSession({
    required: true,
  });
  const [events, setEvents] = useState<IPropsEvents>();
  const [sumTotal, setSumTotal] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
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
      const countValorTotal = response.users.reduce((acc: number, curr: { value: any }) => acc + Number(curr.value), 0);
      setSumTotal(countValorTotal);
      const countUsers = response.users.length;
      setCountUsers(countUsers);
      return setEvents(response);
    }
  }
  const handleSubmit = () => {
    setEvents(undefined);
  };

  return (
    <>
      <section data-testid="section-agenda" className={`${SAgenda.main} ${S.main}`}>
        <HeaderUser />
        <h1 data-testid="title-page" className={SAgenda.title}>
          Agenda de Churras
        </h1>
        <Box className={S.boxDetailMain}>
          <Link href="/" className={S.linkBack} replace>
            <Tooltip title="Voltar" placement="right" arrow>
              <ArrowLeftIcon />
            </Tooltip>
          </Link>

          {events === undefined ? (
            <>
              <CircularProgress sx={{ marginTop: "20px" }} />
            </>
          ) : (
            <>
              <TitleEvent date={events.date} name={events.name} countUser={countUsers} sumTotal={sumTotal} />
              <AddUser id={events._id} handleSubmit={handleSubmit} />
              {events.users.map((user, index) => (
                <ListUser
                  key={index}
                  name={user.name}
                  value={user.value}
                  handleSubmit={handleSubmit}
                  id={events._id}
                  idUser={user.idUser}
                />
              ))}
            </>
          )}
        </Box>
        <BgMain status={status} />
        <Footer />
      </section>
    </>
  );
}

function TitleEvent(props: { date: string; name: string; countUser: number; sumTotal: number }) {
  return (
    <>
      <section className={S.titleSection}>
        <div className={S.TitleDate}>
          <div data-testid="event-date">{props.date}</div>
          <div data-testid="event-icon">
            <Image src="/icon-people.png" alt="Qtde de Pessoas" width={20} height={20} />
            <span className={S.number}>{props.countUser}</span>
          </div>
        </div>
        <div className={S.TitleName}>
          <div data-testid="event-name">{props.name}</div>
          <div data-testid="event-icon">
            <Image src="/icon-money.png" alt="Qtde de Pessoas" width={20} height={20} />
            <span className={S.number}>{props.sumTotal}</span>
          </div>
        </div>
      </section>
    </>
  );
}

function AddUser(props: { id: string; handleSubmit: any }) {
  const [message, setMessage] = useState("");
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<IAddUser>({
    criteriaMode: "all",
  });
  const numCaracterFieldName = 30;
  const idUser = uuidv4();

  function onSubmit(data: IAddUser) {
    setMessage(" Cadastrando...");
    const ON_SUBMIT = props.handleSubmit;

    const newEvent = `id=${props.id}&idUser=${idUser}&name=${data.name}&value=${data.value}&status=pendente`;

    addUserEvent(newEvent)
      .then((response) => {
        //@ts-ignore
        if (response?.status === 200) {
          ON_SUBMIT(undefined);
          resetField("name");
          resetField("value");
          setMessage(" Usuário adicionado com sucesso!");

          setTimeout(() => {
            setMessage("");
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Erro ao adicionar evento: ", error);
      });
  }

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
              <input {...register("status")} defaultValue="pendente" type="hidden" name="status" disabled />
              {message && <p className={S.messageAPI}>{message}</p>}
              <ButtonSubmit type="submit" value="Salvar" />
            </form>
          </AccordionDetails>
        </Accordion>
      </section>
    </>
  );
}

function ListUser(props: { name: string; value: string; handleSubmit: any; id: string; idUser: string }) {
  function onSubmit(idUser: string) {
    const ON_SUBMIT = props.handleSubmit;
    const newEvent = `id=${props.id}&idUser=${props.idUser}`;
    deleteUserEvent(newEvent)
      .then((response) => {
        //@ts-ignore
        if (response?.status === 200) {
          ON_SUBMIT(undefined);
        }
      })
      .catch((error) => {
        console.error("Erro ao adicionar evento: ", error);
      });
  }

  return (
    <>
      <section className={S.listUserSection}>
        <Tooltip title="Excluir" placement="right" arrow onClick={() => onSubmit(props.idUser)}>
          <Image src="/icon-delete-black.png" alt="Apagar Registro" width={14} height={14} />
        </Tooltip>
        <div className={S.listUserName}>{props.name}</div>
        <div className={`${S.number} ${S.listUserValue}`}>R$ {props.value}</div>
      </section>
      <div className={S.divider} />
    </>
  );
}

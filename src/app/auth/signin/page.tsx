"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ButtonSubmit } from "@/app/components/button";
import { Agenda } from "@/app/agenda/page";
import S from "./page.module.scss";
import { Box, LinearProgress, Input, TextField } from "@mui/material";
import { BgMain } from "@/app/components/background";

interface IPropsSignin {
  email: string;
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const { data: session, status } = useSession();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email é obrigatório").email("Email inválido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (data: any) => {
    setMessageLogin("Por favor aguarde...");
    const email = data.email;
    signIn("email", { redirect: true, email: email });
  };

  if (status === "loading") {
    return (
      <>
        <div className={S.loading}>
          <Box sx={{ width: "80%" }}>
            <span className={S.loadingText}>Verificando seu login...</span>
            <LinearProgress />
          </Box>
        </div>
        <BgMain type="one" />
      </>
    );
  }

  if (session) {
    return (
      <>
        <Agenda />
      </>
    );
  }

  return (
    <>
      <div className={S.mainSignin}>
        <div className={S.imgChurrasSection}>
          <Image src="/churras-firma.jpg" alt="logo" fill={true} priority sizes="(max-width: 1000px) 100vw" />
        </div>

        <div className={S.formSection}>
          <h1>Agenda de Churras</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <br />
            <TextField
              {...register("email", {
                required: "Campo obrigatório",
              })}
              placeholder={`digite seu e-mail`}
              className={S.input}
              fullWidth
              autoFocus
            />
            <ErrorMessage errors={errors} name="email" render={({ message }) => <p className={S.error}>{message}</p>} />
            <ButtonSubmit value="Entrar" type="submit" />

            {messageLogin && <p className={S.error}>{messageLogin}</p>}
          </form>
        </div>
      </div>
      <BgMain type="one" />
    </>
  );
}

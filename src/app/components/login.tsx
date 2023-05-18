"use client";

import React, { FormEvent } from "react";

import { getSession, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const delay = 1000;
    const setEmailWithDelay = () => {
      setEmail(e.target.value);
    };

    setTimeout(setEmailWithDelay, delay);
    console.log(email);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    signIn("email", { redirect: true, email: email });
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Email" name="email" id="email" onChange={handleEmailChange} />
          <button type="submit">Acessar</button>
        </form>
      </div>
    </>
  );
};

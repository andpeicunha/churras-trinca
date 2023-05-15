"use client";
import "./globals.css";

import React from "react";
import { NextAuthProvider } from "./providers";

export default function RootLayout(props: { children: string }) {
  return (
    <html lang="pt-BR">
      <head />
      <body>
        <NextAuthProvider>{props.children}</NextAuthProvider>
      </body>
    </html>
  );
}

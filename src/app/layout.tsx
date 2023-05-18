"use client";

import AuthContext from "./lib/authContext";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}

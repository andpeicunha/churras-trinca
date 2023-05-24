"use client";
import React from "react";
import "./global.css";

import AuthContext from "./lib/authContext";

import { Inter, Raleway } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthContext>
      <html className={`${inter.className} ${inter.variable} ${raleway.variable}`}>
        <body>{children}</body>
      </html>
    </AuthContext>
  );
}

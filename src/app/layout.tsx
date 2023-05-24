"use client";
import React from "react";

import AuthContext from "./lib/authContext";

import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthContext>
      <html>
        <body className={inter.className}>{children}</body>
      </html>
    </AuthContext>
  );
}

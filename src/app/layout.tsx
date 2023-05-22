"use client";
import "./global.css";

import AuthContext from "./lib/authContext";
import { inter } from "@/app/styles/fonts";

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body className={inter.className}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}

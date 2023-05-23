"use client";

import AuthContext from "./lib/authContext";

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthContext>
      <html>{children}</html>
    </AuthContext>
  );
}

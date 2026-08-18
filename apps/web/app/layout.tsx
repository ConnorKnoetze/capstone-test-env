import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Roster Converter",
  description: "Local development shell for the roster processing monorepo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

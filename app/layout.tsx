import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JustGo | AI Legal Assistance",
  description: "AI-powered legal assistance for every Filipino",
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

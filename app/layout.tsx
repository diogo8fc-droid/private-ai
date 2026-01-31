import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AgeGate from "./components/AgeGate"; // <--- 1. IMPORTA AQUI
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Private AI",
  description: "Exclusive AI Companions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AgeGate /> {/* <--- 2. ADICIONA ISTO AQUI, ANTES DO CHILDREN */}
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
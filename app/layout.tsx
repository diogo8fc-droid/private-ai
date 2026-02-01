import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AgeGate from "./components/AgeGate"; 
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 1. SEO OTIMIZADO
  title: "Private AI - Chat with Virtual Girlfriends",
  description: "Experience the ultimate AI companionship. Chat with Beatriz, Sofia and more. Uncensored, private, and interactive.",
  keywords: ["ai girlfriend", "virtual companion", "ai chat", "nsfw ai", "beatriz ai"],

  // 2. AQUI ENTRA A VERIFICAÇÃO DO GOOGLE (CORRIGIDO)
  verification: {
    // Apenas o código, sem <meta> e sem name=...
    google: 'KfZRugRLaMScsc7Pd6vUCx0pWh0kGh8Hx9Eh0WIHlRM', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black min-h-screen flex flex-col`}>
        
        <AgeGate /> 
        
        <div className="flex-1">
            {children}
        </div>

        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
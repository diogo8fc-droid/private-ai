import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import AgeGate from "./components/AgeGate"; 
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // 1. SEO OTIMIZADO (Para apareceres nas pesquisas)
  title: "Private AI - Chat with Virtual Girlfriends",
  description: "Experience the ultimate AI companionship. Chat with Beatriz, Sofia and more. Uncensored, private, and interactive.",
  keywords: ["ai girlfriend", "virtual companion", "ai chat", "nsfw ai", "beatriz ai"],

  // 2. AQUI ENTRA A VERIFICAÇÃO DO GOOGLE
  verification: {
    // Apaga o texto abaixo e cola o código estranho que copiaste do Google Search Console
    google: 'COLA_AQUI_O_TEU_CODIGO_DO_GOOGLE', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Adicionei 'flex flex-col min-h-screen' para o Footer ficar sempre em baixo */}
      <body className={`${inter.className} bg-black min-h-screen flex flex-col`}>
        
        <AgeGate /> 
        
        {/* O 'flex-1' empurra o Footer para o fundo se a página for pequena */}
        <div className="flex-1">
            {children}
        </div>

        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
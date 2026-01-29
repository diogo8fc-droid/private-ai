import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AgeGate from "./components/AgeGate";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Private AI - Exclusive AI Companions",
  description: "Chat with realistic AI models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Adicionamos 'flex flex-col min-h-screen' para empurrar o footer para baixo */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-black`}>
        
        {/* O Aviso +18 (Fica por cima de tudo) */}
        <AgeGate /> 
        
        {/* O Conteúdo das Páginas (Cresce para ocupar espaço) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* O Rodapé (Fica sempre no fundo) */}
        <Footer />
        
      </body>
    </html>
  );
}
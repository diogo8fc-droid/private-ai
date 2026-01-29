'use client'; 

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white font-sans relative overflow-hidden">
      
      {/* Imagem de Fundo - Certifica-te que 'login-bg.jpg' está na pasta public */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neutral-900 z-0" /> {/* Fallback caso a imagem falhe */}
        <Image 
          src="/login-bg.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40 blur-sm scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Cartão de Login */}
      <div className="w-full max-w-md bg-neutral-900/60 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/20 shadow-2xl z-10 mx-4">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            Private <span className="text-purple-500">AI</span>
          </h1>
          <p className="text-purple-200/80 text-sm uppercase tracking-widest font-bold">Acesso Restrito +18</p>
        </div>

        {/* Inputs (Apenas Visuais - Sem <form> para evitar erros) */}
        <div className="space-y-5">
          <input type="email" placeholder="Email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition" />
          <input type="password" placeholder="Password" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-purple-500 transition" />

          <Link href="/dashboard" className="block w-full">
            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg uppercase tracking-wide cursor-pointer">
              ENTRAR
            </button>
          </Link>
        </div>

        <div className="mt-8 text-center text-xs text-neutral-400">
          <p>Ao entrar, confirmas que tens mais de 18 anos.</p>
        </div>
      </div>
    </div>
  );
}
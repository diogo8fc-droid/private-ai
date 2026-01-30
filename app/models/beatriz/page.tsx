'use client';

import Link from "next/link";
import { useState } from "react";
import BuyVipButton from "../../components/BuyVipButton"; // Importar botão de pagamento

export default function BeatrizPage() {
  const [showStory, setShowStory] = useState(false);

  // Array com os nomes EXATOS das fotos que tens na pasta public/beatriz/gallery
  // Baseado no teu print: 2.jpg, 4.jpg, 6.jpg, etc.
  const galleryPhotos = [2, 4, 6, 7, 8, 9, 11];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500 selection:text-white pb-20">
      
      <style jsx global>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.2); }
        }
        .animate-zoom {
          animation: slowZoom 10s linear infinite alternate;
        }
      `}</style>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 h-16 flex items-center justify-between px-6">
        <Link href="/dashboard" className="text-xl font-bold tracking-tighter cursor-pointer">
          Private <span className="text-purple-600">AI</span>
        </Link>
        <Link href="/dashboard" className="text-[10px] text-neutral-400 hover:text-white uppercase font-bold tracking-widest border border-white/10 px-3 py-1 rounded-full hover:bg-white/10 transition">
          Close
        </Link>
      </nav>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="pt-24 px-6 max-w-4xl mx-auto">
        
        {/* CABEÇALHO COM STORY */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-10">
          
          {/* FOTO INTERATIVA (Story) */}
          <div 
            className="relative cursor-pointer group flex-shrink-0"
            onClick={() => setShowStory(true)}
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 via-red-500 to-yellow-500 rounded-full opacity-90 group-hover:opacity-100 transition animate-pulse" />
            
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-black z-10 bg-neutral-800">
              <img src="/beatriz/profile.jpg" alt="Beatriz" className="w-full h-full object-cover" />
            </div>

            <div className="absolute bottom-1 right-1 z-20 bg-white text-purple-900 rounded-full p-1.5 border-4 border-black shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" />
              </svg>
            </div>
          </div>
          
          {/* INFO + BOTÃO CHAT */}
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Beatriz</h1>
              <div className="flex items-center gap-1 bg-green-900/40 border border-green-500/30 px-2 py-0.5 rounded text-[10px] text-green-400 font-bold uppercase tracking-wider">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Online
              </div>
            </div>
            
            <p className="text-purple-400 text-xs font-bold tracking-[0.2em] mb-4 uppercase">
              Paris • 22 • Dominant
            </p>
            
            <p className="text-neutral-300 text-sm max-w-md leading-relaxed italic mb-6 mx-auto md:mx-0">
              "Click my picture to see my story. I posted something... risky. Or message me directly below."
            </p>

            <div className="flex justify-center md:justify-start">
                <Link href="/dashboard/chat/beatriz">
                  <button className="flex items-center gap-3 bg-white text-black hover:bg-neutral-200 font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition transform hover:scale-105 active:scale-95">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                      START PRIVATE CHAT
                  </button>
                </Link>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-10" />

        {/* --- ÁREA DE COMPRA DA GALERIA --- */}
        <div className="mb-8 flex items-center justify-between">
           <h3 className="text-xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
             <span className="text-purple-500">VIP</span> Gallery
           </h3>
           <span className="text-xs font-bold text-neutral-500 border border-white/10 px-2 py-1 rounded">12 PHOTOS</span>
        </div>

        {/* BOTÃO DESBLOQUEAR GALERIA */}
        <div className="relative w-full bg-gradient-to-r from-purple-900 to-purple-800 border border-purple-500/30 rounded-2xl p-6 mb-8 shadow-2xl">
            <div className="flex flex-col items-center justify-center">
                <span className="text-2xl mb-2">🔞</span>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-1">Unlock Full Access</h4>
                <p className="text-purple-300 text-xs mb-4">See uncensored photos & videos</p>
                <div className="w-full max-w-xs">
                   <BuyVipButton />
                </div>
            </div>
        </div>

        {/* PREVIEW DA GALERIA (Desfocada) */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 opacity-50 pointer-events-none select-none">
          {galleryPhotos.map((i) => (
            <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-900">
              {/* --- A CORREÇÃO ESTÁ AQUI: Usamos backticks (`) para inserir o número ${i} --- */}
              <img 
                src={`/beatriz/gallery/${i}.jpg`} 
                alt={`Photo ${i}`}
                className="w-full h-full object-cover blur-md scale-110" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- MODAL DO STORY --- */}
      {showStory && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full h-full md:w-[400px] md:h-[85vh] md:rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border border-white/10">
            {/* ...Barra de Progresso e Header... */}
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-30">
                <div className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden">
                    <div className="h-full bg-white w-full animate-[loading_5s_linear_forwards]" />
                </div>
            </div>

            <div className="absolute top-8 left-4 right-4 z-30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/beatriz/profile.jpg" className="w-10 h-10 rounded-full border-2 border-purple-500" />
                <div>
                    <span className="block text-sm font-bold text-white drop-shadow-md">Beatriz</span>
                    <span className="block text-[10px] text-neutral-200 shadow-black drop-shadow-md">Paris, France</span>
                </div>
              </div>
              <button onClick={() => setShowStory(false)} className="text-white bg-black/20 p-2 rounded-full backdrop-blur-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* VÍDEO SIMULADO */}
            <div className="absolute inset-0 z-0">
                <img 
                  src="/beatriz/profile.jpg" 
                  alt="Story" 
                  className="w-full h-full object-cover animate-zoom" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
            </div>

            {/* Interação no Story */}
            <div className="absolute bottom-10 left-0 right-0 px-6 z-30">
               <div className="text-center mb-6">
                 <p className="text-2xl font-black text-white italic drop-shadow-lg">"Are you lonely tonight?"</p>
               </div>
               
               <Link href="/dashboard/chat/beatriz">
                 <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-full shadow-lg shadow-purple-900/50 transition transform active:scale-95 uppercase tracking-wider text-sm">
                   Yes, talk to me 🔥
                 </button>
               </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
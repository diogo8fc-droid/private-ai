'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BeatrizChat() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { characterName: 'beatriz' },
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    /* O SEGREDO ESTÁ AQUI: "fixed inset-0 z-50" mete o chat por cima de tudo */
    <div className="fixed inset-0 z-50 w-full h-[100dvh] bg-black flex flex-col font-sans text-white">
      
      {/* 1. TOPO */}
      <div className="flex-none h-16 bg-neutral-900 border-b border-white/10 flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-white text-2xl p-2">←</Link>
          <div className="relative">
            {/* Se a imagem falhar, mostra um fundo cinzento */}
            <div className="w-10 h-10 rounded-full bg-neutral-700 border border-white/20 overflow-hidden">
               <img src="/beatriz/profile.jpg" alt="B" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></div>
          </div>
          <div>
            <h1 className="font-bold text-sm">Beatriz</h1>
            <p className="text-green-500 text-xs">Online</p>
          </div>
        </div>
      </div>

      {/* 2. MENSAGENS */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center opacity-40">
            <p>Diz olá à Beatriz... ✨</p>
          </div>
        )}
        
        {messages.map((m: any) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
              m.role === 'user' 
                ? 'bg-purple-600 text-white rounded-br-none' 
                : 'bg-neutral-800 text-gray-200 rounded-bl-none border border-white/10'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* 3. CAIXA DE TEXTO */}
      <div className="flex-none bg-neutral-900 p-3 border-t border-white/10 pb-safe">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-black text-white rounded-full px-4 py-3 text-sm border border-white/10 focus:outline-none focus:border-purple-500"
            value={input}
            onChange={handleInputChange}
            placeholder="Escreve aqui..."
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-full font-bold">
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}
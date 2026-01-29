'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BeatrizChat() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
    body: { characterName: 'beatriz' }, // <--- DIZ À API QUE É A BEATRIZ
  });

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    // FIX MOBILE: h-[100dvh] impede o site de saltar
    <div className="fixed inset-0 w-full h-[100dvh] bg-black flex flex-col overflow-hidden">
      
      {/* 1. HEADER BEATRIZ */}
      <header className="flex-none h-16 bg-neutral-900 border-b border-white/10 flex items-center px-4 justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-neutral-400 text-2xl">←</Link>
          <div className="relative">
            <img src="/beatriz/profile.jpg" alt="Beatriz" className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-neutral-900"></div>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">Beatriz</h1>
            <p className="text-neutral-500 text-[10px]">Online</p>
          </div>
        </div>
      </header>

      {/* 2. MENSAGENS */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black scroll-smooth">
        {messages.length === 0 && (
          <p className="text-center text-neutral-600 text-xs mt-10">Diz olá à Beatriz... ✨</p>
        )}
        
        {messages.map((m: any) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              m.role === 'user' ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-200'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      {/* 3. INPUT */}
      <div className="flex-none bg-neutral-900 p-3 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            className="flex-1 bg-black text-white rounded-full px-4 py-3 text-sm focus:outline-none border border-white/10"
            value={input}
            onChange={handleInputChange}
            placeholder="Mensagem..."
          />
          <button type="submit" className="bg-purple-600 text-white p-3 rounded-full font-bold text-xs">
            ENVIAR
          </button>
        </form>
      </div>
    </div>
  );
}
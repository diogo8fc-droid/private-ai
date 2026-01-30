'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface ChatWindowProps {
  modelId: string; // 'beatriz' ou 'sofia'
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function ChatWindow({ modelId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Ref para fazer scroll automático para baixo
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Configuração visual baseada na modelo
  const config = modelId === 'beatriz' 
    ? { name: 'Beatriz', color: 'text-purple-500', border: 'border-purple-500', bg: 'bg-purple-600' }
    : { name: 'Sofia', color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-600' };

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Adiciona a mensagem do utilizador ao ecrã
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      // 2. Envia para o nosso Backend (Passo 1)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, modelId }),
      });

      const data = await res.json();

      // 3. Adiciona a resposta da IA ao ecrã
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', content: data.reply }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "Ups, perdi a ligação... tenta outra vez." }]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      
      {/* HEADER DO CHAT */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-neutral-900/50 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="flex items-center gap-3">
          <Link href={`/models/${modelId}`} className="text-neutral-400 hover:text-white text-sm">
            ← Voltar
          </Link>
          <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${config.border}`}>
            <img src={`/${modelId}/profile.jpg`} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-sm">{config.name}</h2>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
            </p>
          </div>
        </div>
      </div>

      {/* ÁREA DAS MENSAGENS */}
      <div className="flex-1 overflow-y-auto pt-20 pb-24 px-4 space-y-4">
        
        {/* Mensagem de Boas Vindas Automática */}
        {messages.length === 0 && (
          <div className="text-center text-neutral-500 text-xs mt-10">
            Começa a conversa com a {config.name}...
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-neutral-800 text-white rounded-tr-none' 
                : `${config.bg} text-white rounded-tl-none`
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Indicador de "A escrever..." */}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className={`bg-neutral-900 text-neutral-400 p-3 rounded-2xl text-xs rounded-tl-none border border-white/10`}>
              a escrever...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT BAR */}
      <div className="fixed bottom-0 w-full bg-black border-t border-white/10 p-4">
        <div className="relative max-w-4xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escreve uma mensagem..."
            className="w-full bg-neutral-900 border border-white/10 rounded-full py-3 px-5 text-sm focus:outline-none focus:border-white/30 transition"
            disabled={loading}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className={`p-3 rounded-full ${config.bg} text-white hover:opacity-90 transition disabled:opacity-50`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mudei o nome da chave para 'age-verified-v2' para forçar o reset
    const verified = localStorage.getItem('age-verified-v2');
    
    // Debug: Abre a consola do browser (F12) para ver se isto aparece
    console.log("Verificando idade... Valor guardado:", verified);

    if (!verified) {
      setIsVisible(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('age-verified-v2', 'true'); // Atualiza aqui também
    setIsVisible(false);
  };

  // ... o resto do código continua igual ...

  const handleExit = () => {
    // Redireciona para o Google se for menor
    window.location.href = "https://www.google.com";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4">
      {/* Fundo desfocado */}
      <div className="absolute inset-0 bg-[url('/login-bg.jpg')] opacity-20 blur-xl bg-cover bg-center"></div>
      
      <div className="relative bg-neutral-900 border border-red-500/30 p-8 rounded-2xl max-w-md w-full text-center shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        
        <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-3xl font-black text-white border-4 border-black shadow-lg">
                18+
            </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-4 uppercase italic">Adult Content</h2>
        
        <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
          This website contains sexually explicit material intended for adults only. 
          By entering, you confirm that you are at least <strong>18 years old</strong> (or the age of majority in your jurisdiction).
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleEnter}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl transition uppercase tracking-widest shadow-lg shadow-red-900/40"
          >
            I am 18+ • Enter
          </button>
          
          <button 
            onClick={handleExit}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 font-bold py-4 rounded-xl transition uppercase tracking-widest text-xs"
          >
            Exit Website
          </button>
        </div>

        <p className="mt-6 text-[10px] text-neutral-600">
          Private AI respects your privacy. Cookies are used for verification.
        </p>
      </div>
    </div>
  );
}
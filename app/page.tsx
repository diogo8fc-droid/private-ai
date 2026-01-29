'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  // Estados para guardar o que o utilizador escreve
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para controlar erros e loading
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Impede a página de recarregar
    setError('');       // Limpa erros antigos

    // 1. VALIDAÇÃO: Se estiver vazio, para tudo!
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    // 2. SIMULAÇÃO DE LOGIN (Loading...)
    setIsLoading(true);

    // Espera 1 segundo para parecer real e depois entra
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      
      {/* Imagem de Fundo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/login-bg.jpg" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Caixa de Login */}
      <div className="relative z-10 w-full max-w-md p-8 bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic text-white tracking-tighter mb-2">
            PRIVATE <span className="text-purple-600">AI</span>
          </h1>
          <p className="text-neutral-400 text-sm">Enter the exclusive sanctuary.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Aviso de Erro (Só aparece se houver erro) */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-xs p-3 rounded text-center font-bold animate-pulse">
              {error}
            </div>
          )}

          <div>
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/10 focus:border-purple-500'} rounded-lg px-4 py-3 text-white outline-none transition placeholder:text-neutral-600`}
            />
          </div>

          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/10 focus:border-purple-500'} rounded-lg px-4 py-3 text-white outline-none transition placeholder:text-neutral-600`}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg transition transform active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ACCESSING...
              </>
            ) : (
              "ENTER NOW"
            )}
          </button>

        </form>

        <p className="text-center text-neutral-600 text-xs mt-6">
          By entering, you agree to our Terms & Conditions. <br/>
          <span className="text-neutral-500">18+ Only.</span>
        </p>

      </div>
    </div>
  );
}
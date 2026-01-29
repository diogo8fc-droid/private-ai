import Link from "next/link";

export default function DashboardPage() {
  return (
    // BASE: Preto profundo com seleção vermelha
    <div className="min-h-screen bg-black text-white font-sans relative overflow-hidden selection:bg-red-500 selection:text-white">
      
      {/* --- AMBIENTE (Luzes de Fundo) --- */}
      {/* 1. Holofote Roxo (Topo Esquerda) */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/40 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* 2. Holofote Vermelho (Baixo Direita) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-900/30 rounded-full blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '7s' }} />

      {/* 3. Textura de grão subtil */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5 px-6 h-20 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tighter drop-shadow-md">
          Private <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">AI</span>
        </span>
        <a href="/" className="text-neutral-400 text-xs hover:text-white uppercase tracking-widest font-bold transition border border-transparent hover:border-white/10 px-4 py-2 rounded-full">
          Logout
        </a>
      </nav>

      {/* --- CONTEÚDO --- */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Título */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-3 text-white">
            Who is your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 drop-shadow-[0_0_25px_rgba(220,38,38,0.5)]">obsession?</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base tracking-wide max-w-xl mx-auto">
            Choose a muse. Start the private chat. <span className="text-white font-bold">No limits.</span>
          </p>
        </div>

        {/* Grelha de Modelos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* --- SOFIA (Chat Grátis) --- */}
          <a href="/models/sofia" className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.2)] hover:-translate-y-1">
            
            {/* Fundo escuro */}
            <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm z-0" />

            {/* Imagem */}
            <img 
              src="sofia/profile.jpg" 
              alt="Sofia" 
              className="relative z-10 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-in-out"
            />
            
            {/* Gradiente */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Badge Online (Verde) */}
            <div className="absolute top-3 left-3 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">Online</span>
            </div>

            {/* Informação */}
            <div className="absolute bottom-0 p-5 z-30 w-full">
              <h3 className="text-2xl font-black text-white mb-1 drop-shadow-lg">Sofia, 19</h3>
              <div className="flex items-center justify-between">
                <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">New York • Shy</p>
                {/* Tag Free Chat */}
                <span className="text-[10px] text-white bg-green-900/80 border border-green-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wide">Free Chat</span>
              </div>
            </div>
          </a>


          {/* --- BEATRIZ (Chat VIP) --- */}
          <a href="/models/beatriz" className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:-translate-y-1">
            
            <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm z-0" />

            <img 
              src="/beatriz/profile.jpg" 
              alt="Beatriz" 
              className="relative z-10 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700 ease-in-out"
            />
            
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Badge Online (Também Verde, para mostrar disponibilidade) */}
            <div className="absolute top-3 left-3 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 shadow-lg">
               <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">Online</span>
            </div>

            <div className="absolute bottom-0 p-5 z-30 w-full">
              <h3 className="text-2xl font-black text-white mb-1 drop-shadow-lg">Beatriz, 22</h3>
               <div className="flex items-center justify-between">
                <p className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">Paris • Dominant</p>
                {/* Tag VIP */}
                <span className="text-[10px] text-white bg-purple-600 px-2 py-0.5 rounded font-bold shadow-[0_0_10px_rgba(147,51,234,0.5)] uppercase tracking-wide">VIP ONLY</span>
              </div>
            </div>
          </a>

          {/* --- NOVAS MODELOS (Placeholders) --- */}
          <div className="relative aspect-[3/4] rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-neutral-600 hover:bg-white/10 transition cursor-pointer group hover:border-white/20">
             <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition border border-white/5 shadow-inner">
                <span className="text-2xl grayscale group-hover:grayscale-0">🔒</span>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Coming Soon</p>
          </div>
          
           <div className="relative aspect-[3/4] rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-neutral-600 hover:bg-white/10 transition cursor-pointer group hover:border-white/20">
             <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 group-hover:scale-110 transition border border-white/5 shadow-inner">
                <span className="text-2xl grayscale group-hover:grayscale-0">🔒</span>
             </div>
             <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Coming Soon</p>
          </div>

        </div>
      </main>
    </div>
  );
}
'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const plans = [
    { name: 'Iniciante', price: '10€', gems: '100 💎', features: ['10 Fotos Ultra-reais', 'Acesso à Ana e Sofia'] },
    { name: 'Premium', price: '25€', gems: '300 💎', features: ['Fotos Ilimitadas', '6 Animações de Vídeo', 'Prioridade V4.0'], popular: true },
    { name: 'Agência VIP', price: '50€', gems: '700 💎', features: ['Todas as Modelos', 'Vídeos HD', 'Suporte VIP'] }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-7xl font-black italic mb-4">PRIVATE <span className="text-pink-600">AI</span></h1>
        <p className="text-gray-400 max-w-xl mb-8">Fantasias sem limites com realismo fotográfico de elite.</p>
        <button onClick={() => router.push('/login')} className="px-12 py-5 bg-pink-600 rounded-full font-black shadow-xl hover:scale-105 transition-all">COMEÇAR AGORA 🔥</button>
      </section>

      <section className="py-24 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((p) => (
          <div key={p.name} className={`p-10 rounded-[40px] border ${p.popular ? 'border-pink-600 bg-pink-600/5 scale-105' : 'border-gray-800 bg-gray-900/20'}`}>
            <h3 className="text-2xl font-black mb-2">{p.name}</h3>
            <div className="text-4xl font-black mb-6">{p.price}</div>
            <ul className="space-y-3 mb-8 text-gray-400 text-sm">
              {p.features.map(f => <li key={f}>✅ {f}</li>)}
            </ul>
            <button className={`w-full py-4 rounded-full font-black ${p.popular ? 'bg-pink-600' : 'bg-white/5'}`}>SELECIONAR</button>
          </div>
        ))}
      </section>
    </main>
  );
}
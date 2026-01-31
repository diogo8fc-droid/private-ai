'use client';

import { useState } from 'react';

export default function BuyVipButton() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId: 'user_123_temp', // Isto virá do login depois
            amount: 19.99,           // O preço do VIP
            description: "VIP Access - Lifetime"
        }), 
      });

      const data = await res.json();

      if (data.url) {
        // Abre numa nova aba para não perderes o cliente do site
        window.open(data.url, '_blank');
      } else {
        alert('Erro: ' + (data.error || 'Falha ao criar pagamento'));
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão. Verifica a tua internet.');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full w-full transition flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
    >
      {loading ? (
        <span className="animate-pulse">A gerar fatura...</span>
      ) : (
        <>
          <span>💎</span>
          <span>Comprar VIP ($19.99)</span>
        </>
      )}
    </button>
  );
}
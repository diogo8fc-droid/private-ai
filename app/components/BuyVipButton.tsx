'use client';

import { useState } from 'react';

export default function BuyVipButton() {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    try {
      // Chama a API de pagamento
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'teste-123' }), // ID temporário
      });

      const data = await res.json();

      if (data.url) {
        // Redireciona para a NowPayments
        window.location.href = data.url;
      } else {
        alert('Erro: ' + (data.error || 'Falha ao criar pagamento'));
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão.');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full w-full transition flex items-center justify-center gap-2 shadow-lg"
    >
      {loading ? (
        <span>A carregar...</span>
      ) : (
        <>
          <span>💎</span>
          <span>Comprar VIP (Crypto)</span>
        </>
      )}
    </button>
  );
}
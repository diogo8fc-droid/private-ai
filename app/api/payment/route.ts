import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId, amount, description } = await req.json(); 

    // Define o URL base (Localhost ou Site Real)
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://o-teu-site-real.vercel.app'; // <--- Muda isto quando publicares!

    const payload = {
      price_amount: amount || 19.99,   // Valor em Dólares
      price_currency: 'usd',           // A moeda do preço (USD)
      // pay_currency: 'btc',          <--- REMOVI ESTA LINHA. Agora o cliente escolhe a moeda!
      order_id: userId,
      order_description: description || 'Acesso VIP',
      ipn_callback_url: `${baseUrl}/api/webhook`, 
      success_url: `${baseUrl}/dashboard?payment=success`,
      cancel_url: `${baseUrl}/dashboard?payment=cancelled`,
    };

    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("Erro NowPayments:", data);
        return NextResponse.json({ error: data.message || 'Erro na API' }, { status: 500 });
    }

    if (data.invoice_url) {
      return NextResponse.json({ url: data.invoice_url });
    } else {
      return NextResponse.json({ error: 'Link não gerado' }, { status: 500 });
    }

  } catch (error) {
    console.error("Erro Servidor:", error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
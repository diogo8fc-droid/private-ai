import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json(); // Vamos receber o ID do cliente

    // 1. Configurar o pedido para a NowPayments
    const payload = {
      price_amount: 19.99,      // O PREÇO DO VIP
      price_currency: 'usd',    // A moeda do preço (Dólares)
      pay_currency: 'sol',      // Moeda por defeito (o cliente pode mudar na página)
      order_id: userId,         // IMPORTANTE: Enviamos o ID para sabermos quem pagou
      order_description: 'Acesso VIP - Modelo IA',
      ipn_callback_url: 'https://oteusite.vercel.app/api/webhook', // Vamos configurar isto depois
      success_url: 'https://oteusite.vercel.app/dashboard?success=true',
      cancel_url: 'https://oteusite.vercel.app/dashboard?canceled=true',
    };

    // 2. Falar com a NowPayments
    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.invoice_url) {
      return NextResponse.json({ url: data.invoice_url });
    } else {
      return NextResponse.json({ error: 'Erro ao criar pagamento' }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
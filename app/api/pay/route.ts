import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { packageId } = await request.json();
    const cookieStore = await cookies();

    // 1. CORREÇÃO: Passar obrigatoriamente URL e KEY para o Supabase
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); },
          remove(name: string, options: CookieOptions) { cookieStore.delete({ name, ...options }); },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Login necessário" }, { status: 401 });

    const PACKAGES: any = {
      "basic": { usd: 10, credits: 100 },
      "premium": { usd: 50, credits: 600 }
    };
    const selected = PACKAGES[packageId];

    // 2. CORREÇÃO: Renomear 'response' para 'paymentRes' para evitar conflitos de tipos
    const paymentRes = await fetch('https://api.nowpayments.io/v1/payment', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NOWPAYMENTS_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price_amount: selected.usd,
        price_currency: "usd",
        pay_currency: "btc", 
        ipn_callback_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/crypto`,
        order_id: user.id,
        order_description: `Compra de ${selected.credits} 💎`
      })
    });

    const paymentData = await paymentRes.json();

    // Guardar registo na tabela 'payments' que criaste no Supabase
    await supabase.from('payments').insert({
      user_id: user.id,
      amount_usd: selected.usd,
      credits_to_add: selected.credits,
      payment_id: String(paymentData.payment_id),
      status: 'pending'
    });

    return NextResponse.json({ invoice_url: paymentData.invoice_url });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
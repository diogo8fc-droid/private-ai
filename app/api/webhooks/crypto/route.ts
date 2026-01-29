import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Criar cliente Admin (Service Role) para ignorar as regras de segurança (RLS)
    // GARANTE QUE TENS A 'SUPABASE_SERVICE_ROLE_KEY' NO TEU .ENV.LOCAL
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! 
    );

    // 2. Verificar o status do pagamento (Baseado no NowPayments)
    // O status 'finished' significa que a crypto já caiu na tua carteira
    if (body.payment_status === 'finished') {
      
      // Procurar o registo do pagamento na tua tabela 'payments'
      const { data: payRecord, error: payError } = await supabaseAdmin
        .from('payments')
        .select('*')
        .eq('payment_id', body.payment_id)
        .single();

      if (payError || !payRecord) {
        return NextResponse.json({ error: "Pagamento não encontrado" }, { status: 404 });
      }

      // Evitar que o webhook processe o mesmo pagamento duas vezes
      if (payRecord.status !== 'finished') {
        
        // 3. Buscar o saldo atual do utilizador
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('credits')
          .eq('id', payRecord.user_id)
          .single();

        // 4. Somar os novos créditos
        const novoSaldo = (profile?.credits || 0) + payRecord.credits_to_add;

        // 5. Atualizar o perfil e marcar o pagamento como concluído
        await supabaseAdmin
          .from('profiles')
          .update({ credits: novoSaldo })
          .eq('id', payRecord.user_id);

        await supabaseAdmin
          .from('payments')
          .update({ status: 'finished' })
          .eq('payment_id', body.payment_id);

        console.log(`✅ Créditos entregues: ${payRecord.credits_to_add}💎 para o user ${payRecord.user_id}`);
      }
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("❌ Erro no Webhook:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
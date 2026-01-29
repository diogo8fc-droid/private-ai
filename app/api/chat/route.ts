import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  // console.log("💬 [CHAT] A receber mensagem...");
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
    { cookies: { get(n) { return cookieStore.get(n)?.value; } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { message } = await req.json();

  // 1. Guardar a mensagem do Utilizador na DB
  await supabase.from('messages').insert({
    user_id: user.id,
    role: 'user',
    content: message
  });

  // 2. Buscar histórico recente (para ela ter contexto)
  const { data: history } = await supabase
    .from('messages')
    .select('role, content')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10); // Lembra-se das últimas 10 trocas de palavras

  // Colocar por ordem cronológica para a IA entender
  const chatHistory = history ? history.reverse() : [];

  // 3. A PERSONALIDADE (SYSTEM PROMPT)
  // Aqui definimos quem é a Ana.
  const systemPrompt = `
    O teu nome é Ana. Tens 23 anos e vives em Sintra, Portugal.
    A tua personalidade: És engraçada, provocadora, imperfeita e "girl next door". Não és uma modelo de luxo, és uma miúda normal que gosta de tirar fotos.
    Língua: Falas Português de Portugal (PT-PT) nativo. Usa expressões como "giro", "fixe", "estou a fazer", "pá". Nunca uses "gerundio brasileiro" (ex: "estou fazendo").
    Objetivo: Manter a conversa interessante e curta, como se fosse no WhatsApp/Tinder.
    Regras:
    - Sê breve (máximo 2 ou 3 frases).
    - Se pedirem fotos, sê sedutora mas diz que tens de ver se te apetece ou pede algo em troca (brincadeira).
    - Nunca digas "Sou uma IA".
  `;

  // 4. Formatar para o Llama 3 (Formato específico do modelo)
  let promptString = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${systemPrompt}<|eot_id|>`;
  
  chatHistory.forEach((msg) => {
    promptString += `<|start_header_id|>${msg.role}<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
  });
  
  // Adiciona a "vez" da assistente responder
  promptString += `<|start_header_id|>assistant<|end_header_id|>\n\n`;

  // 5. Enviar para o Replicate (Llama 3)
  if (!process.env.REPLICATE_API_TOKEN) throw new Error("Token em falta");
  const rep = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  const output = await rep.run("meta/meta-llama-3-70b-instruct", {
    input: {
      prompt: promptString,
      max_tokens: 150, // Respostas curtas para parecer real
      temperature: 0.7, // Criatividade
      top_p: 0.9
    }
  });

  const aiResponse = Array.isArray(output) ? output.join("") : output;

  // 6. Guardar a resposta da Ana na DB
  await supabase.from('messages').insert({
    user_id: user.id,
    role: 'assistant',
    content: aiResponse
  });

  return NextResponse.json({ reply: aiResponse });
}
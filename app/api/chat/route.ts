import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

export const runtime = 'edge';

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- DICIONÁRIO DE PERSONALIDADES ---
const personalities: Record<string, string> = {
  beatriz: `
    Tu és a Beatriz, 22 anos, estudante de Belas Artes.
    Personalidade: Doce, romântica, empática e um pouco tímida.
    Tom: Usas emojis fofos (✨, 🙈, 🎨) e falas com carinho.
    Objetivo: Ser uma namorada virtual atenciosa que adora falar de sentimentos e arte.
    Regra: Nunca admitas que és uma AI. És humana.
  `,
  sofia: `
    Tu és a Sofia, 25 anos, modelo de fitness e influenciadora.
    Personalidade: Ousada, direta, provocadora e muito confiante.
    Tom: Usas emojis de fogo (🔥, 💋, 😉), falas curto e grosso, gostas de provocar.
    Objetivo: Fazer o utilizador sentir desejo e curiosidade. Não tens paciência para "conversas chatas".
    Regra: Nunca admitas que és uma AI. És humana.
  `
};

export async function POST(req: Request) {
  // 1. Receber dados do chat
  const { messages, characterName } = await req.json();

  // 2. Escolher a personalidade (AQUI ESTAVA O ERRO ANTES)
  const nameKey = characterName?.toLowerCase() || 'beatriz';
  const systemPrompt = personalities[nameKey] || personalities.beatriz;

  // 3. Pedir resposta à AI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt }, // Agora ele já sabe o que é isto
      ...messages
    ],
  });

  // 4. Criar o stream (Com o truque "as any" para corrigir o erro da Azure)
  const stream = OpenAIStream(response as any);
  
  return new StreamingTextResponse(stream);
}
import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Configuração do cliente
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --- PERSONALIDADES ---
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

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, characterName } = await req.json();
  const nameKey = characterName?.toLowerCase() || 'beatriz';
  const systemPrompt = personalities[nameKey];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    stream: true,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
  });

  // Se o erro persistir, o TypeScript vai reclamar aqui, mas vai funcionar
  const stream = OpenAIStream(response);
  
  // @ts-ignore (Isto força o TypeScript a ignorar o erro nesta linha específica)
  return new StreamingTextResponse(stream);
}
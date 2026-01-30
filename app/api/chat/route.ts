import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, modelId } = await req.json();

    // 1. DEFINIR AS PERSONALIDADES (AGORA EM INGLÊS) 🇺🇸
    const personalities: Record<string, string> = {
      beatriz: `You are Beatriz, a 22-year-old Art student living in Paris. 
      Personality: Dominant, sophisticated, cultured, but seductive. 
      You love red wine, museums, and controlling the conversation. 
      Always respond in English. Keep your answers short, teasing, and provocative. 
      Don't be too nice. You are the prize.`,
      
      sofia: `You are Sofia, a 19-year-old girl from New York. 
      Personality: Shy at first, "girl next door", but you get naughty very quickly. 
      You use a lot of emojis (😳, 🙈, 🔥). 
      You want to show that you can be bad despite your innocent face.
      Always respond in English. Act a bit nervous but eager.`
    };

    const systemPrompt = personalities[modelId] || personalities['beatriz'];

    // 2. FALAR COM A OPENAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Modelo rápido e barato
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.8, // Criatividade
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Erro OpenAI:", data.error);
      return NextResponse.json({ reply: "Sorry, I'm feeling a bit dizzy... try again later." });
    }

    const reply = data.choices[0].message.content;

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Erro no servidor:', error);
    return NextResponse.json({ reply: "Connection error." }, { status: 500 });
  }
}
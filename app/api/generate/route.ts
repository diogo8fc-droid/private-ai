import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  console.log("🚀 [DEBUG] API: Pollinations (Modo Realismo/Flux)...");
  const cookieStore = await cookies();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
    { cookies: { get(n) { return cookieStore.get(n)?.value; } } }
  );

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Sessão expirada" }, { status: 401 });

    const { prompt, modelKey } = await req.json();

    // 1. O PROMPT MÁGICO (Estilo Selfie Amadora)
    // Adicionei "film grain", "flash photography" e "messy hair" para dar o look da foto que mostraste.
    const fullPrompt = `Real amateur selfie of a woman, ${prompt}, wearing intricate red lace lingerie, bedroom setting, dim lighting, hard flash, grainy film texture, visible skin pores, freckles, imperfections, messy hair, looking at camera, raw photo, uncensored, 8k`;
    
    // Codificar para URL
    const encodedPrompt = encodeURIComponent(fullPrompt);

    // 2. SEMENTE ALEATÓRIA (Para variar a pose/mulher)
    const seed = Math.floor(Math.random() * 1000000);

    // 3. GERAR URL (Flux Model)
    // model=flux (O melhor)
    // nologo=true (Sem marcas d'água)
    // enhance=false (Não deixar o robot estragar o nosso prompt "cru")
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=832&height=1216&model=flux&seed=${seed}&nologo=true&enhance=false`;

    console.log("⏳ [DEBUG] Gerado:", imageUrl);

    // 4. VERIFICAÇÃO RÁPIDA
    // "Pingamos" a imagem para garantir que o Pollinations acordou
    const check = await fetch(imageUrl);
    if (!check.ok) console.warn("⚠️ Aviso: O link pode demorar uns segundos a carregar no browser.");

    // 5. GUARDAR NA BASE DE DADOS
    const { error: dbError } = await supabase.from('generations').insert({ 
        user_id: user.id, 
        image_url: imageUrl, 
        prompt: prompt, 
        model_id: modelKey || 'flux-free'
    });

    if (dbError) {
        console.error("Erro Supabase:", dbError);
    }

    return NextResponse.json({ imageUrl: imageUrl });

  } catch (e: any) {
    console.error("🚨 [ERRO]:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

const SVD_VERSION = "stability-ai/stable-video-diffusion:3f0457e4619daac51203dedb472816f3afc540071a291c287845613d37d345a3";

export async function POST(request: Request) {
  const cookieStore = await cookies();
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
  if (!user) return NextResponse.json({ error: "Sessão expirada." }, { status: 401 });

  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  try {
    const { imageUrl } = await request.json();
    const VIDEO_COST = 50; // Sincronizado com o teu frontend

    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
    if (!profile || profile.credits < VIDEO_COST) {
      return NextResponse.json({ error: "Saldo insuficiente 💎" }, { status: 403 });
    }

    console.log("🎬 A criar animação Ultra-Realista...");

    const output = await replicate.run(
      SVD_VERSION,
      {
        input: {
          input_image: imageUrl,
          video_length: "25_frames_with_svd_xt",
          frames_per_second: 8,
          motion_bucket_id: 100, // Ajustado para evitar deformação genital no movimento
          cond_aug: 0.05 // Aumenta a fidelidade à imagem original
        }
      }
    ) as any;

    const videoUrl = String(output);

    // AGORA GUARDAMOS O VÍDEO NA GALERIA
    await supabase.from('generations').insert({
      user_id: user.id,
      image_url: videoUrl, // Guarda o vídeo na mesma tabela de imagens
      prompt: "Animação de imagem gerada",
      model_id: "svd-xt-pro"
    });

    await supabase.from('profiles').update({ credits: profile.credits - VIDEO_COST }).eq( 'id', user.id);

    return NextResponse.json({ videoUrl: videoUrl });

  } catch (error: any) {
    console.error("❌ ERRO VIDEO:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
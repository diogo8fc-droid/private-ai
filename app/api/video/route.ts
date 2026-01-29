import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

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

    const { data: profile } = await supabase.from('profiles').select('credits').eq('id', user.id).single();
    if (!profile || profile.credits < 50) {
      return NextResponse.json({ error: "Saldo insuficiente (50 💎)" }, { status: 403 });
    }

    console.log("🎬 A iniciar SVD-XT...");
    
    // SVD-XT (Versão Estável Pública)
    const output = await replicate.run(
      "stability-ai/stable-video-diffusion:39ed52f2a78e934b3ba6e2489f56bc30962b1a0b396740b7d06bbbb2737c099b",
      {
        input: {
          input_image: imageUrl,
          video_length: "25_frames_with_svd_xt",
          fps: 6,
          motion_bucket_id: 127,
          cond_aug: 0.02
        }
      }
    ) as any;

    const videoUrl = Array.isArray(output) ? output[0] : output;

    await supabase.from('profiles').update({ credits: profile.credits - 50 }).eq('id', user.id);

    // Opcional: Guardar vídeo na tabela generations
    await supabase.from('generations').insert({
      user_id: user.id,
      image_url: String(videoUrl),
      model_id: "svd-video",
      prompt: "Video generated from image"
    });

    return NextResponse.json({ videoUrl: String(videoUrl) });

  } catch (error: any) {
    console.error("❌ ERRO VÍDEO:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
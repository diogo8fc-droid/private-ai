import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: "ID do vídeo em falta" }, { status: 400 });

  const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

  try {
    const prediction = await replicate.predictions.get(id);
    
    // Devolve o estado e a URL se já existir
    return NextResponse.json({ 
      status: prediction.status, 
      videoUrl: prediction.output 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
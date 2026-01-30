'use client';

// 1. Definimos que este componente aceita um texto chamado "model"
interface GalleryProps {
  model: string; 
}

export default function Gallery({ model }: GalleryProps) {
  
  // Lista de 6 "espaços" para fotos
  const photos = [1, 2, 3, 4, 5, 6];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {photos.map((index) => (
        <div 
          key={index} 
          className="relative aspect-[3/4] bg-neutral-800 rounded-lg overflow-hidden border border-white/5"
        >
          {/* Truque de Segurança:
             Tenta carregar a imagem da pasta /public/beatriz/1.jpg, 2.jpg...
             Se não tiveres essas fotos numeradas, ele vai usar a profile.jpg 
             para não dar erro e a galeria ficar bonita na mesma.
          */}
          <img
            src={`/${model}/profile.jpg`} 
            alt={`Foto ${index} de ${model}`}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
      ))}
    </div>
  );
}
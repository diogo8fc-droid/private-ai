import Image from 'next/image';

interface GalleryProps {
  images: string[];
  isLocked: boolean; // Nova propriedade para saber se bloqueia ou não
}

export default function Gallery({ images, isLocked }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((img, index) => (
        <div key={index} className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 bg-gray-800">
          
          {/* A Imagem em si */}
          <Image
            src={img}
            alt={`Foto ${index + 1}`}
            fill
            className={`object-cover transition-all duration-700 ${
              isLocked ? 'blur-xl scale-110 opacity-50' : 'blur-0 scale-100 opacity-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* O Cadeado (Só aparece se estiver bloqueado) */}
          {isLocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm border border-white/20">
                {/* Ícone de Cadeado SVG simples */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <span className="mt-2 text-xs font-bold uppercase tracking-widest text-white/80">Premium</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
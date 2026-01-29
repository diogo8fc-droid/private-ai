import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-white/5 py-12 z-0 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* Parte Superior: Links e Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Coluna 1: Info (Igual) */}
                    <div className="col-span-1 md:col-span-2 pr-0 md:pr-12">
                        {/* ... igual ao anterior ... */}
                        <h4 className="text-lg font-bold tracking-tighter text-white mb-4">
                            Private <span className="text-red-600">AI</span>
                        </h4>
                        <p className="text-neutral-500 text-xs leading-relaxed mb-4">
                            Experience the next generation of AI companionship.
                        </p>
                    </div>

                    {/* Coluna 2: Legal (LINKS CORRIGIDOS) */}
                    <div>
                        <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Legal</h5>
                        <ul className="space-y-2 text-xs text-neutral-500">
                            <li><Link href="/legal#tos" className="hover:text-white transition">Terms of Service</Link></li>
                            <li><Link href="/legal#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link href="/legal#2257" className="hover:text-white transition">2257 Exemption</Link></li>
                            <li><Link href="/legal#contact" className="hover:text-white transition">DMCA / Copyright</Link></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Suporte (LINKS CORRIGIDOS) */}
                    <div>
                        <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Support</h5>
                        <ul className="space-y-2 text-xs text-neutral-500">
                            {/* Agora cada um vai para o sítio certo! */}
                            <li><Link href="/legal#contact" className="hover:text-white transition">Contact Us</Link></li>
                            <li><Link href="/legal#billing" className="hover:text-white transition">Billing Support</Link></li>
                            <li><Link href="/legal#delete" className="hover:text-white transition">Delete Account</Link></li>
                            <li><Link href="/legal#safety" className="hover:text-white transition">Safety Center</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Linha Divisória */}
                <div className="w-full h-px bg-white/5 mb-8" />

                {/* Parte Inferior: Copyright e Selos */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-neutral-600 text-[10px]">
                        {/* Isto vai buscar o ano atual automaticamente */}
                        © {new Date().getFullYear()} Private AI. All rights reserved.
                    </p>
                    {/* Selos de Confiança (Badges) */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center border border-white/10 px-2 py-1 rounded bg-neutral-900">
                            <span className="text-[10px] font-bold text-neutral-400">18+ ADULTS ONLY</span>
                        </div>
                        <div className="flex items-center justify-center border border-white/10 px-2 py-1 rounded bg-neutral-900">
                            <span className="text-[10px] font-bold text-neutral-400">SSL SECURE</span>
                        </div>
                        <div className="flex items-center justify-center border border-white/10 px-2 py-1 rounded bg-neutral-900">
                            <span className="text-[10px] font-bold text-neutral-400">RTA LABEL</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
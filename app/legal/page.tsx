'use client';

import Link from "next/link";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 md:p-12 selection:bg-red-500 selection:text-white">
      
      <nav className="mb-12">
        <Link href="/" className="text-neutral-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition">
          ← Back to Home
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto space-y-20 pb-20">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase italic mb-4">Help & Legal</h1>
          <p className="text-neutral-500 text-sm">Review our policies and support resources.</p>
        </div>

        {/* 1. TERMS OF SERVICE */}
        <section id="tos" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">01.</span> Terms of Service
          </h2>
          <div className="text-neutral-400 text-sm space-y-4 leading-relaxed text-justify bg-neutral-900/50 p-6 rounded-xl border border-white/5">
            <p><strong>1.1 Acceptance:</strong> By accessing Private AI, you confirm that you are at least 18 years old. Access by minors is strictly prohibited.</p>
            <p><strong>1.2 Nature of Service:</strong> This website provides access to Artificial Intelligence models for entertainment purposes. All characters are fictional.</p>
            <p><strong>1.3 Responsibility:</strong> You are responsible for your interactions. We are not liable for emotional reliance on AI companions.</p>
          </div>
        </section>

        {/* 2. BILLING SUPPORT */}
        <section id="billing" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">02.</span> Billing & Refunds
          </h2>
          <div className="text-neutral-400 text-sm space-y-4 leading-relaxed text-justify bg-neutral-900/50 p-6 rounded-xl border border-white/5">
            <p><strong>2.1 Policy:</strong> Due to the nature of digital goods, all sales are final. No refunds are issued once content is unlocked.</p>
            <p><strong>2.2 Crypto Issues:</strong> If you sent crypto but the content didn't unlock, please email support with your <strong>Transaction Hash (TXID)</strong>.</p>
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500/20 rounded text-red-200 text-xs">
              <strong>Need help with a payment?</strong><br/>
              Email: <span className="font-mono select-all">billing@private-ai.com</span>
            </div>
          </div>
        </section>

        {/* 3. PRIVACY & DATA */}
        <section id="privacy" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">03.</span> Privacy Policy
          </h2>
          <div className="text-neutral-400 text-sm space-y-4 leading-relaxed text-justify bg-neutral-900/50 p-6 rounded-xl border border-white/5">
            <p>We do not sell personal data. We use anonymous cookies for functionality.</p>
            <p>Chat logs are processed by LLMs to generate responses and are not linked to your real identity in our public records.</p>
          </div>
        </section>

        {/* 4. SAFETY CENTER */}
        <section id="safety" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">04.</span> Safety Center
          </h2>
          <div className="text-neutral-400 text-sm space-y-4 leading-relaxed text-justify bg-neutral-900/50 p-6 rounded-xl border border-white/5">
            <p><strong>Moderation:</strong> While our AI is designed for adult roleplay, strictly illegal content (CSAM, non-consensual violence) is prohibited and filtered.</p>
            <p><strong>AI Ethics:</strong> The AI is programmed to simulate consent within the context of roleplay. It is a fictional entity.</p>
          </div>
        </section>

        {/* 5. DELETE ACCOUNT */}
        <section id="delete" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">05.</span> Delete Account
          </h2>
          <div className="text-neutral-400 text-sm space-y-4 leading-relaxed text-justify bg-neutral-900/50 p-6 rounded-xl border border-white/5">
            <p>We respect your right to be forgotten (GDPR/CCPA).</p>
            <p>To request full data deletion, please email us with the subject line <strong>"DELETE MY DATA"</strong>. We will process your request within 30 days.</p>
            <a href="mailto:privacy@private-ai.com" className="inline-block mt-2 text-red-400 hover:text-white border-b border-red-400/50 pb-0.5 transition">
              privacy@private-ai.com
            </a>
          </div>
        </section>

        {/* 6. CONTACT & DMCA */}
        <section id="contact" className="scroll-mt-32">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-red-500">06.</span> Contact & DMCA
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-neutral-800 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-xs uppercase tracking-widest">General Inquiries</h3>
                <a href="mailto:support@private-ai.com" className="text-neutral-400 hover:text-red-400 transition text-sm">support@private-ai.com</a>
            </div>
            <div className="bg-neutral-800 p-4 rounded-lg">
                <h3 className="font-bold text-white mb-2 text-xs uppercase tracking-widest">DMCA / Legal</h3>
                <a href="mailto:legal@private-ai.com" className="text-neutral-400 hover:text-red-400 transition text-sm">legal@private-ai.com</a>
            </div>
          </div>
          <div id="2257" className="mt-8 pt-8 border-t border-white/10 text-[10px] text-neutral-600">
            <p className="mb-2 font-bold text-neutral-500">18 U.S.C. § 2257 COMPLIANCE NOTICE</p>
            <p>All visual content is computer-generated imagery (CGI). No actual human beings were photographed or filmed for the creation of the explicit content found on this website.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
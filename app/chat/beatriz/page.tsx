'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
  id: number;
  sender: 'user' | 'beatriz';
  type: 'text' | 'image';
  content: string;
  locked?: boolean;
  price?: number;
}

// FOTOS DA BEATRIZ
const PHOTOS_DATA = [
  { id: 1, src: '/beatriz/chat/1.jpg', triggerText: "Stop typing. Look at what I'm doing right now..." },
  { id: 2, src: '/beatriz/chat/2.jpg', triggerText: "You liked that? Then you're going to lose your mind with this one." },
  { id: 3, src: '/beatriz/chat/3.jpg', triggerText: "I'm pushing my limits here. Don't show this to anyone, you pig." }
];

export default function BeatrizChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'beatriz', type: 'text', content: "You're late. I hate waiting." },
    { id: 2, sender: 'beatriz', type: 'text', content: "Make it up to me. Entertain me." }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const [photoIndex, setPhotoIndex] = useState(0);
  const [messagesSinceLastPhoto, setMessagesSinceLastPhoto] = useState(0);
  const [pendingPayment, setPendingPayment] = useState(false);
  const [triggerCount, setTriggerCount] = useState(3);
  
  // --- NOVO: ESTADO DO MODAL DE PAGAMENTO ---
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMsgId, setSelectedMsgId] = useState<number | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // --- CÉREBRO DA BEATRIZ ---
  const getBeatrizResponse = (text: string, currentStage: number) => {
    const lowerText = text.toLowerCase();
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    // Respostas Rápidas
    if (lowerText.includes("jerking") || lowerText.includes("hard")) return pick(["Describe it. How hard is it?", "Good. Don't cum yet.", "Stroke it slower."]);
    if (lowerText.includes("sorry") || lowerText.includes("slave")) return pick(["On your knees.", "Begging suits you.", "Good boy."]);
    if (lowerText.includes("money") || lowerText.includes("pay")) return pick(["Spoil me.", "Show me the money.", "I have expensive taste."]);

    // Fases
    if (currentStage === 0) return pick(["Is that all?", "Bore me and I'm leaving.", "Try harder."]);
    if (currentStage === 1) return pick(["Did that picture make you hard?", "I'm feeling hot...", "I shouldn't be doing this..."]);
    return pick(["I own you now.", "Empty your wallet for me.", "Don't stop touching it."]);
  };

  const getPhotoReaction = () => {
    return ["Mmm... not bad.", "Is that it?", "Good boy. Send another.", "Pathetic.", "Wow, desperate."][Math.floor(Math.random() * 5)];
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), sender: 'user', type: 'text', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);
    processBeatrizResponse(currentInput, false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const userMsg: Message = { id: Date.now(), sender: 'user', type: 'image', content: imageUrl };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);
      processBeatrizResponse("", true);
    }
  };

  const processBeatrizResponse = (textInput: string, isPhotoReaction: boolean) => {
    const randomDelay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      let replyContent = "";
      let sendPhoto = false;

      if (pendingPayment) {
        replyContent = ["Unlock the photo first.", "Stop talking and pay up.", "Money first, honey."][Math.floor(Math.random() * 3)];
      } else if (isPhotoReaction) {
        replyContent = getPhotoReaction();
      } else {
        if (photoIndex >= PHOTOS_DATA.length) {
           replyContent = "I'm done with you. Come back later.";
        } else {
           const newCount = messagesSinceLastPhoto + 1;
           setMessagesSinceLastPhoto(newCount);
           if (newCount >= triggerCount) {
             replyContent = PHOTOS_DATA[photoIndex].triggerText;
             sendPhoto = true;
           } else {
             replyContent = getBeatrizResponse(textInput, photoIndex);
           }
        }
      }

      const beatrizMsg: Message = { id: Date.now() + 1, sender: 'beatriz', type: 'text', content: replyContent };
      setMessages(prev => [...prev, beatrizMsg]);
      
      if (sendPhoto) {
        setTimeout(() => {
          const currentPhotoData = PHOTOS_DATA[photoIndex];
          const photoMsg: Message = { 
            id: Date.now() + 2, sender: 'beatriz', type: 'image', 
            content: currentPhotoData.src, locked: true, price: 0.99
          };
          setMessages(prev => [...prev, photoMsg]);
          setPendingPayment(true);
          setPhotoIndex(prev => prev + 1);
          setMessagesSinceLastPhoto(0);
          setTriggerCount(Math.floor(Math.random() * 3) + 2);
          setIsTyping(false);
        }, 1500);
      } else {
        setIsTyping(false);
      }
    }, randomDelay); 
  };

  // --- ABERTURA DO MODAL ---
  const openPaymentModal = (msgId: number) => {
    setSelectedMsgId(msgId);
    setShowPaymentModal(true);
  };

  // --- CONFIRMAÇÃO DO PAGAMENTO (Simulado) ---
  const confirmPayment = () => {
    setIsProcessingPayment(true);
    // Simula tempo de verificação na blockchain
    setTimeout(() => {
        if (selectedMsgId !== null) {
            setMessages(prev => prev.map(msg => {
                if (msg.id === selectedMsgId) return { ...msg, locked: false }; 
                return msg;
            }));
            setPendingPayment(false);
            
            // Reação da Beatriz
            setTimeout(() => {
                const reaction = ["Good choice.", "Mmm... I knew you'd like that.", "See? Worth every penny."][Math.floor(Math.random() * 3)];
                const thankYouMsg: Message = { id: Date.now() + 10, sender: 'beatriz', type: 'text', content: reaction };
                setMessages(prev => [...prev, thankYouMsg]);
                scrollToBottom();
            }, 1000);
        }
        setIsProcessingPayment(false);
        setShowPaymentModal(false);
        setSelectedMsgId(null);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans relative">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/10 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/models/beatriz" className="text-neutral-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </Link>
          <div className="relative">
            <img src="/beatriz/profile.jpg" className="w-10 h-10 rounded-full object-cover border border-purple-500" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <div>
            <h2 className="font-bold text-sm">Beatriz</h2>
            <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Online</p>
          </div>
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/90">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3 text-sm ${
              msg.sender === 'user' 
                ? 'bg-neutral-800 text-white rounded-tr-none' 
                : 'bg-purple-900/40 border border-purple-500/30 text-white rounded-tl-none'
            }`}>
              
              {msg.type === 'text' && <p>{msg.content}</p>}

              {msg.type === 'image' && (
                <div className="relative mt-2">
                  <div className={`relative w-56 rounded-xl overflow-hidden ${msg.locked ? 'h-72 cursor-pointer' : 'h-auto'}`}>
                    <img 
                      src={msg.content} 
                      className={`w-full h-full object-cover transition duration-700 ${msg.locked ? 'blur-2xl scale-110 opacity-60' : ''}`} 
                    />
                    
                    {/* BOTÃO DE BLOQUEIO */}
                    {msg.locked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10 p-4 text-center">
                        <span className="text-3xl mb-2 animate-pulse">🔞</span>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-red-500">Explicit Content</p>
                        
                        {/* Abre o Modal em vez de confirmar direto */}
                        <button onClick={() => openPaymentModal(msg.id)} className="mt-2 bg-white text-black font-extrabold py-3 px-6 rounded-full text-xs hover:scale-105 transition shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center gap-2">
                          <span>UNLOCK</span><span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px]">$0.99</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-neutral-900 border-t border-white/10">
        <div className="flex items-center gap-2 bg-black rounded-full px-4 py-3 border border-white/10 focus-within:border-purple-500 transition">
          <label className="cursor-pointer text-neutral-400 hover:text-purple-400 transition">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
          </label>
          <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-neutral-600" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
          <button onClick={handleSend} disabled={!input.trim()} className={`p-2 rounded-full transition ${input.trim() ? 'bg-purple-600 text-white' : 'bg-neutral-800 text-neutral-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
          </button>
        </div>
      </div>

      {/* --- MODAL DE PAGAMENTO CRYPTO (FAKE) --- */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-purple-500/30 rounded-2xl w-full max-w-sm p-6 shadow-[0_0_50px_rgba(147,51,234,0.3)]">
                
                {/* Header do Modal */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white">Unlock Content</h3>
                        <p className="text-xs text-neutral-400">Secure Crypto Payment</p>
                    </div>
                    <button onClick={() => setShowPaymentModal(false)} className="text-neutral-500 hover:text-white">✕</button>
                </div>

                {/* Info do Preço */}
                <div className="flex items-center justify-between bg-black rounded-lg p-4 mb-6 border border-white/5">
                    <span className="text-sm text-neutral-300">Total Amount:</span>
                    <span className="text-2xl font-bold text-purple-400">$0.99 <span className="text-xs text-neutral-500">USDT</span></span>
                </div>

                {/* QR Code (Simulado com um quadrado colorido) */}
                <div className="flex flex-col items-center justify-center mb-6 gap-3">
                    <div className="w-48 h-48 bg-white p-2 rounded-lg">
                         {/* QR Code Placeholder - Podes usar uma imagem real de QR depois */}
                         <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=0x1234567890abcdef1234567890abcdef" alt="QR Code" className="w-full h-full" />
                    </div>
                    <p className="text-[10px] font-mono text-neutral-500 break-all text-center">
                        0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </p>
                    <div className="flex gap-2">
                        <span className="px-2 py-1 bg-blue-900/30 text-blue-400 text-[10px] rounded border border-blue-500/20">USDT (ERC20)</span>
                        <span className="px-2 py-1 bg-orange-900/30 text-orange-400 text-[10px] rounded border border-orange-500/20">BTC</span>
                    </div>
                </div>

                {/* Botão de Ação */}
                <button 
                    onClick={confirmPayment}
                    disabled={isProcessingPayment}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessingPayment ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                           Verifying Blockchain...
                        </>
                    ) : (
                        "I Have Sent the Payment"
                    )}
                </button>
                
                <p className="text-[10px] text-center text-neutral-600 mt-4">
                    Payment is processed automatically. Usually takes 1-2 minutes.
                </p>
            </div>
        </div>
      )}

    </div>
  );
}
'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Message {
  id: number;
  sender: 'user' | 'sofia';
  type: 'text' | 'image';
  content: string;
  locked?: boolean;
}

// --- FOTOS DA SOFIA ---
const PHOTOS_DATA = [
  { id: 1, src: '/sofia.jpg', triggerText: "I took this in my mirror just now... do I look okay? Be honest..." },
  { id: 2, src: '/sofia.jpg', triggerText: "You're making me feel bold. I lowered the camera a bit... is this too much?" },
  { id: 3, src: '/sofia.jpg', triggerText: "Oops... my towel almost slipped. I shouldn't send this, but I trust you." }
];

export default function SofiaChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'sofia', type: 'text', content: "Hi... is anyone there?" },
    { id: 2, sender: 'sofia', type: 'text', content: "I've never done this before. My heart is beating so fast..." }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const [photoIndex, setPhotoIndex] = useState(0);
  const [messagesSinceLastPhoto, setMessagesSinceLastPhoto] = useState(0);
  const [pendingView, setPendingView] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // --- CÉREBRO DA SOFIA (TÍMIDA / AMADORA) ---
  const getSofiaResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
    
    // 1. ELOGIOS (Ela adora)
    if (lowerText.includes("beautiful") || lowerText.includes("pretty") || lowerText.includes("cute") || lowerText.includes("sexy")) {
      return pick([
        "Really? You think so? I always feel so awkward in photos...",
        "Omg stop, you're making me blush! 🙈",
        "That means so much coming from you. I was feeling insecure today.",
        "You're too nice to me... I'm not used to this attention."
      ]);
    }

    // 2. MASTURBAÇÃO (Ela fica chocada/excitada)
    if (lowerText.includes("hard") || lowerText.includes("touching") || lowerText.includes("jerk")) {
      return pick([
        "Wait... are you doing that right now? Just thinking about me?",
        "Oh wow... I don't know what to say. That's kinda hot...",
        "My face is burning red right now knowing you're touching yourself.",
        "Knowing I have that effect on you makes me feel things too..."
      ]);
    }

    // 3. DINHEIRO (Ela recusa subtilmente, é Free)
    if (lowerText.includes("money") || lowerText.includes("pay")) {
      return pick([
        "No no, I don't want your money! I just want to talk.",
        "You don't have to pay me. I like your company.",
        "Just being here with me is enough <3"
      ]);
    }

    // 4. GENÉRICOS TÍMIDOS
    return pick([
      "I'm all alone in my room right now. It's so quiet.",
      "Do you like girls like me? I'm not a model or anything...",
      "My hands are shaking a little bit typing this. Is that weird?",
      "I keep looking at the door to make sure my roommate isn't coming.",
      "What are you doing right now? Tell me..."
    ]);
  };

  // --- REAÇÃO A FOTOS DO UTILIZADOR (Validação) ---
  const getPhotoReaction = () => {
    const reactions = [
      "Oh my god... 😳 I wasn't expecting that!",
      "Wow... it's so... big. Is that really yours?",
      "I'm covering my eyes but I'm peeking through my fingers...",
      "That looks so intense. I got butterflies in my stomach seeing that.",
      "You're very... healthy. 🙈 I've never seen one like that."
    ];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), sender: 'user', type: 'text', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);
    processSofiaResponse(currentInput, false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const userMsg: Message = { id: Date.now(), sender: 'user', type: 'image', content: imageUrl };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);
      processSofiaResponse("", true);
    }
  };

  const processSofiaResponse = (textInput: string, isPhotoReaction: boolean) => {
    setTimeout(() => {
      let replyContent = "";
      let sendPhoto = false;

      if (pendingView) {
        const waitingResponses = [
            "Did you see the picture? I'm scared you didn't like it...",
            "Why aren't you saying anything about the photo? Is it ugly?",
            "Please look at it... I'm feeling exposed here."
        ];
        replyContent = waitingResponses[Math.floor(Math.random() * waitingResponses.length)];
      } 
      else if (isPhotoReaction) {
        replyContent = getPhotoReaction();
      }
      else {
        if (photoIndex >= PHOTOS_DATA.length) {
           replyContent = "I think that's enough for today... my face is burning red! Talk later? <3";
        }
        else {
           const newCount = messagesSinceLastPhoto + 1;
           setMessagesSinceLastPhoto(newCount);
           if (newCount >= 3) {
             replyContent = PHOTOS_DATA[photoIndex].triggerText;
             sendPhoto = true;
           } else {
             replyContent = getSofiaResponse(textInput);
           }
        }
      }

      const sofiaMsg: Message = { id: Date.now() + 1, sender: 'sofia', type: 'text', content: replyContent };
      setMessages(prev => [...prev, sofiaMsg]);
      
      if (sendPhoto) {
        setTimeout(() => {
          const currentPhotoData = PHOTOS_DATA[photoIndex];
          const photoMsg: Message = { 
            id: Date.now() + 2, 
            sender: 'sofia', 
            type: 'image', 
            content: currentPhotoData.src,
            locked: true,
          };
          setMessages(prev => [...prev, photoMsg]);
          
          setPendingView(true);
          setPhotoIndex(prev => prev + 1);
          setMessagesSinceLastPhoto(0);
          setIsTyping(false);
        }, 2000);
      } else {
        setIsTyping(false);
      }
    }, 2000 + Math.random() * 1000); 
  };

  const handleReveal = (msgId: number) => {
    setMessages(prev => prev.map(msg => {
        if (msg.id === msgId) return { ...msg, locked: false }; 
        return msg;
    }));
    setPendingView(false);
    setTimeout(() => {
        const shyReaction: Message = { id: Date.now() + 10, sender: 'sofia', type: 'text', content: "So... what do you think? 🙈" };
        setMessages(prev => [...prev, shyReaction]);
        scrollToBottom();
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-900 border-b border-white/10 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Link href="/models/sofia" className="text-neutral-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </Link>
          <div className="relative">
            <img src="/sofia.jpg" className="w-10 h-10 rounded-full object-cover border border-red-500" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <div>
            <h2 className="font-bold text-sm">Sofia</h2>
            <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold bg-green-900/20 px-1 rounded inline-block">Free Chat</p>
          </div>
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/90">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3 text-sm ${
              msg.sender === 'user' 
                ? 'bg-neutral-800 text-white rounded-tr-none' 
                : 'bg-red-900/30 border border-red-500/20 text-white rounded-tl-none'
            }`}>
              
              {msg.type === 'text' && <p>{msg.content}</p>}

              {msg.type === 'image' && (
                <div className="relative mt-2">
                  <div className={`relative w-56 rounded-xl overflow-hidden ${msg.locked ? 'h-72 cursor-pointer' : 'h-auto'}`} onClick={() => msg.locked && handleReveal(msg.id)}>
                    <img src={msg.content} alt="Content" className={`w-full h-full object-cover transition duration-700 ${msg.locked ? 'blur-xl scale-110 opacity-60' : ''}`} />
                    
                    {msg.locked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10 p-4 text-center">
                        <span className="text-3xl mb-2 animate-bounce">🙈</span>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-red-300">Shy Content</p>
                        <button onClick={(e) => { e.stopPropagation(); handleReveal(msg.id); }} className="mt-2 bg-white text-red-900 font-extrabold py-3 px-6 rounded-full text-xs hover:scale-105 transition shadow-lg flex items-center gap-2">
                          <span>TAP TO REVEAL</span>
                        </button>
                      </div>
                    )}
                    
                    {msg.sender === 'user' && !msg.locked && (
                        <div className="absolute bottom-2 right-2 bg-neutral-900/80 text-white text-[9px] font-bold px-2 py-1 rounded backdrop-blur-sm">SENT</div>
                    )}
                    
                    {msg.sender === 'sofia' && !msg.locked && (
                       <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[9px] font-bold px-2 py-1 rounded backdrop-blur-sm">SEEN</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-red-900/10 border border-red-500/10 rounded-2xl rounded-tl-none p-4 flex gap-1.5 items-center h-10">
               <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
               <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
               <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 bg-neutral-900 border-t border-white/10">
        <div className="flex items-center gap-2 bg-black rounded-full px-4 py-3 border border-white/10 focus-within:border-red-500 transition">
          <label className="cursor-pointer text-neutral-400 hover:text-red-400 transition">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
             <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
          </label>
          <input type="text" placeholder="Be nice to her..." className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-neutral-600" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} />
          <button onClick={handleSend} disabled={!input.trim()} className={`p-2 rounded-full transition ${input.trim() ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-600'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
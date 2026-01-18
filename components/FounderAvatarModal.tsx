import React, { useState, useRef, useEffect } from 'react';
import { X, Mic, Video, PhoneOff, MessageSquare, ShieldCheck, MoreVertical, Paperclip } from 'lucide-react';
import { chatWithFounderAvatar } from '../services/gemini';

interface FounderAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  source?: string;
}

const FounderAvatarModal: React.FC<FounderAvatarModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Karibu! Welcome! I'm David from FarmFlow. Ask me anything about how we're saving mangoes in Kenya!" 
    }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Prepare history for API
    const apiHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const responseText = await chatWithFounderAvatar(userMsg, apiHistory);
    
    setLoading(false);
    setMessages(prev => [...prev, { 
        role: 'model', 
        text: responseText || "Signal lost...",
        source: "Verified Transcript [04:20]" 
    }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Main Container - Video Call Layout */}
      <div className="w-full h-full md:max-w-6xl md:h-[90vh] bg-[#202124] md:rounded-2xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl border border-[#3c4043]">
        
        {/* LEFT: Video Feed (The Founder) */}
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
            {/* Simulated Video Feed */}
            <img 
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=1200&sat=-20" 
                alt="David Alade" 
                className="w-full h-full object-cover opacity-90 scale-105"
            />
            
            {/* Overlays */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
                 <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-white font-mono text-xs font-bold tracking-wider">LIVE_AVATAR</span>
                 </div>
                 <div className="bg-green-500/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-green-500/30">
                    <ShieldCheck className="w-3 h-3 text-green-400" />
                    <span className="text-green-100 font-mono text-xs font-bold tracking-wider">VERIFIED_IDENTITY</span>
                 </div>
            </div>

            <div className="absolute bottom-6 left-6 text-white drop-shadow-md">
                <h2 className="text-2xl font-serif font-bold">David Alade</h2>
                <p className="text-sm opacity-80 font-hand">Founder @ FarmFlow • Nairobi, KE</p>
            </div>

            {/* Speaking Indicator */}
            {loading && (
                <div className="absolute bottom-6 right-6 flex items-center gap-1">
                    <div className="w-1 h-3 bg-white animate-[bounce_1s_infinite]"></div>
                    <div className="w-1 h-5 bg-white animate-[bounce_1s_infinite_0.1s]"></div>
                    <div className="w-1 h-2 bg-white animate-[bounce_1s_infinite_0.2s]"></div>
                </div>
            )}
        </div>

        {/* RIGHT: Chat Interface (Side Panel) */}
        <div className="w-full md:w-[400px] bg-white flex flex-col border-l border-[#3c4043]">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
                <div>
                    <h3 className="font-serif font-bold text-ink">Interview Chat</h3>
                    <p className="text-xs text-gray-500">Ask about culture, risks, and tech.</p>
                </div>
                <button onClick={onClose} className="md:hidden text-ink">
                    <X />
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FA]">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-ink text-white rounded-br-none' 
                            : 'bg-white text-ink border border-gray-200 rounded-bl-none'
                        }`}>
                            {msg.text}
                        </div>
                        {msg.role === 'model' && msg.source && (
                            <span className="text-[10px] text-gray-400 mt-1 ml-1 font-mono">{msg.source}</span>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start">
                        <div className="bg-gray-100 px-4 py-2 rounded-full text-xs text-gray-500 animate-pulse">
                            David is thinking...
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a question..."
                        className="w-full bg-gray-100 border-0 rounded-full px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-ink focus:bg-white transition-all outline-none"
                    />
                    <button 
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-ink text-white rounded-full hover:bg-gray-700 transition-colors"
                    >
                        <MessageSquare className="w-4 h-4" />
                    </button>
                </div>
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {["How's the runway?", "What's the tech stack?", "Why this problem?"].map((q, i) => (
                        <button 
                            key={i}
                            onClick={() => setInput(q)}
                            className="whitespace-nowrap px-3 py-1 bg-surface border border-gray-200 rounded-full text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Video Controls (Floating Bottom) */}
        <div className="absolute bottom-0 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-[#202124] md:rounded-full border border-[#3c4043] w-full md:w-auto justify-center z-10 shadow-2xl">
            <button className="p-3 rounded-full bg-[#3c4043] text-white hover:bg-[#5f6368] transition-colors">
                <Mic className="w-5 h-5" />
            </button>
            <button className="p-3 rounded-full bg-[#3c4043] text-white hover:bg-[#5f6368] transition-colors">
                <Video className="w-5 h-5" />
            </button>
            <button 
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
            >
                <PhoneOff className="w-4 h-4" />
                <span className="hidden sm:inline">End Call</span>
            </button>
            <button className="hidden sm:block p-3 rounded-full bg-transparent text-gray-400 hover:bg-[#3c4043] transition-colors">
                <MoreVertical className="w-5 h-5" />
            </button>
        </div>

      </div>
    </div>
  );
};

export default FounderAvatarModal;
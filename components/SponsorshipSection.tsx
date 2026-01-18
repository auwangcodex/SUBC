import React from 'react';
import { Shield, Check, Award } from 'lucide-react';

const SponsorshipSection: React.FC = () => {
  const schools = [
    "Harvard Business School",
    "Stanford GSB",
    "MIT Sloan",
    "Columbia Business School",
    "Wharton",
    "INSEAD",
    "LBS",
    "Berkeley Haas",
    "Yale SOM"
  ];

  return (
    <section className="bg-white py-16 border-b border-border overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-medium mb-4">
              Trust is our currency.
            </h2>
            <p className="text-gray-600 text-lg font-light leading-relaxed mb-6">
              In emerging markets, trust is the bottleneck. We solve this by partnering with the world's most rigorous alumni networks to vet every founder and talent.
            </p>
            
            <div className="space-y-3 mb-8">
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check size={12} />
                  </div>
                  <span className="text-gray-700">Identity & Background Verified</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check size={12} />
                  </div>
                  <span className="text-gray-700">Technical Skills Assessment</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check size={12} />
                  </div>
                  <span className="text-gray-700">Escrow-secured Trial Periods</span>
               </div>
            </div>
            
          </div>

          <div className="md:w-1/2 bg-surface p-8 rounded-2xl border border-border relative overflow-hidden">
             {/* Decorative Background Blur */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-ink/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

             <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                    <Award className="w-6 h-6 text-ink" />
                </div>
                <div>
                    <div className="font-bold text-ink text-lg">Elite Network</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Vetted by Alumni From</div>
                </div>
             </div>
             
             {/* Carousel Container */}
             <div className="relative w-full overflow-hidden mb-8 py-4">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent z-10"></div>
                
                <div className="flex animate-marquee whitespace-nowrap items-center">
                    {[...schools, ...schools, ...schools].map((school, i) => (
                        <div key={i} className="mx-6 flex items-center gap-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                            <span className="text-lg font-serif font-bold text-gray-400 hover:text-ink transition-colors cursor-default">
                                {school}
                            </span>
                        </div>
                    ))}
                </div>
             </div>

             <div className="text-center relative z-10">
                 <p className="text-[10px] text-gray-400 font-mono">
                    *Alumni networks act as independent vetting nodes.
                 </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SponsorshipSection;
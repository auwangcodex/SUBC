import React, { useState } from 'react';
import { UserRole } from '../types';
import { Play, Lock, Video, FileCheck, Scale, AlertTriangle, Check, Clock, FileSignature } from 'lucide-react';
import FounderAvatarModal from './FounderAvatarModal';
import TrialHiringModal from './TrialHiringModal';

const RoleSection: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>('investor'); // Default to Talent
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const isFounder = activeRole === 'entrepreneur';

  return (
    <section className="py-24 bg-paper">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-medium text-ink mb-3">Choose your path</h2>
            <p className="font-hand text-xl text-gray-500">Are you hiring builders or looking to build?</p>
        </div>

        <div className="bg-surface rounded-2xl p-2 max-w-sm mx-auto flex mb-12 border border-border">
             <button
                onClick={() => setActiveRole('entrepreneur')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    isFounder ? 'bg-white shadow-soft text-ink' : 'text-gray-500 hover:text-ink'
                }`}
            >
                Startups
            </button>
            <button
                onClick={() => setActiveRole('investor')}
                className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    !isFounder ? 'bg-white shadow-soft text-ink' : 'text-gray-500 hover:text-ink'
                }`}
            >
                Talent
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
            
            {/* Left: Value Prop List */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <h3 className="font-serif text-2xl mb-6">
                    {isFounder ? "For Founders" : "For Talent"}
                </h3>
                <ul className="space-y-6">
                    {(isFounder ? [
                        { title: "Trial-First Hiring", desc: "Start with a 2-6 week trial. Full-time is earned, not promised." },
                        { title: "Milestone Contracting", desc: "Escrow payments released only when code ships." },
                        { title: "No Ghosting", desc: "Automated check-ins. If they disappear, you get your money back." }
                    ] : [
                        { title: "Uncapped Growth", desc: "Join the next unicorn in Lagos or Nairobi before they scale globally." },
                        { title: "Diaspora Impact", desc: "Reconnect with your roots. Build the infrastructure your community needs." },
                        { title: "Verified Missions", desc: "No vaporware. Interrogate the founder avatar. See the real runway." }
                    ]).map((item, i) => (
                        <li key={i} className="flex gap-4 group">
                            <div className="w-1 h-full bg-border group-hover:bg-ink transition-colors rounded-full"></div>
                            <div>
                                <h4 className="font-bold text-ink">{item.title}</h4>
                                <p className="text-gray-500 font-light text-sm">{item.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right: Feature Showcase (Dynamic based on Role) */}
            <div className="w-full md:w-1/2">
                
                {isFounder ? (
                    /* STARTUP VIEW: Trial Hiring Timeline Card */
                    <div className="bg-surface rounded-xl border border-border shadow-soft p-8 h-full flex flex-col relative overflow-hidden group hover:border-ink/20 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Scale className="w-32 h-32" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="inline-block bg-ink text-white text-[10px] px-2 py-1 rounded font-mono uppercase mb-4 tracking-wider">
                                New Feature
                            </div>
                            <h3 className="font-serif text-2xl font-bold mb-2">Smart Trial Contracts</h3>
                            <p className="text-gray-600 mb-6 font-light">
                                Don't guess based on a CV. Verify execution in the real world.
                            </p>

                            {/* Timeline Component */}
                            <div className="bg-white/50 rounded-xl p-4 mb-6 border border-border/50 backdrop-blur-sm">
                               <div className="relative pl-4 space-y-8 border-l-2 border-gray-200 ml-2 py-2">
                                  
                                  {/* Step 1: Interview */}
                                  <div className="relative">
                                     <div className="absolute -left-[23px] top-0 bg-green-100 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                                        <Check className="w-3 h-3 text-green-600" />
                                     </div>
                                     <div>
                                        <h4 className="text-sm font-bold text-gray-800 leading-none mb-1">Interview & Match</h4>
                                        <p className="text-xs text-gray-500">Day 0: Initial capability check</p>
                                     </div>
                                  </div>

                                  {/* Step 2: Trial (Active) */}
                                  <div className="relative">
                                     <div className="absolute -left-[23px] top-0 bg-ink rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-sm ring-2 ring-ink/10">
                                         <Clock className="w-3 h-3 text-white" />
                                     </div>
                                     <div>
                                        <h4 className="text-sm font-bold text-ink leading-none mb-3">Trial Period (2-4 Weeks)</h4>
                                        
                                        {/* Embedded Milestone Card */}
                                        <div className="bg-white border border-border rounded-lg p-3 shadow-sm relative group/card cursor-pointer hover:border-ink/30 transition-colors" onClick={() => setIsTrialOpen(true)}>
                                           <div className="absolute -right-1 -top-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                           <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
                                              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Milestones Locked</span>
                                              <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 rounded font-bold">ESCROW</span>
                                           </div>
                                           <ul className="space-y-2">
                                              <li className="flex items-center gap-2 text-xs">
                                                 <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                 <span className="text-gray-400 line-through decoration-gray-400">Week 1: Env Setup & Architecture</span>
                                              </li>
                                              <li className="flex items-center gap-2 text-xs">
                                                 <div className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse"></div>
                                                 <span className="font-bold text-ink">Week 2: Ship MVP Feature ⚡</span>
                                              </li>
                                           </ul>
                                        </div>
                                     </div>
                                  </div>

                                  {/* Step 3: Formal Contract */}
                                  <div className="relative">
                                     <div className="absolute -left-[23px] top-0 bg-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-200">
                                        <FileSignature className="w-3 h-3 text-gray-300" />
                                     </div>
                                     <div>
                                        <h4 className="text-sm font-medium text-gray-400 leading-none mb-1">Formal Contract</h4>
                                        <p className="text-xs text-gray-400">Full-time offer unlocked</p>
                                     </div>
                                  </div>

                               </div>
                            </div>

                            <button 
                                onClick={() => setIsTrialOpen(true)}
                                className="w-full py-3 bg-ink text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-hover"
                            >
                                <Scale className="w-4 h-4" />
                                Draft Trial Contract
                            </button>
                        </div>
                    </div>
                ) : (
                    /* TALENT VIEW: Founder Avatar Card */
                    <div className="bg-surface rounded-xl border border-border shadow-soft p-8 h-full flex flex-col relative overflow-hidden group hover:border-ink/20 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Video className="w-32 h-32" />
                        </div>

                        <div className="relative z-10">
                            <div className="inline-block bg-ink text-white text-[10px] px-2 py-1 rounded font-mono uppercase mb-4 tracking-wider">
                                New for Talent
                            </div>
                            <h3 className="font-serif text-2xl font-bold mb-2">Founder Video Avatar™</h3>
                            <p className="text-gray-600 mb-6 font-light">
                                Meet the founder before you apply. Interrogate their AI twin about runway, burnout, and the real mission.
                            </p>

                            <div className="bg-white rounded-lg border border-border mb-6 shadow-sm overflow-hidden">
                                <div className="h-32 bg-gray-800 relative group cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
                                    <img 
                                        src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=400" 
                                        className="w-full h-full object-cover object-center opacity-60 group-hover:opacity-80 transition-opacity" 
                                        alt="David Alade"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                            <Play className="w-5 h-5 text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2 flex gap-1">
                                        <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 rounded">LIVE</div>
                                        <div className="bg-black/50 text-white text-[10px] font-bold px-1.5 rounded">David @ FarmFlow</div>
                                    </div>
                                </div>
                                <div className="p-3 bg-white">
                                    <div className="text-xs font-mono text-gray-500 mb-2">TRY ASKING:</div>
                                    <div className="flex gap-2">
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">"What's the runway?"</span>
                                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-gray-600">"Why is this hard?"</span>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={() => setIsAvatarOpen(true)}
                                className="w-full py-3 bg-ink text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-soft hover:shadow-soft-hover"
                            >
                                <Video className="w-4 h-4" />
                                Video Call Founder (Demo)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
      
      <FounderAvatarModal isOpen={isAvatarOpen} onClose={() => setIsAvatarOpen(false)} />
      <TrialHiringModal isOpen={isTrialOpen} onClose={() => setIsTrialOpen(false)} />
    </section>
  );
};

export default RoleSection;
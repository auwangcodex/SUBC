import React from 'react';
import { ArrowUpRight, Zap, Leaf, HeartPulse, BookOpen } from 'lucide-react';

const StartupSection: React.FC = () => {
    const startups = [
        { 
            name: "FarmFlow", 
            industry: "AgriTech", 
            location: "Nairobi, Kenya", 
            desc: "Solar-powered cold chain logistics reducing post-harvest loss by 40% for mango farmers.", 
            stage: "Seed",
            icon: Leaf,
            color: "bg-green-100 text-green-700"
        },
        { 
            name: "PayGrid", 
            industry: "Fintech", 
            location: "Lagos, Nigeria", 
            desc: "API infrastructure allowing gig workers to receive USD payments directly to local mobile money wallets.", 
            stage: "Series A",
            icon: Zap,
            color: "bg-blue-100 text-blue-700"
        },
        { 
            name: "MedConnect", 
            industry: "HealthTech", 
            location: "Kigali, Rwanda", 
            desc: "Telemedicine platform connecting rural clinics to specialists via low-bandwidth video.", 
            stage: "Pre-Seed",
            icon: HeartPulse,
            color: "bg-red-100 text-red-700"
        },
        { 
            name: "EduMinds", 
            industry: "EdTech", 
            location: "Cairo, Egypt", 
            desc: "AI-driven personalized STEM curriculum designed for offline-first tablet environments.", 
            stage: "Seed",
            icon: BookOpen,
            color: "bg-amber-100 text-amber-700"
        }
    ];

    return (
        <section className="py-24 bg-surface border-b border-border">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-serif font-medium text-ink mb-3">Vetted Startups</h2>
                        <p className="font-hand text-xl text-gray-500">Real missions. Verified runway. Backed by the best.</p>
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                        Showing 4 of 120+ active companies
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {startups.map((startup, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-border hover:border-ink/30 transition-all group shadow-sm cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="w-5 h-5 text-gray-400" />
                            </div>
                            
                            <div className="flex items-start gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-lg ${startup.color} flex items-center justify-center flex-shrink-0`}>
                                    <startup.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-xl text-ink leading-tight">{startup.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{startup.industry}</span>
                                        <span className="text-gray-300">•</span>
                                        <span className="text-xs text-gray-500">{startup.location}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-gray-600 font-light leading-relaxed mb-4">
                                {startup.desc}
                            </p>

                            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                <div className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-600 uppercase tracking-wider">
                                    {startup.stage}
                                </div>
                                <div className="px-2 py-1 bg-green-50 rounded text-[10px] font-bold text-green-700 uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Verified
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StartupSection;
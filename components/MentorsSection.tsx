import React from 'react';
import { ArrowRight } from 'lucide-react';

const MentorsSection: React.FC = () => {
  const talents = [
    {
      name: "David Chen",
      role: "Senior React Engineer",
      experience: "Ex-Shopify",
      bio: "Full-stack specialist looking for fintech opportunities.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&sat=-100", 
    },
    {
      name: "Priya Patel",
      role: "Product Manager",
      experience: "Ex-Revolut",
      bio: "Scaled payments products to 1M users.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&sat=-100",
    },
    {
      name: "James Wilson",
      role: "UX/UI Lead",
      experience: "Ex-Airbnb",
      bio: "Designing mobile-first experiences.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&sat=-100",
    },
    {
      name: "Elena Rodriguez",
      role: "Security Engineer",
      experience: "Ex-Cloudflare",
      bio: "Expert in infrastructure security.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&sat=-100",
    }
  ];

  return (
    <section id="talent" className="py-24 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-serif font-medium text-ink">The Talent Pool</h2>
            <p className="font-hand text-lg text-gray-500 mt-2">Top 5% of global builders, ready to deploy.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-gray-600 transition-colors">
            Browse all candidates <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Updated Grid: 4 cols on lg, 2 on md, compact images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {talents.map((talent, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="h-48 overflow-hidden rounded-lg mb-4 bg-gray-100 relative">
                 <img 
                   src={talent.image} 
                   alt={talent.name} 
                   className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-800 uppercase tracking-wide">
                    {talent.experience}
                 </div>
              </div>
              
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight mb-1">{talent.name}</h3>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-2">{talent.role}</div>
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{talent.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
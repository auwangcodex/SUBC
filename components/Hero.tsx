import React from 'react';
import { ArrowRight, Search, Briefcase } from 'lucide-react';

interface HeroProps {
  onFindTalent: () => void;
  onFindWork: () => void;
}

const Hero: React.FC<HeroProps> = ({ onFindTalent, onFindWork }) => {
  return (
    <div className="relative bg-paper pt-24 pb-20 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
          <div className="md:w-3/5">
            <div className="inline-flex items-center gap-2 mb-6 text-gray-500 bg-surface px-3 py-1 rounded-full text-sm">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span className="font-hand">Accepting new startups</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-ink leading-[1.1] mb-6">
              Build your dream team <br/>
              <span className="italic text-gray-400">globally.</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 font-light max-w-lg leading-relaxed">
              Connecting emerging market founders with world-class builders. No borders, just talent.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button 
                onClick={onFindTalent}
                className="px-6 py-3 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center shadow-soft"
              >
                Find Talent
                <Search className="ml-2 w-4 h-4" />
              </button>
              <button 
                onClick={onFindWork}
                className="px-6 py-3 bg-white border border-border text-ink rounded-lg font-medium hover:bg-surface transition-all flex items-center shadow-sm hover:shadow-md"
              >
                Find Opportunities
                <Briefcase className="ml-2 w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* Doodle Notes */}
            <div className="mt-12 relative pl-8 border-l border-dashed border-gray-300">
               <div className="font-hand text-lg text-gray-500 -rotate-1 transform origin-bottom-left">
                  "We need a React dev... yesterday!" <br/>
                  <span className="text-sm text-gray-400">— Founder in Lagos</span>
               </div>
            </div>
          </div>

          {/* Right Side - Notepad Graphic */}
          <div className="md:w-2/5 relative">
            <div className="bg-white rounded-lg border border-border shadow-soft-hover p-8 relative rotate-2 transform transition-transform hover:rotate-0 duration-500">
               {/* Doodle Pin */}
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-yellow-100/50 -rotate-2"></div>

               <div className="space-y-6">
                 <div className="flex items-center gap-4 border-b border-border pb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">👩‍💻</div>
                    <div>
                        <div className="font-serif font-bold text-lg">Sarah K.</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Product Manager</div>
                    </div>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0"></div>
                        <p>Ex-Uber & Shopify experience</p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0"></div>
                        <p>Based in Berlin (GMT+1)</p>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-ink flex-shrink-0"></div>
                        <p>Ready to start immediately</p>
                    </div>
                 </div>

                 <div className="pt-2">
                    <div className="inline-block bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                        Verified Match
                    </div>
                 </div>
               </div>
            </div>
            
            {/* Background layered paper */}
            <div className="absolute top-2 left-2 w-full h-full bg-surface rounded-lg border border-border -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
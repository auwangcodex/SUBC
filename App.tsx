import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import SponsorshipSection from './components/SponsorshipSection';
import RoleSection from './components/RoleSection';
import StartupSection from './components/StartupSection';
import MentorsSection from './components/MentorsSection';
import SignUpForm from './components/SignUpForm';
import ResearchModal from './components/ResearchModal';
import Footer from './components/Footer';
import { MediaInfluenceEvaluator } from './components/MediaInfluenceEvaluator';
import { Menu, X, BarChart3 } from 'lucide-react';

function App() {
  const [showResearch, setShowResearch] = useState(false);
  const [showMediaInfluence, setShowMediaInfluence] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const [showResearchBtn, setShowResearchBtn] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowResearchBtn(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-paper/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
               <div className="w-6 h-6 bg-ink rounded-md flex items-center justify-center">
                  <span className="text-white font-serif font-bold italic text-sm">T</span>
               </div>
               <span className="text-lg font-serif font-semibold text-ink tracking-tight">
                 TalentBridge
               </span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center text-sm font-medium text-gray-600">
              <button onClick={() => scrollToSection('paths')} className="hover:text-ink transition-colors">For The Trust</button>
              <button onClick={() => scrollToSection('apply')} className="px-4 py-2 bg-ink text-white rounded-md hover:bg-gray-800 transition-colors shadow-soft">
                Get Early Access
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-ink">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-paper border-b border-border p-4 space-y-4">
            <button onClick={() => scrollToSection('paths')} className="block w-full text-left py-2 text-ink">For The Trust</button>
            <button onClick={() => scrollToSection('apply')} className="block w-full text-center py-2 bg-ink text-white rounded-md">
              Get Early Access
            </button>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <Hero 
          onFindTalent={() => scrollToSection('talent')}
          onFindWork={() => scrollToSection('startups')}
        />

        <SponsorshipSection />
        
        {/* Value Prop Stats - Clean Minimalist */}
        <section className="bg-paper py-16 border-y border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl hover:bg-surface transition-colors duration-500">
                <div className="font-serif text-4xl font-bold mb-2">24h</div>
                <div className="font-hand text-lg text-gray-500">Average match time</div>
              </div>
              <div className="text-center p-6 rounded-xl hover:bg-surface transition-colors duration-500">
                <div className="font-serif text-4xl font-bold mb-2">Top 5%</div>
                <div className="font-hand text-lg text-gray-500">Global talent vetted</div>
              </div>
              <div className="text-center p-6 rounded-xl hover:bg-surface transition-colors duration-500">
                <div className="font-serif text-4xl font-bold mb-2">15+</div>
                <div className="font-hand text-lg text-gray-500">Emerging markets</div>
              </div>
            </div>
          </div>
        </section>

        <div id="paths">
            <RoleSection />
        </div>

        <div id="startups">
            <StartupSection />
        </div>
        
        <MentorsSection />
        
        <SignUpForm />
      </main>

      <Footer />

      <ResearchModal isOpen={showResearch} onClose={() => setShowResearch(false)} />
      <MediaInfluenceEvaluator isOpen={showMediaInfluence} onClose={() => setShowMediaInfluence(false)} />

      {/* Floating Buttons */}
      {showResearchBtn && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          {/* Media Influence Evaluator Button */}
          <button
            onClick={() => setShowMediaInfluence(true)}
            className="bg-ink text-paper shadow-soft rounded-full p-3 hover:shadow-soft-hover hover:bg-ink/90 transition-all flex items-center gap-2"
            title="UNRI 媒体影响力评估"
          >
            <BarChart3 size={20} />
            <span className="text-sm font-medium pr-1">影响力评估</span>
          </button>

          {/* Research Button */}
          <button
            onClick={() => setShowResearch(true)}
            className="bg-white border border-border shadow-soft rounded-full p-3 hover:shadow-soft-hover transition-all"
            title="See Market Insights"
          >
            <div className="absolute top-1 right-2 w-2 h-2 bg-red-400 rounded-full"></div>
            <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
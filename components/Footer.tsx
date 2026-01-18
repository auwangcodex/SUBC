import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-paper border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 flex items-center gap-2">
           <div className="w-6 h-6 bg-ink rounded-md flex items-center justify-center">
              <span className="text-white font-serif font-bold italic text-sm">T</span>
           </div>
           <span className="text-lg font-serif font-semibold text-ink">TalentBridge</span>
        </div>
        <div className="flex space-x-6 text-sm text-gray-500">
          <a href="#" className="hover:text-ink transition-colors">About</a>
          <a href="#" className="hover:text-ink transition-colors">Manifesto</a>
          <a href="#" className="hover:text-ink transition-colors">Twitter</a>
          <a href="#" className="hover:text-ink transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
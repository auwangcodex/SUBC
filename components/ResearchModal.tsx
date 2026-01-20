import React, { useEffect, useState } from 'react';
import { X, Lightbulb } from 'lucide-react';
import { generateMarketResearch } from '../services/gemini';
import { ResearchItem } from '../types';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResearchModal: React.FC<ResearchModalProps> = ({ isOpen, onClose }) => {
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && research.length === 0) {
      const fetchResearch = async () => {
        const data = await generateMarketResearch();
        setResearch(data);
        setLoading(false);
      };
      fetchResearch();
    }
  }, [isOpen, research.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900">Why TalentBridge?</h3>
            <p className="text-sm text-slate-500">Market Research & Insights</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
             <div className="space-y-6">
               {[1, 2, 3].map(i => (
                 <div key={i} className="animate-pulse">
                   <div className="h-5 bg-slate-200 rounded w-1/3 mb-2"></div>
                   <div className="h-4 bg-slate-200 rounded w-full mb-1"></div>
                   <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                 </div>
               ))}
             </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100 flex gap-4">
                 <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0" />
                 <p className="text-sm text-amber-900">
                   <strong>Research Insight:</strong> Based on stakeholder interviews, trust is the scarce commodity in emerging markets. First-time founders lack signals to prove credibility to foreign investors.
                 </p>
              </div>

              {research.map((item, index) => (
                <div key={index} className="border-l-4 border-ink pl-4">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              ))}

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Data generated based on current venture capital dynamics in emerging markets.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchModal;
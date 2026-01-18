import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, FileText, ArrowRight, Shield } from 'lucide-react';

interface TrialHiringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialHiringModal: React.FC<TrialHiringModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<2 | 4 | 6>(4);
  const [deliverables, setDeliverables] = useState(['', '', '']);
  
  if (!isOpen) return null;

  const handleDeliverableChange = (index: number, value: string) => {
    const newDeliverables = [...deliverables];
    newDeliverables[index] = value;
    setDeliverables(newDeliverables);
  };

  const isStep2Valid = deliverables.every(d => d.length > 10);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-paper rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-border">
        
        {/* Header */}
        <div className="bg-surface border-b border-border p-6 flex justify-between items-center">
          <div>
            <h3 className="font-serif font-bold text-xl text-ink">Trial Contract Generator</h3>
            <p className="text-sm text-gray-500 font-mono uppercase tracking-wider">De-risk your next hire</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-ink">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${step >= i ? 'bg-ink' : 'bg-gray-200'}`}></div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center mb-8">
                <h4 className="text-2xl font-serif font-medium mb-2">Select Trial Duration</h4>
                <p className="text-gray-600 font-light">Full-time is earned, not promised. Choose a probation period.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[2, 4, 6].map((weeks) => (
                  <button
                    key={weeks}
                    onClick={() => setDuration(weeks as 2 | 4 | 6)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      duration === weeks 
                        ? 'border-ink bg-surface shadow-soft' 
                        : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl font-bold mb-1">{weeks}</div>
                    <div className="text-xs uppercase font-bold text-gray-400">Weeks</div>
                  </button>
                ))}
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex gap-3 text-sm text-yellow-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>Funds are held in escrow. If the talent ghost, you get 100% of the remaining balance back. No questions asked.</p>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-4 bg-ink text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                Next: Define Milestones <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div>
                <h4 className="text-2xl font-serif font-medium mb-2">Define Success</h4>
                <p className="text-gray-600 font-light text-sm">
                  Be specific. "Work on frontend" is <span className="text-red-500 font-bold">rejected</span>. 
                  "Ship Login Page" is <span className="text-green-600 font-bold">accepted</span>.
                </p>
              </div>

              <div className="space-y-4">
                {deliverables.map((d, i) => (
                  <div key={i}>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Milestone {i + 1}</label>
                    <input 
                      type="text" 
                      value={d}
                      onChange={(e) => handleDeliverableChange(i, e.target.value)}
                      placeholder={i === 0 ? "e.g. Deploy MVP to Staging" : i === 1 ? "e.g. Integrate Stripe Payments" : "e.g. Complete User Dashboard"}
                      className="w-full p-3 bg-surface border-b-2 border-gray-200 focus:border-ink outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                  isStep2Valid ? 'bg-ink text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Review Contract <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              
              <h4 className="text-2xl font-serif font-medium">Smart Contract Ready</h4>
              <p className="text-gray-600 font-light">
                This offer is strictly performance-based.
              </p>

              <div className="bg-surface p-6 rounded-lg text-left space-y-4 font-mono text-sm border border-border">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold">{duration} Weeks (Probation)</span>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-500 block">Locked Deliverables:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    {deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t border-gray-200 text-xs text-gray-500 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  Payments released only upon milestone completion.
                </div>
              </div>

              <button 
                onClick={onClose}
                className="w-full py-4 bg-ink text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-soft"
              >
                Send Offer to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrialHiringModal;
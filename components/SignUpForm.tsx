import React, { useState } from 'react';
import { UserRole } from '../types';

const SignUpForm: React.FC = () => {
  const [role, setRole] = useState<UserRole>('entrepreneur');

  const isFounder = role === 'entrepreneur';

  // Google Form URLs (Appended ?embedded=true for cleaner integration)
  const startupFormUrl = "https://docs.google.com/forms/d/148PXdbxlPxLNSWVu9NHHtOx5pYnIsmZfvNH6J78CjHs/viewform?embedded=true";
  const talentFormUrl = "https://docs.google.com/forms/d/1JeI0CZtQ7H-d7JOPWY1zjzx9VGY-HeWeNdS-O1deDTQ/viewform?embedded=true";

  const targetUrl = isFounder ? startupFormUrl : talentFormUrl;

  return (
    <div id="apply" className="bg-surface py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-border rounded-xl shadow-soft overflow-hidden">
        <div className="p-8 md:p-12 pb-6 text-center">
          <h2 className="text-3xl font-serif font-medium mb-4">Get Early Access</h2>
          <p className="text-gray-500 mb-8 font-light max-w-xl mx-auto">
             We manually vet every member to ensure the highest quality network. 
             Select your path below to load the application.
          </p>
          
          {/* Role Switcher */}
          <div className="flex justify-center mb-6">
              <div className="bg-surface p-1 rounded-lg flex">
                  <button
                      type="button"
                      onClick={() => setRole('entrepreneur')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                          isFounder ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'
                      }`}
                  >
                      I'm Hiring (Startups)
                  </button>
                  <button
                      type="button"
                      onClick={() => setRole('investor')}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                          !isFounder ? 'bg-white shadow-sm text-ink' : 'text-gray-500 hover:text-ink'
                      }`}
                  >
                      I'm Working (Talent)
                  </button>
              </div>
          </div>

          <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100/50 inline-block text-left max-w-2xl w-full">
             {isFounder ? (
                <div className="flex gap-3">
                    <div className="w-1 bg-ink rounded-full"></div>
                    <div>
                        <h3 className="font-bold text-sm text-ink">Application for Founders</h3>
                        <p className="text-xs text-gray-600">
                           Focus: Runway validation, mission clarity, and team composition.
                        </p>
                    </div>
                </div>
             ) : (
                <div className="flex gap-3">
                    <div className="w-1 bg-ink rounded-full"></div>
                     <div>
                        <h3 className="font-bold text-sm text-ink">Application for Talent</h3>
                        <p className="text-xs text-gray-600">
                           Focus: Technical portfolio, remote work experience, and soft skills.
                        </p>
                    </div>
                </div>
             )}
          </div>
        </div>

        {/* Embedded Form */}
        <div className="w-full bg-gray-50 border-t border-border min-h-[600px] relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
                <p className="text-gray-400 animate-pulse">Loading form...</p>
            </div>
            <iframe 
                src={targetUrl} 
                width="100%" 
                height="800" 
                frameBorder="0" 
                marginHeight={0} 
                marginWidth={0}
                className="w-full bg-white"
                title="Application Form"
            >
                Loading…
            </iframe>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
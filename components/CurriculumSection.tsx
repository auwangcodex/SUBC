import React from 'react';

const CurriculumSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Profile",
      description: "Founders create a company profile. Talent builds a portfolio highlighting experience.",
    },
    {
      num: "02",
      title: "Match",
      description: "Our algorithm pairs founders with talent based on skills and mission alignment.",
    },
    {
      num: "03",
      title: "Deploy",
      description: "Handle contracts and payroll seamlessly. Start working in 48 hours.",
    }
  ];

  return (
    <section id="process" className="py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center mb-16">
            <span className="font-hand text-xl text-gray-400 block mb-2">Simple by design</span>
            <h2 className="text-3xl font-serif font-medium text-ink">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-border shadow-soft hover:shadow-soft-hover transition-all duration-300">
                  <div className="font-serif text-5xl text-gray-200 mb-6 font-bold">{step.num}</div>
                  <h3 className="text-xl font-bold mb-3 font-serif">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{step.description}</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
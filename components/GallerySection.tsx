import React from 'react';

const GallerySection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-medium mb-3">Work without borders</h2>
            <p className="font-hand text-lg text-gray-400">Collaborate as if you are in the same room.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden aspect-video relative group">
                 <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1600" 
                    alt="Collaboration"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <div className="font-serif text-xl">Sync</div>
                 </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video relative group">
                 <img 
                    src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=1600" 
                    alt="Deep Work"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <div className="font-serif text-xl">Focus</div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
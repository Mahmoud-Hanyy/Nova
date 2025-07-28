import React from 'react';

export const Gallery = () => {
  const images = [
    "https://placehold.co/600x400/1e293b/ffffff?text=Side+View",
    "https://placehold.co/600x400/1e293b/ffffff?text=Top+View",
    "https://placehold.co/600x400/1e293b/ffffff?text=Sole+Detail",
    "https://placehold.co/600x400/1e293b/ffffff?text=On-Foot",
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white text-center">In-Depth Look</h2>
        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((src, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300">
              <img src={src} alt={`Sneaker view ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
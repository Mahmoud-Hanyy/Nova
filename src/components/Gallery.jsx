import React, { useState } from "react";
import BottomImage from "../assets/bottom.jpg";
import DarkImage from "../assets/dark.jpg";
import LightImage from "../assets/light.jpg";

export const Gallery = () => {
  const images = [LightImage, BottomImage, DarkImage];
  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-20 bg-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">
          In-Depth Look
        </h2>
        <div className="relative w-full max-w-lg h-80 flex items-center justify-center">
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-indigo-600 transition"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <img
            src={images[current]}
            alt={`Sneaker view ${current + 1}`}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-indigo-600 transition"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-indigo-500" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

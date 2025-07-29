import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import { Model } from "./Model";
import BottomImage from "../assets/bottom.jpg";
import DarkImage from "../assets/dark.jpg";
import LightImage from "../assets/light.jpg";
import SideImage from "../assets/side.jpg";

export const LandingPage = () => {
  const images = [LightImage, BottomImage, DarkImage];

  return (
    <>
      <section className="h-screen flex flex-col md:flex-row items-center justify-center pt-16">
        <div className="w-full md:w-1/2 text-center md:text-left p-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Project: Nova
            <br />
            <span className="text-indigo-400">Future of Footwear</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-lg mx-auto md:mx-0">
            Experience unparalleled comfort and futuristic design. The Nova
            sneaker is engineered for performance and styled for the streets.
          </p>
          <button className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Explore Now <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full">
          <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.5}
                castShadow
              />
              <Model scale={0.0065} position={[0, -0.15, 0]} />
            </Suspense>
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-gray-800">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">
            In-Depth Look
          </h2>
          <div className="mt-12 grid gap-8 grid-cols-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300"
              >
                <img
                  src={src}
                  alt={`Sneaker view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src={SideImage}
              alt="Lifestyle"
              className="rounded-lg shadow-2xl w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-extrabold text-white">
              Engineered for Excellence
            </h2>
            <p className="mt-4 text-gray-300">
              The Project: Nova sneaker is the culmination of years of research
              in material science and ergonomic design. Our proprietary
              'Aether-foam' sole provides responsive cushioning that adapts to
              your every step, while the breathable 'Exo-weave' upper ensures
              your feet stay cool and comfortable, no matter the intensity.
            </p>
            <p className="mt-4 text-gray-300">
              We believe in sustainability. The Nova is constructed from 75%
              recycled materials, making it a choice you can feel good about.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

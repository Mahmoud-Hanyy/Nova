import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import { Model } from "./Model";
import BottomImage from "../assets/bottom.jpg";
import DarkImage from "../assets/dark.jpg";
import LightImage from "../assets/light.jpg";
import SideImage from "../assets/side.jpg";
import React, { Suspense, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const images = [LightImage, BottomImage, DarkImage];

  return (
    <>
      <section className="h-screen flex flex-col md:flex-row items-center justify-center pt-16 overflow-hidden">
        <div
          className="w-full md:w-1/2 text-center md:text-left p-8"
          data-aos="fade-right"
        >
          <h1
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
            style={{ fontFamily: "Roboto", fontWeight: "bold" }}
          >
            Project: Nova
            <br />
            <span className="text-indigo-400">Future of Footwear</span>
          </h1>
          <p
            className="mt-4 text-lg text-gray-300 max-w-lg mx-auto md:mx-0"
            style={{ fontFamily: "Roboto" }}
          >
            Introducing Nova by New Balance – a revolutionary sport shoe crafted
            for peak performance and everyday style. Built with innovation,
            powered by design.
          </p>
          <a
            href="https://www.newbalance.com/men/shoes/running/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Explore Now <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full" data-aos="fade-left">
          <Canvas shadows camera={{ position: [0, 0.5, 4], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.5}
                castShadow
              />
              <Model scale={0.007} position={[0, -0.15, 0]} />
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl font-extrabold text-white text-center"
          style={{ fontWeight: "bold" }}
        >
          Every Angle, Every Detail
        </h2>
        <p className="mt-4 text-gray-300 text-center max-w-2xl mx-auto">
          From sleek contours to bold textures, Nova isn't just built for
          motion – it's made to be seen.
        </p>
        <div className="mt-12 flex justify-center">
          <div className="inline-grid gap-8 grid-cols-3 sm:grid-cols-3 lg:grid-cols-3">
            {images.map((src, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Sneaker view ${index + 1}`}
                  className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  </div>
                </div>
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-indigo-400/50 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="about" className="py-20">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12"
        data-aos="fade-up"
      >
        {/* Enhanced Image Container */}
        <div className="md:w-1/2">
          <div className="group relative overflow-hidden rounded-lg shadow-2xl transition-all duration-500 hover:shadow-indigo-500/25 hover:shadow-3xl">
            <img
              src={SideImage || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop"}
              alt="Lifestyle"
              className="rounded-lg w-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
              data-aos="zoom-in"
              data-aos-delay="500"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
            
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-indigo-400/40 transition-all duration-500"></div>
            
            {/* Shine Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-lg"></div>
            
            {/* Corner Accent */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-extrabold text-white">Why Nova?</h2>
          <p className="mt-4 text-gray-300">
            Nova blends cutting-edge design with advanced performance tech to
            deliver unmatched comfort, breathability, and support. Whether
            you're training hard or heading out, Nova adapts to your stride,
            enhances your movement, and elevates your look.
          </p>
          
          {/* Enhanced Feature List */}
          <ul className="mt-6 space-y-3">
            <li className="text-gray-300 flex items-center group">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:bg-indigo-400 transition-colors duration-300"></span>
              <span className="group-hover:text-white transition-colors duration-300">
                Engineered mesh for maximum airflow
              </span>
            </li>
            <li className="text-gray-300 flex items-center group">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:bg-indigo-400 transition-colors duration-300"></span>
              <span className="group-hover:text-white transition-colors duration-300">
                Responsive midsole cushioning for all-day comfort
              </span>
            </li>
            <li className="text-gray-300 flex items-center group">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:bg-indigo-400 transition-colors duration-300"></span>
              <span className="group-hover:text-white transition-colors duration-300">
                Lightweight design for effortless movement
              </span>
            </li>
            <li className="text-gray-300 flex items-center group">
              <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:bg-indigo-400 transition-colors duration-300"></span>
              <span className="group-hover:text-white transition-colors duration-300">
                Inspired by athletes, designed for everyone
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
};

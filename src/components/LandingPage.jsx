import { HeroStory } from "../experience/HeroStory";
import { Shop } from "./Shop";
import BottomImage from "../assets/bottom.jpg";
import DarkImage from "../assets/dark.jpg";
import LightImage from "../assets/light.jpg";
import SideImage from "../assets/side.jpg";
import React, { useEffect } from "react";
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
      <HeroStory />

      <section id="gallery" className="py-20 sm:py-28 bg-charcoal-soft border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-display block text-center text-clay text-sm font-semibold tracking-[0.25em] uppercase">
            Detail Study
          </span>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-cream text-center tracking-tight">
            Engineered From Every Angle
          </h2>
          <p className="font-body mt-4 text-cream/75 text-center max-w-2xl mx-auto">
            Nova wasn't sketched — it was engineered, tested, and refined the
            way a spacecraft is: every panel earning its place.
          </p>
          <div className="mt-12 flex justify-center">
            <div className="inline-grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {images.map((src, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 120}
                  className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:shadow-clay/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`Nova detail view ${index + 1}`}
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-clay/60 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Shop />

      <section id="about" className="py-20 sm:py-28 bg-charcoal border-t border-cream/10">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12"
          data-aos="fade-up"
        >
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:shadow-clay/20">
              <img
                src={SideImage}
                alt="Nova lifestyle"
                className="rounded-lg w-full transition-all duration-700 group-hover:scale-110 group-hover:brightness-105 group-hover:contrast-105"
                data-aos="zoom-in"
                data-aos-delay="300"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-clay/15 via-transparent to-bronze/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-clay/40 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out rounded-lg"></div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <span className="font-display block text-clay text-sm font-semibold tracking-[0.25em] uppercase">
              The Origin
            </span>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-cream tracking-tight">
              A Shoe Built Like a Spacecraft
            </h2>
            <p className="font-body mt-4 text-cream/75">
              Nova began as a question: what would New Balance build if the
              brief came from an aerospace lab instead of a running trial?
              The answer borrows straight from orbit — thermal-shield mesh,
              impact-tuned cushioning, and a form language stripped down to
              only what performance demands.
            </p>
            <p className="font-body mt-4 text-cream/75">
              This is a concept project — a design exercise imagining Nova as
              part of the New Balance lineup, built to explore what a
              product-launch website for a serious performance shoe could
              look and feel like.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                'Aerospace-grade knitted mesh upper',
                'Responsive, energy-return midsole',
                'Lightweight chassis for effortless movement',
                'Designed for athletes who go the distance',
              ].map((item) => (
                <li key={item} className="font-body text-cream/75 flex items-center group">
                  <span className="w-2 h-2 bg-clay rounded-full mr-3 shrink-0 group-hover:bg-bronze transition-colors duration-300"></span>
                  <span className="group-hover:text-cream transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

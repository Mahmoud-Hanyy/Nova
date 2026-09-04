import React from 'react';
import LightImage from '../assets/light.jpg';
import DarkImage from '../assets/dark.jpg';
import SideImage from '../assets/side.jpg';

const colorways = [
  {
    name: 'Nova Orbit',
    tagline: 'Lunar white with warm clay accents',
    image: LightImage,
    price: '$180',
    badge: null,
  },
  {
    name: 'Nova Eclipse',
    tagline: 'Deep charcoal, built for low-light miles',
    image: DarkImage,
    price: '$180',
    badge: null,
  },
  {
    name: 'Nova Solar',
    tagline: 'Limited re-entry colorway',
    image: SideImage,
    price: '$195',
    badge: 'Limited',
  },
];

export const Shop = () => (
  <section id="shop" className="py-20 sm:py-28 bg-cream-soft border-t border-clay/25">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <span className="font-display block text-center text-cream text-sm font-semibold tracking-[0.25em] uppercase">
        The Collection
      </span>
      <h2 className="font-display mt-3 text-3xl sm:text-4xl font-bold text-cream text-center tracking-tight">
        Choose Your Nova
      </h2>
      <p className="font-body mt-4 text-cream/75 text-center max-w-2xl mx-auto">
        Three colorways, one mission. Every pair ships with the same
        aerospace-grade mesh and zero-gravity cushioning.
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {colorways.map((c, index) => (
          <div
            key={c.name}
            data-aos="fade-up"
            data-aos-delay={index * 120}
            className="group flex flex-col bg-charcoal rounded-xl overflow-hidden border border-cream/10 hover:border-clay/50 shadow-sm hover:shadow-lg hover:shadow-clay/10 transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {c.badge && (
                  <span className="font-display absolute top-4 left-4 bg-clay text-cream text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
                  {c.badge}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-1 p-6">
              <h3 className="font-display text-xl font-semibold text-cream tracking-tight">{c.name}</h3>
              <p className="font-body mt-1 text-sm text-cream/75 flex-1">{c.tagline}</p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-cream">{c.price}</span>
                <a
                  href={`mailto:hello@nova-concept.dev?subject=Notify me about ${encodeURIComponent(c.name)}`}
                  className="font-display text-sm font-semibold text-clay hover:text-clay-dark tracking-tight transition-colors"
                >
                  Notify Me →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

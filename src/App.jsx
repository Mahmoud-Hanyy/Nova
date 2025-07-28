import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { About } from './components/About';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <About />
      </main>
      <Footer />
    </div>
  );
}
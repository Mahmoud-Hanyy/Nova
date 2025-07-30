import React from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';
import 'aos/dist/aos.css'

export default function App() {
  return (
    <div className="bg-gray-900">
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
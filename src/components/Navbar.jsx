import React from 'react';
import { ShoppingBag } from 'lucide-react';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-50 backdrop-blur-md z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <a href='./Hero.jsx'><span className="font-bold text-2xl text-white">NOVA</span></a>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#gallery" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Gallery</a>
            <a href="#about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
            <a href="#contact" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
          </div>
        </div>
        <div className="flex items-center">
          <button className="bg-indigo-600 text-white hover:bg-indigo-500 p-2 rounded-full">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </div>
  </nav>
);
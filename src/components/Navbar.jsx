import React from 'react';

export const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-50 backdrop-blur-md z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <a href='/'><span className="font-bold text-2xl text-white" style={{fontFamily:'Work Sans'}}>NOVA</span></a>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="#gallery" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"style={{fontFamily:'Work Sans'}}>Gallery</a>
            <a href="#about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"style={{fontFamily:'Work Sans'}}>About</a>
          </div>
        </div>  
      </div>
    </div>
  </nav>
);
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#shop', label: 'Shop' },
  { href: '#about', label: 'About' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Close the mobile menu on resize back to desktop, so it can't get stuck open
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-charcoal/70 backdrop-blur-md z-50 border-b border-cream/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home">
            <span className="font-display font-extrabold text-2xl text-cream tracking-tighter">NOVA</span>
          </a>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-2">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-stone hover:text-cream px-3 py-2 rounded-md text-sm font-medium tracking-tight transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-cream p-2 -mr-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 flex flex-col space-y-1 bg-charcoal/95 border-t border-cream/5">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-display text-stone hover:text-cream px-3 py-3 rounded-md text-base font-medium tracking-tight transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

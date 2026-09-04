import React from 'react';
import { Twitter, Instagram, Github } from 'lucide-react';

export const Footer = () => (
    <footer id="contact" className="bg-charcoal-deep border-t border-clay/25">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
                <a href="#" className="text-cream/65 hover:text-clay transition-colors" aria-label="Twitter"><Twitter /></a>
                <a href="#" className="text-cream/65 hover:text-clay transition-colors" aria-label="Instagram"><Instagram /></a>
                <a href="https://github.com/Mahmoud-Hanyy/Nova" target="_blank" rel="noopener noreferrer" className="text-cream/65 hover:text-clay transition-colors" aria-label="GitHub"><Github /></a>
            </div>
            <p className="font-body mt-8 text-center text-sm text-cream/65 max-w-lg mx-auto">
                Nova is an independent design concept and is not affiliated with
                or endorsed by New Balance Athletics, Inc.
            </p>
            <p className="font-body mt-3 text-center text-base text-cream/80">
                &copy; 2026 Project: <span className="font-display font-semibold text-cream">Mahmoud Hany</span>. All rights reserved.
            </p>
        </div>
    </footer>
);

import React from 'react';
import { Twitter, Instagram, Github } from 'lucide-react';

export const Footer = () => (
    <footer id="contact" className="bg-cream-soft border-t border-charcoal/10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
                <a href="#" className="text-charcoal/60 hover:text-clay transition-colors" aria-label="Twitter"><Twitter /></a>
                <a href="#" className="text-charcoal/60 hover:text-clay transition-colors" aria-label="Instagram"><Instagram /></a>
                <a href="https://github.com/Mahmoud-Hanyy/Nova" target="_blank" rel="noopener noreferrer" className="text-charcoal/60 hover:text-clay transition-colors" aria-label="GitHub"><Github /></a>
            </div>
            <p className="font-body mt-8 text-center text-sm text-charcoal/60 max-w-lg mx-auto">
                Nova is an independent design concept and is not affiliated with
                or endorsed by New Balance Athletics, Inc.
            </p>
            <p className="font-body mt-3 text-center text-base text-charcoal/80">
                &copy; 2026 Project: <span className="font-display font-semibold text-charcoal">Mahmoud Hany</span>. All rights reserved.
            </p>
        </div>
    </footer>
);

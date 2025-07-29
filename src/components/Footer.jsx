import React from 'react';
import { Twitter, Instagram, Facebook } from 'lucide-react';

export const Footer = () => (
    <footer id="contact" className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
                <a href="https://twitter.com/newbalance" className="text-gray-400 hover:text-white" target='_blank'><Twitter /></a>
                <a href="https://www.instagram.com/newbalance/" className="text-gray-400 hover:text-white" target='_blank'><Instagram /></a>
                <a href="https://www.facebook.com/Newbalance/" className="text-gray-400 hover:text-white" target='_blank'><Facebook /></a>
            </div>
            <p className="mt-8 text-center text-base text-gray-400">
                &copy; 2025 Project: Mahmoud Hany. All rights reserved.
            </p>
        </div>
    </footer>
);
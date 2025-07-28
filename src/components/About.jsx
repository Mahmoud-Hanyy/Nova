import React from 'react';

export const About = () => (
    <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <img src="https://placehold.co/600x400/1e293b/ffffff?text=Lifestyle" alt="Lifestyle" className="rounded-lg shadow-2xl w-full"/>
            </div>
            <div className="md:w-1/2">
                <h2 className="text-3xl font-extrabold text-white">Engineered for Excellence</h2>
                <p className="mt-4 text-gray-300">
                    The Project: Nova sneaker is the culmination of years of research in material science and ergonomic design. 
                    Our proprietary 'Aether-foam' sole provides responsive cushioning that adapts to your every step, while the breathable 'Exo-weave' upper ensures your feet stay cool and comfortable, no matter the intensity.
                </p>
                <p className="mt-4 text-gray-300">
                    We believe in sustainability. The Nova is constructed from 75% recycled materials, making it a choice you can feel good about.
                </p>
            </div>
        </div>
    </section>
);
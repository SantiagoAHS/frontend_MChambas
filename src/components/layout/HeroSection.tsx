import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-r from-red-500 to-orange-600 text-white">
      <h1 className="text-5xl font-bold mb-6">
        Bienvenido a Nuestra Plataforma
      </h1>
      <p className="text-xl max-w-2xl mb-8">
        Aquí puedes encontrar las mejores soluciones para tus necesidades. 
        Explora y descubre todo lo que tenemos preparado para ti.
      </p>
      <button className="bg-white text-orange-600 font-semibold px-8 py-3 rounded shadow hover:bg-gray-100 transition">
        Comenzar Ahora
      </button>
    </section>
  );
};

export default HeroSection;

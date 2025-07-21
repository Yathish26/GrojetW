import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
      {/* Header with Logo and Navigation */}
      <Header />

      {/* Main Content Section */}
      <main className="flex flex-col md:flex-row items-center justify-center flex-grow w-full max-w-6xl px-4">
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-xl animate-fade-in-down">
            Fresh Groceries to <br className="hidden sm:block" /> your Door, <span className="text-yellow-400">Grojet It!</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md animate-fade-in-up">
            Experience the taste of Mangalore with our carefully curated local items and homemade essentials delivered right to your doorstep. Grojet is the perfect blend of local love and convenience.
          </p>
          {/* Pre-register buttons */}
          <div className="flex space-x-4 animate-bounce-once">
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img
                src="preapple.svg"
                alt="Pre-register on Apple Store"
                className="w-32 h-auto"
              />
            </a>
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
              <img
                src="pregplay.png"
                alt="Pre-register on Google Play"
                className="w-32 h-auto"
              />
            </a>
          </div>


        </div>

        {/* Image of driver with groceries */}
        <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto md:w-1/2 flex justify-center items-center">
          <img
            src="https://media-public.canva.com/-WRIo/MAFmO--WRIo/1/s.png"
            draggable="false"
            alt="Groceries in a phone"
            className="w-65 max-md:w-40 h-auto rounded-3xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out"
            style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}
          />
          <img draggable="false" className="absolute top-0 right-0 w-30 max-sm:w-20 rotate-20 h-auto transform animate-pulse-slow" src="https://media-public.canva.com/JTF0c/MAGYaYJTF0c/1/tl.png" alt="Coming Soon" />
        </div>
      </main>

      {/* Simple Footer */}
      <Footer />

    </div>
  );
}

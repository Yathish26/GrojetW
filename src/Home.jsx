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
                        Experience the freshest produce and daily essentials delivered right to your doorstep. Convenience redefined.
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

                {/* Image of phone with groceries */}
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto md:w-1/2 flex justify-center items-center">
                    <img
                        src="bag.png"
                        alt="Groceries in a phone"
                        className="w-full h-auto rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out"
                    />
                    {/* Coming Soon Badge */}
                    <img
                        src="csoon.png"
                        alt="Coming Soon"
                        className="absolute bottom-4 right-4 w-h-40 h-40 transform rotate-45 animate-pulse-slow"
                    />
                </div>
            </main>

            {/* Simple Footer */}
           <Footer />

            {/* Tailwind CSS Custom Animations (add these to your main CSS file or a style block if not using a build process) */}
            <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-once {
          0%, 100% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(-10px);
          }
          40% {
            transform: translateY(0);
          }
          60% {
            transform: translateY(-5px);
          }
          80% {
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1) rotate(6deg);
          }
          50% {
            transform: scale(1.05) rotate(6deg);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards 0.3s; /* Delayed */
        }
        .animate-bounce-once {
          animation: bounce-once 1.5s ease-in-out forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
}

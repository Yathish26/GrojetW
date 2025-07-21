import React from "react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


export default function Error404() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
            <Header />
            <main className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl px-4">
                <div className="flex flex-col items-center text-center w-full">
                    <h1 className="text-8xl font-bold text-white mb-4 drop-shadow-xl animate-fade-in-down">404</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-2 animate-fade-in-up">Oops! Page Not Found</h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md animate-fade-in-up">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link
                        to="/"
                        className="px-8 py-3 bg-white text-green-700 rounded-full font-bold shadow-md transition-colors duration-200 hover:bg-green-50 hover:text-green-800 animate-bounce-once"
                    >
                        Go Home
                    </Link>
                </div>
                <div className="relative w-full max-w-xs mx-auto flex justify-center items-center mt-8">
                    <img
                        src="bag.png"
                        alt="Grojet Bag"
                        className="w-full h-auto rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 ease-in-out"
                    />
                    <img
                        src="csoon.png"
                        alt="Coming Soon"
                        className="absolute bottom-4 right-4 w-20 h-20 transform rotate-45 animate-pulse-slow"
                    />
                </div>
            </main>
            <Footer />
            <style>{`
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
          animation: fade-in-up 1s ease-out forwards 0.3s;
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
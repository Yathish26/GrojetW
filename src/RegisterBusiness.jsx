import React, { useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function RegisterBusiness() {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
            {/* Header (consistent with Home and Terms pages) */}
            <Header />

            {/* Main Content - Business Registration Form */}
            <main className="w-full max-w-2xl bg-green-800 bg-opacity-70 rounded-xl shadow-lg p-6 md:p-10 mb-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Register Your Business with Grojet</h1>
                <p className="text-center text-gray-200 mb-8">
                    Partner with us to reach more customers and grow your grocery business! Fill out the form below to get started.
                </p>

                <form className="space-y-6">
                    <div>
                        <label htmlFor="businessName" className="block text-gray-200 text-lg font-medium mb-2">Business Name</label>
                        <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="e.g., Fresh Harvest Mart"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="contactPerson" className="block text-gray-200 text-lg font-medium mb-2">Contact Person</label>
                        <input
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-200 text-lg font-medium mb-2">Business Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="business@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-gray-200 text-lg font-medium mb-2">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="+1234567890"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="businessType" className="block text-gray-200 text-lg font-medium mb-2">Type of Business</label>
                        <select
                            id="businessType"
                            name="businessType"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        >
                            <option value="">Select a type</option>
                            <option value="supermarket">Supermarket</option>
                            <option value="local_store">Local Grocery Store</option>
                            <option value="organic_farm">Organic Farm/Producer</option>
                            <option value="specialty_store">Specialty Food Store</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-gray-200 text-lg font-medium mb-2">Business Address</label>
                        <textarea
                            id="address"
                            name="address"
                            rows="3"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Street, City, State, Zip Code"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-gray-200 text-lg font-medium mb-2">Additional Message (Optional)</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Tell us more about your business..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-xl text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        Submit Registration
                    </button>
                </form>
            </main>

            <Footer />
        </div>
    );
}
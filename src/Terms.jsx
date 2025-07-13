import React, { use, useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function TermsAndConditions() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
            {/* Header (similar to Home page for consistency) */}
            <Header />

            {/* Main Content - Terms and Conditions */}
            <main className="w-full max-w-4xl bg-green-800 bg-opacity-70 rounded-xl shadow-lg p-6 md:p-10 mb-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Terms and Conditions</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">1. Acceptance of Terms</h2>
                    <p className="text-gray-200 leading-relaxed">
                        By accessing and using the Grojet website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">2. Service Description</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Grojet provides an online platform for ordering groceries from various vendors for delivery to your specified location. We act as an intermediary and are not responsible for the quality or freshness of products supplied by third-party vendors.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">3. User Accounts</h2>
                    <p className="text-gray-200 leading-relaxed">
                        To use certain features of the service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">4. Ordering and Payments</h2>
                    <p className="text-gray-200 leading-relaxed">
                        All orders placed through Grojet are subject to availability and confirmation by the respective vendor. Prices are as listed on the website and are subject to change. Payment must be made through the methods specified on the platform.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">5. Delivery</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Delivery times are estimates and may vary based on various factors. Grojet will make reasonable efforts to ensure timely delivery, but we are not liable for delays beyond our control.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">6. Cancellations and Refunds</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Cancellation policies vary by vendor and will be clearly stated at the time of order. Refunds, if applicable, will be processed according to our refund policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">7. Privacy Policy</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Your use of Grojet is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">8. Intellectual Property</h2>
                    <p className="text-gray-200 leading-relaxed">
                        All content on the Grojet website, including text, graphics, logos, and software, is the property of Grojet or its licensors and is protected by intellectual property laws.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">9. Limitation of Liability</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Grojet will not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">10. Governing Law</h2>
                    <p className="text-gray-200 leading-relaxed">
                        These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Country/State].
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">11. Changes to Terms</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Grojet reserves the right to modify these Terms and Conditions at any time. Your continued use of the service after any such changes constitutes your acceptance of the new terms.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}

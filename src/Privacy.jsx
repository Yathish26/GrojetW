import React, { useEffect } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
            <Header />

            <main className="w-full max-w-4xl bg-green-800 bg-opacity-70 rounded-xl shadow-lg p-6 md:p-10 mb-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Privacy Policy</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">1. Introduction</h2>
                    <p className="text-gray-200 leading-relaxed">
                        At Grojet, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">2. Information We Collect</h2>
                    <p className="text-gray-200 leading-relaxed">
                        We collect information you provide directly to us, such as name, contact info, address, and payment details. We also collect usage data like browser type, device, and IP address to improve our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">3. How We Use Your Information</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Your data helps us to fulfill orders, personalize your experience, process payments, communicate with you, and enhance our platform’s performance and security.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">4. Sharing Your Data</h2>
                    <p className="text-gray-200 leading-relaxed">
                        We do not sell your personal information. We may share it with trusted vendors or service providers for order processing, delivery, or analytics, always under strict confidentiality agreements.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">5. Cookies and Tracking</h2>
                    <p className="text-gray-200 leading-relaxed">
                        We use cookies to enhance your browsing experience and gather analytics. You can control cookie settings via your browser.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">6. Data Security</h2>
                    <p className="text-gray-200 leading-relaxed">
                        We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, disclosure, or misuse.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">7. Your Rights</h2>
                    <p className="text-gray-200 leading-relaxed">
                        You have the right to access, correct, or delete your data. You may also opt out of marketing communications at any time.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">8. Children’s Privacy</h2>
                    <p className="text-gray-200 leading-relaxed">
                        Our services are not intended for individuals under the age of 13. We do not knowingly collect data from children without parental consent.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">9. Changes to this Policy</h2>
                    <p className="text-gray-200 leading-relaxed">
                        We may update this Privacy Policy from time to time. The latest version will be posted on this page, with the effective date noted.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-yellow-300 mb-3">10. Contact Us</h2>
                    <p className="text-gray-200 leading-relaxed">
                        If you have questions about this policy or how we handle your data, please contact our support team at support@grojetdelivery.com.
                    </p>
                </section>
            </main>

            <Footer />
        </div>
    );
}

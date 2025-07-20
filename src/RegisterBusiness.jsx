import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle } from 'lucide-react';

export default function RegisterBusiness() {
    const [showForm, setShowForm] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToForm = () => {
        setShowForm(true);
        setTimeout(() => {
            const formElement = document.getElementById('registration-form');
            if (formElement) {
                formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!businessName || !contactPerson || !email || !phone || !businessType || !address) {
            toast.error('Please fill in all required fields.', {
                duration: 5000,
                icon: <XCircle size={24} className="text-red-500" />,
                style: {
                    background: '#fef2f2',
                    color: '#b91c1c',
                    border: '1px solid #fecaca',
                    padding: '16px',
                }
            });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/merchants', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessName,
                    contactPerson,
                    email,
                    phone,
                    businessType,
                    address,
                    message,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.dupMerchant) {
                    throw new Error("You've already registered with this email. We'll contact you soon!");
                }
                throw new Error(errorData.message || 'Failed to register business.');
            }

            const data = await response.json();
            
            toast.success(data.message || 'Registration successful! We will contact you shortly.', {
                duration: 3000,
                style: {
                    background: '#ecfdf5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                    padding: '16px',
                }
            });

            // Reset form
            setBusinessName('');
            setContactPerson('');
            setEmail('');
            setPhone('');
            setBusinessType('');
            setAddress('');
            setMessage('');
            setShowForm(false);
            window.scrollTo(0, 0);
        }
        catch (error) {
            toast.error(error.message || 'An error occurred. Please try again.', {
                duration: 3000,
                style: {
                    background: '#fef2f2',
                    color: '#b91c1c',
                    border: '1px solid #fecaca',
                    padding: '16px',
                }
            });
        } finally {
            setLoading(false);
        }
    };

    const businessTypes = [
        "Super Market",
        "Grocery Store",
        "Fruits & Vegetables",
        "Bakery",
        "Dairy & Eggs",
        "Meat & Seafood",
        "Beverages",
        "Snacks & Sweets",
        "Other"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
            <Header />
            
            <Toaster 
                position="top-center"
                toastOptions={{
                    className: '',
                    success: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            <main className="w-full max-w-2xl bg-green-800 bg-opacity-70 rounded-xl shadow-lg p-6 md:p-10 mb-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Register Your Business</h1>
                <p className="text-center text-gray-200 mb-8">
                    Partner with us to reach more customers and grow your business!
                </p>

                {!showForm && (
                    <div className="bg-green-700 bg-opacity-80 rounded-lg p-6 mb-10 shadow-inner border border-green-600">
                        <h2 className="text-2xl font-semibold text-yellow-300 mb-4 text-center">Who Can Register?</h2>
                        <p className="text-gray-100 text-lg leading-relaxed text-center">
                            We welcome businesses that sell:
                        </p>
                        <ul className="list-disc list-inside text-gray-200 text-lg mt-4 space-y-2 px-4">
                            <li>Fresh groceries and produce</li>
                            <li>Essential home products</li>
                            <li>Daily household items</li>
                            <li>Wholesale products</li>
                        </ul>
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={scrollToForm}
                                className="bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-xl text-lg shadow-xl hover:bg-yellow-300 transition-all duration-300"
                            >
                                Register Now
                            </button>
                        </div>
                    </div>
                )}

                {showForm && (
                    <form id="registration-form" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="businessName" className="block text-gray-200 text-lg font-medium mb-2">
                                Business Name*
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Your business name"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="contactPerson" className="block text-gray-200 text-lg font-medium mb-2">
                                Contact Person*
                            </label>
                            <input
                                type="text"
                                id="contactPerson"
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Your name"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-200 text-lg font-medium mb-2">
                                Business Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="contact@yourbusiness.com"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-gray-200 text-lg font-medium mb-2">
                                Phone Number*
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="+1 (___) ___-____"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="businessType" className="block text-gray-200 text-lg font-medium mb-2">
                                Business Type*
                            </label>
                            <select
                                id="businessType"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                                disabled={loading}
                            >
                                <option value="">Select your business type</option>
                                {businessTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-gray-200 text-lg font-medium mb-2">
                                Business Address*
                            </label>
                            <textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="3"
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Street, City, State, ZIP Code"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-gray-200 text-lg font-medium mb-2">
                                Additional Information
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Tell us more about your business..."
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-xl text-lg shadow-xl hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                'Submit Registration'
                            )}
                        </button>
                    </form>
                )}
            </main>

            <Footer />
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { CheckCircle, XCircle } from 'lucide-react'; // Import Lucide icons

// Custom Alert component
const CustomAlert = ({ visible, message, type, onClose }) => {
    if (!visible) return null;

    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-100' : 'bg-red-100';
    const textColor = isSuccess ? 'text-green-800' : 'text-red-800';
    const iconColor = isSuccess ? 'text-green-500' : 'text-red-500';
    const borderColor = isSuccess ? 'border-green-200' : 'border-red-200';

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 p-4 pointer-events-none">
            <div className={`w-full max-w-sm rounded-xl p-5 bg-white border ${borderColor} shadow-lg flex items-center space-x-3`}>
                {isSuccess ? (
                    <CheckCircle size={28} className={`${iconColor}`} />
                ) : (
                    <XCircle size={28} className={`${iconColor}`} />
                )}
                <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                        {isSuccess ? 'Success' : 'Error'}
                    </h3>
                    <p className="text-gray-700 mt-1 text-sm">{message}</p>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 pointer-events-auto">
                    <XCircle size={20} className="text-gray-500" />
                </button>
            </div>
        </div>
    );
};

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
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('error');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const showAlert = (msg, type) => {
        setAlertMessage(msg);
        setAlertType(type);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false); // Auto-hide alert after 5 seconds
        }, 5000);
    };

    const hideAlert = () => {
        setAlertVisible(false);
    };

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
            showAlert('Please fill in all required fields.', 'error');
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
                // Check for specific email error
                if (errorData.error === "A merchant with this email already exists.") {
                    throw new Error("Uh oh! Looks like you've already registered with us. We'll contact you soon, or please try a different email!");
                }
                throw new Error(errorData.message || 'Failed to register business.');
            }

            const data = await response.json();
            showAlert(data.message || 'Business registered successfully!', 'success');

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
            showAlert(error.message || 'An error occurred during registration. Please try again.', 'error');
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
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 flex flex-col items-center p-4 font-sans text-gray-100">
            <Header />
            <CustomAlert visible={alertVisible} message={alertMessage} type={alertType} onClose={hideAlert} />

            <main className="w-full max-w-2xl bg-green-800 bg-opacity-70 rounded-xl shadow-lg p-6 md:p-10 mb-8 flex-grow">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Register Your Business with Grojet</h1>
                <p className="text-center text-gray-200 mb-8">
                    Partner with us to reach more customers and grow your grocery business! Fill out the form below to get started.
                </p>

                {!showForm && (
                    <div className="bg-green-700 bg-opacity-80 rounded-lg p-6 mb-10 shadow-inner border border-green-600">
                        <h2 className="text-2xl font-semibold text-yellow-300 mb-4 text-center">Who Can Register?</h2>
                        <p className="text-gray-100 text-lg leading-relaxed text-center">
                            Grojet welcomes Merchants who are eager to sell a wide range of products including:
                        </p>
                        <ul className="list-disc list-inside text-gray-200 text-lg mt-4 space-y-2 px-4">
                            <li>Fresh Groceries (fruits, vegetables, dairy, pantry staples)</li>
                            <li>Essential Home Products (cleaning supplies, personal care)</li>
                            <li>All Daily Needed and Used items</li>
                            <li>Wholesalers looking to expand their reach and supply bulk products</li>
                        </ul>
                        <p className="text-gray-100 text-lg leading-relaxed text-center mt-6">
                            If you fit this description, we'd love to collaborate!
                        </p>
                        <div className="flex justify-center mt-8">
                            <button
                                type="button"
                                onClick={scrollToForm}
                                className="bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-xl text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                Proceed to Registration Form
                            </button>
                        </div>
                    </div>
                )}

                {showForm && (
                    <form id="registration-form" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="businessName" className="block text-gray-200 text-lg font-medium mb-2">Business Name</label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="e.g., Fresh Harvest Mart"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                                disabled={loading}
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
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-gray-200 text-lg font-medium mb-2">Business Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-gray-200 text-lg font-medium mb-2">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Contact"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="businessType" className="block text-gray-200 text-lg font-medium mb-2">Type of Business</label>
                            <select
                                id="businessType"
                                name="businessType"
                                className="w-full p-3 rounded-lg bg-green-700 border border-green-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                required
                                disabled={loading}
                            >
                                <option value="">Select a type</option>
                                {businessTypes.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
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
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                disabled={loading}
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
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={loading}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-green-900 font-bold py-3 px-8 rounded-xl text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-green-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
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

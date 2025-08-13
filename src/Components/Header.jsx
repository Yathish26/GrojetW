import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center py-4 px-6 mb-8">
            {/* Logo */}
            <div onClick={() => navigate('/')} className="flex cursor-pointer items-center mb-4 sm:mb-0">
                <img
                    src="/grojet.png"
                    alt="Grojet Logo"
                    draggable="false"
                    className="h-16 md:h-17 mr-3 rounded-lg"
                    style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
                />
            </div>

            {/* Navigation */}
            <nav className='hidden sm:block'>
                <ul className="flex flex-wrap
                   justify-center gap-x-6 gap-y-2
                    text-white
                   ">
                    <li>
                        <Link to="https://merchant.razorpay.com/policy/R4RKNNMqxrihu0/terms" className="hover:text-yellow-300 transition-colors duration-200">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to="/privacy-policy" className="hover:text-yellow-300 transition-colors duration-200">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="https://merchant.razorpay.com/policy/R4RKNNMqxrihu0/shipping" className="hover:text-yellow-300 transition-colors duration-200">Shipping</Link>
                    </li>
                    <li>
                        <Link to="https://merchant.razorpay.com/policy/R4RKNNMqxrihu0/refund" className="hover:text-yellow-300 transition-colors duration-200">Cancellation & Refunds</Link>
                    </li>
                    <li>
                        <Link to="/register-business" className="hover:text-yellow-300 transition-colors duration-200">Register as Business</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}


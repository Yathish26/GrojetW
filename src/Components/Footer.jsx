import React from 'react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import { SiMaildotru } from 'react-icons/si'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="w-full max-w-6xl text-center py-4 mt-8 text-gray-300 text-sm">
            {/* Navigation */}
            <nav className='sm:hidden block mb-4'>
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white">
                    <li>
                        <Link to="/terms" className="hover:text-yellow-300 transition-colors duration-200">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to="/privacy-policy" className="hover:text-yellow-300 transition-colors duration-200">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link to="/register-business" className="hover:text-yellow-300 transition-colors duration-200">Register as Business</Link>
                    </li>
                </ul>
            </nav>
            {/* Socials */}
            <div className="flex justify-center items-center gap-6 mb-4">
                <a href="https://www.instagram.com/grojet_delivery/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-300 transition-colors duration-200">
                    {/* Instagram SVG */}
                    <FaInstagram className="inline-block align-middle mr-1" size={24} />
                </a>
                <a href="https://www.facebook.com/people/Grojet-Delivery/61578161875248/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-300 transition-colors duration-200">
                    {/* Facebook SVG */}
                    <FaFacebook className="inline-block align-middle mr-1" size={24} />
                </a>
                <a href="mailto:info@grojetdelivery.com" className="hover:text-yellow-300 transition-colors duration-200" aria-label="Email">
                    {/* Email SVG */}
                    <SiMaildotru className="inline-block align-middle mr-1" size={24} />
                </a>
            </div>
            {/* Copyright */}
            <div>
                &copy; {new Date().getFullYear()} <a href="https://daffodilsgroup.in" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-200">Grojet by Daffodils Enterprises</a>. All rights reserved.
            </div>
        </footer>
    )
}
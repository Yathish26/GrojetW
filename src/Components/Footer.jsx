import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="w-full max-w-6xl text-center py-4 mt-8 text-gray-300 text-sm">
            {/* Navigation */}
            <nav className=' sm:hidden block mb-4'>
                <ul className="flex flex-wrap
                   justify-center gap-x-6 gap-y-2
                    text-white
                   ">
                    <li>
                        <Link to="/terms" className="hover:text-yellow-300 transition-colors duration-200">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to="/register-business" className="hover:text-yellow-300 transition-colors duration-200">Register as Business</Link>
                    </li>
                </ul>
            </nav>
            &copy; {new Date().getFullYear()} Grojet. All rights reserved.
        </footer>
    )
}

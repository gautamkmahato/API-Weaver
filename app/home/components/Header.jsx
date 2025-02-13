'use client'

import React, { useState } from "react";
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import logo from '../../../public/assets/logo-4-white.png';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav id="navbar" className="fixed w-full z-50 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Nav Items */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-xl font-bold">
                  <Image src={logo} alt="logo" width="120" height="120" />
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="#guides"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Documentation
                </Link>
                <Link
                  href="/playground"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Playground
                </Link>
                <Link
                  href="/pricing"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pricing
                </Link>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Support
                </Link>
                
                {/* User Button with vertical alignment */}
                <SignedIn>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <div className="flex items-center justify-center">
                    <UserButton className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" /> 
                  </div>
                </SignedIn>

                {/* SignIn Button for SignedOut */}
                <SignedOut>
                  <div className="inline-flex items-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-buttonBackground hover:bg-orange-700 transition-all">
                    <SignInButton />
                  </div>
                </SignedOut>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <button
                type="button"
                id="mobile-menu-button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

    </div>
  );
};

export default Header;

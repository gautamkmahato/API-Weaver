'use client'

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Support = () => {

  return (
    <section id="support" className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">Need Help?</h2>
          <p className="text-xl text-gray-400">We're here to support your development journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
          {/* Documentation */}
          <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Documentation</h3>
            <p className="text-gray-400 mb-4">Comprehensive guides and API references</p>
            <a href="#documentation" className="text-buttonBackground hover:text-orange-700 inline-flex items-center">
              Browse Docs
              <ChevronDown className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Community */}
          <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Community Forum</h3>
            <p className="text-gray-400 mb-4">Connect with other developers</p>
            <a href="#" className="text-buttonBackground hover:text-orange-700 inline-flex items-center">
              Join Discussion
              <ChevronDown className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Direct Support */}
          <div className="bg-neutral-800 rounded-xl p-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Direct Support</h3>
            <p className="text-gray-400 mb-4">Get help from our support team</p>
            <a href="#" className="text-buttonBackground hover:text-orange-700 inline-flex items-center">
              Contact Support
              <ChevronDown className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Support;

'use client'

import React, { forwardRef } from 'react';
import { ArrowRight, Code, Lock, Microscope, Server, GitBranch } from 'lucide-react';

const Features = forwardRef((props, ref) => {
    return (
        <section ref={ref} id="features" className="bg-neutral-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate__animated animate__fadeIn">
            <h2 className="text-4xl font-bold text-neutral-100 mb-4">Powerful Features for API Documentation</h2>
            <p className="text-xl text-neutral-300">Everything you need to explore, test, and understand APIs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-800 rounded-xl hover:shadow-lg transition-shadow animate__animated animate__fadeInUp">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Microscope className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-neutral-100 font-bold mb-2">Interactive API Console</h3>
                <p className="text-neutral-400">Test API endpoints directly from the documentation with our built-in console.</p>
            </div>

            <div className="p-6 bg-neutral-800 rounded-xl hover:shadow-lg transition-shadow animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl text-neutral-100 font-bold mb-2">Code Snippets</h3>
                <p className="text-neutral-400">Ready-to-use code examples in multiple programming languages.</p>
            </div>

            <div className="p-6 bg-neutral-800 rounded-xl hover:shadow-lg transition-shadow animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl text-neutral-100 font-bold mb-2">Authentication Support</h3>
                <p className="text-neutral-400">Secure API testing with multiple auth methods and token management.</p>
            </div>

            <div className="p-6 bg-neutral-800 rounded-xl hover:shadow-lg transition-shadow animate__animated animate__fadeInUp">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Microscope className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl text-neutral-100 font-bold mb-2">Request Builder</h3>
                <p className="text-neutral-400">Visual request builder for complex API calls and parameters.</p>
            </div>

            <div className="p-6 bg-neutral-800 rounded-xl hover:shadow-lg transition-shadow animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl text-neutral-100 font-bold mb-2">Error Handling</h3>
                <p className="text-neutral-400">Detailed error descriptions and troubleshooting guides.</p>
            </div>

            <div className="p-6 bg-neutral-800 rounded-xl hover:shadow-lg transition-shadow animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl text-neutral-100 font-bold mb-2">Version Control</h3>
                <p className="text-neutral-400">Track API changes and access documentation for different versions.</p>
            </div>
            </div>

            <div className="mt-16 text-center">
            <a href="/dashboard" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-buttonBackground hover:bg-orange-700 transition-all">
                Explore All Features
                <ArrowRight className="h-5 w-5 ml-2" />
            </a>
            </div>
        </div>
        </section>
    );
})

export default Features;

'use client'

import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const Pricing = () =>{

    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pt-32 pb-24 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-neutral-100 mb-4">Pricing</h2>
              <p className="text-xl text-neutral-400">Choose the plan that works for you.</p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Tier */}
              <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-sm hover:shadow-lg transition-shadow animate__animated animate__fadeInUp">
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                  <p className="text-neutral-400 mb-6">Perfect for getting started</p>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-white">$0</span>
                    <span className="text-neutral-400 ml-2">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>1,000 API calls/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>Basic documentation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>Community support</span>
                    </li>
                  </ul>
                  <button className="w-full bg-neutral-50 py-3 px-6 mt-9 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
    
              {/* Pro Tier */}
              <div className="bg-white border-2 border-buttonBackground rounded-2xl shadow-lg relative animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-buttonBackground text-neutral-50 px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">Pro</h3>
                  <p className="text-neutral-600 mb-6">For growing development teams</p>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-neutral-800">$49</span>
                    <span className="text-neutral-600 ml-2">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-neutral-600">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-blue-400 mr-2" />
                      50,000 API calls/month
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-blue-400 mr-2" />
                      Advanced documentation
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-blue-400 mr-2" />
                      Priority email support
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-blue-400 mr-2" />
                      API playground access
                    </li>
                  </ul>
                  <button className="w-full py-3 px-6 bg-buttonBackground text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>
    
              {/* Enterprise Tier */}
              <div className="bg-neutral-800 border border-neutral-700 rounded-2xl shadow-sm hover:shadow-lg transition-shadow animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                  <p className="text-neutral-400 mb-6">For large-scale applications</p>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-white">Custom</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>Unlimited API calls</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>Custom documentation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-300'>SLA guarantee</span>
                    </li>
                  </ul>
                  <button className="w-full bg-neutral-50 py-3 px-6 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
                  Contact Sales
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-28 pb-24">
                <h3 className="text-4xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {['How do I get started?', 'What authentication methods are supported?', 'Can I customize the documentation layout?'].map((question, index) => (
                    <div className="bg-neutral-800 rounded-lg" key={index}>
                        <button
                        className="w-full px-6 py-4 text-left focus:outline-none"
                        onClick={() => toggleFAQ(index)}
                        >
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">{question}</span>
                            <ChevronDown
                            className={`w-5 h-5 text-gray-400 transform ${openFAQ === index ? 'rotate-180' : ''}`}
                            />
                        </div>
                        </button>
                        {openFAQ === index && (
                        <div className="px-6 pb-4">
                            <p className="text-gray-400">
                            {index === 0 && 'Sign up for an account and follow our quick start guide to begin using the API documentation viewer.'}
                            {index === 1 && 'We support API keys, OAuth 2.0, and JWT authentication methods.'}
                            {index === 2 && 'Yes, Pro and Enterprise plans include customization options for documentation layout and branding.'}
                            </p>
                        </div>
                        )}
                    </div>
                    ))}
                </div>
            </div>
 
          </div>
        </section>
    );
}

export default Pricing;

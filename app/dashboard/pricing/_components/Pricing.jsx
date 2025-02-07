
import { Check } from 'lucide-react';

const Pricing = () =>{

    return (
        <section className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pt-12 pb-12 animate__animated animate__fadeIn">
              <h2 className="text-4xl font-bold text-neutral-800 mb-4">Pricing</h2>
              <p className="text-xl text-neutral-600">Choose the plan that works for you.</p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
              {/* Free Tier */}
              <div className="bg-white border border-neutral-300 rounded-2xl shadow-sm hover:shadow-lg transition-shadow animate__animated animate__fadeInUp">
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-black mb-2">Free</h3>
                  <p className="text-neutral-600 mb-6">Perfect for getting started</p>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-black">$0</span>
                    <span className="text-neutral-600 ml-2">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-600'>1,000 API calls/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-600'>Basic documentation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-600'>Community support</span>
                    </li>
                  </ul>
                  <button className="w-full bg-neutral-950 py-3 px-6 mt-9 border border-neutral-500 text-neutral-200 rounded-lg hover:bg-neutral-700 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
    
              {/* Pro Tier */}
              <div className="bg-neutral-900 border border-blue-500 rounded-2xl shadow-lg relative animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-neutral-50 px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-neutral-100 mb-2">Pro</h3>
                  <p className="text-neutral-300 mb-6">For growing development teams</p>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-neutral-100">$49</span>
                    <span className="text-neutral-300 ml-2">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8 text-neutral-300">
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
                  <button className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>
    
              {/* Enterprise Tier */}
              <div className="bg-white border border-neutral-300 rounded-2xl shadow-sm hover:shadow-lg transition-shadow animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-black mb-2">Enterprise</h3>
                  <p className="text-neutral-600 mb-6">For large-scale applications</p>
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-black">Custom</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-700'>Unlimited API calls</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-700'>Custom documentation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-700'>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span className='text-neutral-700'>SLA guarantee</span>
                    </li>
                  </ul>
                  <button className="w-full bg-neutral-950 py-3 px-6 border border-neutral-700 text-neutral-100 rounded-lg hover:bg-neutral-700 transition-colors">
                  Contact Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
}

export default Pricing;

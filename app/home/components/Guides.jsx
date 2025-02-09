import React from 'react';
import { CheckSquare, Lock, FileText } from 'lucide-react';

const Guides = () => {
  return (
    <section id="guides" className="bg-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">API Guides & Tutorials</h2>
          <p className="text-xl text-gray-400">Learn how to integrate and use our API effectively</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started Guide */}
          <div className="bg-neutral-800 rounded-lg overflow-hidden animate__animated animate__fadeInUp">
            <div className="p-6">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Getting Started</h3>
              <p className="text-gray-400 mb-4">Quick start guide to integrate our API into your application</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Authentication setup</li>
                <li>• Basic API calls</li>
                <li>• Response handling</li>
              </ul>
              <a href="#" className="inline-block mt-4 text-buttonBackground hover:text-orange-700">Read More →</a>
            </div>
          </div>

          {/* Authentication Guide */}
          <div className="bg-neutral-800 rounded-lg overflow-hidden animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="p-6">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Authentication</h3>
              <p className="text-gray-400 mb-4">Secure your API requests with proper authentication</p>
              <ul className="space-y-2 text-gray-400">
                <li>• API keys management</li>
                <li>• OAuth 2.0 flow</li>
                <li>• Token handling</li>
              </ul>
              <a href="#" className="inline-block mt-4 text-buttonBackground hover:text-orange-700">Read More →</a>
            </div>
          </div>

          {/* Best Practices */}
          <div className="bg-neutral-800 rounded-lg overflow-hidden animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="p-6">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Best Practices</h3>
              <p className="text-gray-400 mb-4">Learn the recommended patterns and practices</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Error handling</li>
                <li>• Rate limiting</li>
                <li>• Performance tips</li>
              </ul>
              <a href="#" className="inline-block mt-4 text-buttonBackground hover:text-orange-700">Read More →</a>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-neutral-800 rounded-lg p-8 animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-bold text-white mb-6">Latest Tutorials</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
                <span className="text-blue-400 text-sm">NEW</span>
                <h4 className="text-white">Working with Webhooks</h4>
                <span className="ml-auto text-gray-400">10 min read</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
                <h4 className="text-white">Implementing Real-time Updates</h4>
                <span className="ml-auto text-gray-400">15 min read</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
                <h4 className="text-white">Advanced Query Parameters</h4>
                <span className="ml-auto text-gray-400">8 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Guides;

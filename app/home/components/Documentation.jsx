import React from 'react';

const Documentation = () => {
  return (
    <section className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">Interactive Documentation</h2>
          <p className="text-xl text-gray-400">Explore and test API endpoints in real-time</p>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6 shadow-xl animate__animated animate__fadeInUp">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="space-y-2">
                <h3 className="text-white font-bold mb-4">API Endpoints</h3>
                <button className="w-full text-left px-4 py-2 rounded bg-blue-600 text-white">GET /users</button>
                <button className="w-full text-left px-4 py-2 rounded text-gray-300 hover:bg-neutral-700">POST /users</button>
                <button className="w-full text-left px-4 py-2 rounded text-gray-300 hover:bg-neutral-700">PUT /users/{id}</button>
                <button className="w-full text-left px-4 py-2 rounded text-gray-300 hover:bg-neutral-700">DELETE /users/{id}</button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">GET</span>
                    <span className="text-white font-mono">/users</span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Try it out</button>
                </div>

                <div className="space-y-4">
                  <div className="bg-neutral-700 p-4 rounded-lg">
                    <h4 className="text-white mb-2">Request Parameters</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-gray-400 text-sm mb-1">page</label>
                        <input type="number" className="w-full bg-neutral-600 text-white rounded p-2" placeholder="1" />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-gray-400 text-sm mb-1">limit</label>
                        <input type="number" className="w-full bg-neutral-600 text-white rounded p-2" placeholder="10" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-700 p-4 rounded-lg">
                    <h4 className="text-white mb-2">Response</h4>
                    <pre className="bg-neutral-800 p-4 rounded text-green-400 overflow-x-auto">
                      {`{
    "status": "success",
    "data": {
        "users": [
            {
                "id": 1,
                "name": "John Doe",
                "email": "john@example.com"
            }
        ],
        "page": 1,
        "total": 100
    }
}`}
                    </pre>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-white">Code Examples</h4>
                    <div className="bg-neutral-700 rounded-lg">
                      <div className="flex border-b border-neutral-600">
                        <button className="px-4 py-2 text-white bg-neutral-600 rounded-tl">cURL</button>
                        <button className="px-4 py-2 text-gray-400 hover:text-white">Python</button>
                        <button className="px-4 py-2 text-gray-400 hover:text-white">JavaScript</button>
                      </div>
                      <pre className="p-4 text-blue-400 overflow-x-auto">
                        {`curl -X GET "https://api.example.com/users" \\
     -H "Authorization: Bearer YOUR_TOKEN" \\
     -H "Content-Type: application/json"`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Documentation;

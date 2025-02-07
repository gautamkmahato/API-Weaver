import React, { useState } from 'react';

const FreightLTLInterface = () => {
  const [activeTab, setActiveTab] = useState('parameters');

  const tabs = [
    { id: 'parameters', label: 'Parameters' },
    { id: 'request-body', label: 'Request Body' },
    { id: 'success-response', label: '200 Response' },
    { id: 'error-responses', label: 'Error Responses' }
  ];

  const errorCodes = [
    {
      code: '400',
      title: 'Bad Request',
      description: 'Invalid parameters or request body format'
    },
    {
      code: '401',
      title: 'Unauthorized',
      description: 'Invalid or missing API key'
    },
    {
      code: '403',
      title: 'Forbidden',
      description: 'Insufficient permissions to access this resource'
    },
    {
      code: '404',
      title: 'Not Found',
      description: 'Requested resource not found'
    },
    {
      code: '500',
      title: 'Internal Server Error',
      description: 'Server encountered an unexpected condition'
    },
    {
      code: '503',
      title: 'Service Unavailable',
      description: 'Service is temporarily unavailable'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-6">Freight LTL API</h1>
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">HTTP Method</h2>
                <div className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                  POST
                </div>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">API Route</h2>
                <code className="block text-sm bg-gray-100 p-2 rounded">
                  /api/v1/getinfo
                </code>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500 mb-2">Version</h2>
                <span className="text-sm text-gray-700">1.0.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex space-x-4">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 px-4 text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab.id
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {/* Parameters Tab */}
                  {activeTab === 'parameters' && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Request Parameters</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              API Key
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your API key"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Format
                            </label>
                            <input
                              type="text"
                              placeholder="JSON"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Request Body Tab */}
                  {activeTab === 'request-body' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Request Body Format</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`{
  "shipmentInfo": {
    "origin": {
      "zipCode": "string",
      "country": "string"
    },
    "destination": {
      "zipCode": "string",
      "country": "string"
    },
    "items": [
      {
        "weight": "number",
        "length": "number",
        "width": "number",
        "height": "number",
        "quantity": "number"
      }
    ]
  }
}`}
                        </pre>
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        Validate JSON
                      </button>
                    </div>
                  )}

                  {/* 200 Response Tab */}
                  {activeTab === 'success-response' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Success Response (200)</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
{`{
  "status": "success",
  "data": {
    "quoteId": "string",
    "totalCost": "number",
    "transitTime": "string",
    "services": [
      {
        "serviceType": "string",
        "cost": "number",
        "estimatedDays": "number"
      }
    ]
  }
}`}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Error Responses Tab */}
                  {activeTab === 'error-responses' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Error Responses</h3>
                      {errorCodes.map((error) => (
                        <div key={error.code} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="text-red-500">⚠️</div>
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">
                                {error.code} - {error.title}
                              </h4>
                              <p className="text-gray-600 mt-1">{error.description}</p>
                              <pre className="mt-2 bg-gray-100 p-3 rounded text-sm">
{`{
  "status": "error",
  "code": "${error.code}",
  "message": "${error.description}"
}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreightLTLInterface;
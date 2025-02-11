'use client';

import { useState } from 'react';
import { Send, Copy, FileJson, ArrowLeftRight, Key, Globe } from 'lucide-react';

export default function Sandbox({ url, activePath, activeMethod, input }) {
  // const input = {
  //   "openapi": "3.0.0",
  //   "info": {
  //     "title": "Rates and Transit Times API",
  //     "version": "1.0.0"
  //   },
  //   "servers": [
  //     {
  //       "url": "/"
  //     }
  //   ],
  //   "paths": {}
  // };

  const [inputData, setInputData] = useState(input);
  const [output, setOutput] = useState({});
  const [apiKey, setApiKey] = useState('');
  const [authorizationToken, setAuthorizationToken] = useState('');

  const handleSubmit = () => {
    console.log(apiKey);
  };

  // Method colors mapping
  const getMethodColor = (method) => {
    const methodColors = {
      GET: 'bg-blue-200 text-blue-600',
      POST: 'bg-green-200 text-green-600',
      PUT: 'bg-purple-200 text-orange-600',
      DELETE: 'bg-red-200 text-red-600'
    };
    return methodColors[method];
  };

  return (
    <div className="w-full max-w-6xl bg-gray-800 rounded-xl shadow-lg mx-auto p-6 h-screen flex flex-col gap-4">
      {/* Top Section */}
      <div className="overflow-hidden">
      <div className="p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className={`px-4 py-2 ${getMethodColor(activeMethod)} rounded-lg font-semibold w-full sm:w-auto`}>
            {activeMethod}
          </div>
          <div className="flex-1">
            <div className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="flex-1 truncate">
                {`https://api.sandbox.com${activePath}`}
              </span>
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>

    <div className="bg-gray-900 rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Auth Tokens */}
        <div className="space-y-4">
          {/* Authorization Token Input */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-gray-100" />
              <label className="text-sm font-medium text-gray-200">Authorization Token</label>
            </div>
            <input
              type="text"
              value={authorizationToken}
              onChange={(e) => setAuthorizationToken(e.target.value)}
              placeholder="Enter authorization token"
              className="w-full px-3 py-2 text-gray-100 bg-gray-700 rounded-lg border border-gray-600 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>

          {/* API Key Input */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-gray-100" />
              <label className="text-sm font-medium text-gray-200">API Key</label>
            </div>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key"
              className="w-full px-3 py-2 text-gray-100 bg-gray-700 rounded-lg border border-gray-600 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Column - Schema Selector at top with space below */}
        <div className="space-y-4">
          {/* Schema Selector */}
          <div className="w-full lg:w-64">
            <label className="block text-sm font-medium text-gray-200 mb-2">Schema</label>
            <select className="w-full px-3 py-2 text-gray-100 bg-gray-700 rounded-lg border border-gray-600 text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent">
              <option className='text-gray-100'>Full Schema</option>
              <option className='text-gray-100'>Minimum Sample Payload</option>
            </select>
          </div>
          
          {/* Empty space for future content */}
          <div className="flex-1">
            {/* Future elements can be added here */}
          </div>
        </div>
      </div>
    </div>

      {/* Split View */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Input Panel */}
        <div className="flex-1 bg-gray-900 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
            <h2 className="font-medium text-gray-200">Input</h2>
            <button className="p-1.5 text-gray-300 hover:text-blue-600 rounded-md hover:bg-gray-100">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto bg-gray-900">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              {JSON.stringify(inputData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center">
          <div className="h-full w-px bg-gray-600 relative">
            <div className="absolute top-1/2 -translate-x-1/2 bg-gray-600 p-2 rounded-full border border-gray-500">
              <ArrowLeftRight className="w-4 h-4 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 bg-gray-900 rounded-lg shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 bg-gray-900 border-b border-gray-700 flex justify-between items-center">
            <h2 className="font-medium text-gray-200">Output</h2>
            <button className="p-1.5 text-gray-300 hover:text-blue-600 rounded-md hover:bg-gray-100">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-auto bg-gray-900">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              {JSON.stringify(output, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
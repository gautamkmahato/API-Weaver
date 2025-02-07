'use client';

import { useState } from 'react';
import { Send, Plus, X, Check, Code, Cookie, Lock, Globe } from 'lucide-react';

const TabPanel = ({ children, isActive }) => (
  <div className={`${isActive ? 'block' : 'hidden'} w-full`}>
    {children}
  </div>
);

const HeadersComponent = () => {
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (index) => setHeaders(headers.filter((_, i) => i !== index));
  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  return (
    <div className="space-y-4">
      {headers.map((header, index) => (
        <div key={index} className="group flex gap-3 items-end">
          <div className="flex-1">
            <input
              placeholder="Header"
              value={header.key}
              onChange={(e) => updateHeader(index, 'key', e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <input
              placeholder="Value"
              value={header.value}
              onChange={(e) => updateHeader(index, 'value', e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => removeHeader(index)}
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button
        onClick={addHeader}
        className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Header
      </button>
    </div>
  );
};

const BodyComponent = () => {
  const [bodyType, setBodyType] = useState('none');
  const [bodyContent, setBodyContent] = useState('');

  const bodyTypes = [
    { id: 'none', label: 'None' },
    { id: 'json', label: 'JSON' },
    { id: 'xml', label: 'XML' },
    { id: 'form', label: 'Form Data' }
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <div className="flex">
          {bodyTypes.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setBodyType(id)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                bodyType === id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {bodyType !== 'none' && (
        <textarea
          value={bodyContent}
          onChange={(e) => setBodyContent(e.target.value)}
          className="w-full h-48 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder={`Enter ${bodyType.toUpperCase()} data...`}
        />
      )}
    </div>
  );
};

const ApiTestSandbox = () => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState('headers');

  const tabs = [
    { id: 'headers', label: 'Headers', icon: Globe },
    { id: 'body', label: 'Body', icon: Code },
    { id: 'cookies', label: 'Cookies', icon: Cookie },
    { id: 'auth', label: 'Auth', icon: Lock },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* URL Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-3">
            <h1
              className="px-3 py-2 bg-white rounded-lg border border-gray-200 font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                GET
            </h1>
            <div className="flex-1">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter request URL"
                className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <TabPanel isActive={activeTab === 'headers'}>
            <HeadersComponent />
          </TabPanel>
          <TabPanel isActive={activeTab === 'body'}>
            <BodyComponent />
          </TabPanel>
          <TabPanel isActive={activeTab === 'cookies'}>
            <HeadersComponent />
          </TabPanel>
          <TabPanel isActive={activeTab === 'auth'}>
            <div className="text-gray-500">No authentication required</div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default ApiTestSandbox;
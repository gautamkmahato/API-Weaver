// ApiViewer.js
import React, { useState } from 'react';
import SchemaViewer from './SchemaViewer';
import InputSchemaViewer from './InputSchemaViewer';
import JsonHighlighter from './JsonHighlighter';

// Ensure all dependencies like SchemaViewer, InputSchemaViewer, and JsonHighlighter are exported as well.

const ApiViewer = ({ apiData }) => {
  const firstPath = Object.keys(apiData)[0];
  const firstMethod = Object.keys(apiData[firstPath])[0];

  const [activePath, setActivePath] = useState(firstPath);
  const [activeMethod, setActiveMethod] = useState(firstMethod);
  const [activeTab, setActiveTab] = useState('parameters');
  const [activeBodyTab, setActiveBodyTab] = useState('json');
  const [activeResponseTab, setActiveResponseTab] = useState('json');
  const [documentationView, setDocumentationView] = useState('This is Documentation View');

  const getMethodColor = (method) => {
    const methodColors = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-purple-100 text-purple-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return methodColors[method];
  };

  const tabs = {
    GET: ['parameters', 'success-response', 'error-responses'],
    POST: ['parameters', 'request-body', 'success-response', 'error-responses'],
    PUT: ['parameters', 'request-body', 'success-response', 'error-responses']
  };

  const handlePathChange = (path) => {
    setActivePath(path);
    const methods = Object.keys(apiData[path]);
    setActiveMethod(methods[0]);
    setActiveTab('parameters');
  };

  const handleMethodChange = (method) => {
    setActiveMethod(method);
    setActiveTab('parameters');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 flex-shrink-0 overflow-auto">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900 mb-6">API Documentation</h1>
            
            {/* Endpoints List */}
            <div className="space-y-6">
              {Object.entries(apiData).map(([path, methods]) => (
                <div key={path} className="space-y-2">
                  <h2 className="text-sm font-medium text-gray-500">{path}</h2>
                  <div className="space-y-2 pl-4">
                    {Object.keys(methods).map((method) => (
                      <button
                        key={`${path}-${method}`}
                        onClick={() => {
                          handlePathChange(path);
                          handleMethodChange(method);
                        }}
                        className={`w-full px-4 py-2 text-left rounded-md text-sm font-medium transition-colors duration-200 ${
                          activePath === path && activeMethod === method
                            ? getMethodColor(method)
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                {/* Endpoint Info */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className={`${getMethodColor(activeMethod)} px-3 py-2`}>
                      {activeMethod}
                    </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {activePath}
                    </code>
                  </div>
                  <p className="text-gray-600">
                    {apiData[activePath][activeMethod].input?.description || 
                     apiData[activePath][activeMethod].output?.description}
                  </p>
                </div>

                {/* Main Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex space-x-4">
                    {tabs[activeMethod].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 px-4 text-sm font-medium transition-colors duration-200 ${
                          activeTab === tab
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {/* Parameters Tab */}
                  {activeTab === 'parameters' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Headers</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {apiData[activePath][activeMethod].parameters.map((param, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{param.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {param.required ? 'Yes' : 'No'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{param.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <code className="bg-gray-100 px-2 py-1 rounded">{param.example}</code>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Request Body Tab */}
                  {activeTab === 'request-body' && (activeMethod === 'POST' || activeMethod === 'PUT') && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Request Body</h3>
                      
                      {/* Nested tabs for Request Body */}
                      <div className="border-b border-gray-200 mb-4">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setActiveBodyTab('json')}
                            className={`pb-2 px-4 text-sm font-medium transition-colors duration-200 ${
                              activeBodyTab === 'json'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            JSON
                          </button>
                          <button
                            onClick={() => setActiveBodyTab('message')}
                            className={`pb-2 px-4 text-sm font-medium transition-colors duration-200 ${
                              activeBodyTab === 'message'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Message
                          </button>
                        </div>
                      </div>

                      {/* Request Body Tab Content */}
                      {activeBodyTab === 'json' ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                            <JsonHighlighter json={apiData[activePath][activeMethod].input} />
                            {/* {JSON.stringify(apiData[activePath][activeMethod].input, null, 2)} */}
                          </pre>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <InputSchemaViewer schema={apiData[activePath][activeMethod].input} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Success Response Tab */}
                  {activeTab === 'success-response' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Response(200)</h3>
                      
                      {/* Nested tabs for Success Response */}
                      <div className="border-b border-gray-200 mb-4">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => setActiveResponseTab('json')}
                            className={`pb-2 px-4 text-sm font-medium transition-colors duration-200 ${
                              activeResponseTab === 'json'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            JSON
                          </button>
                          <button
                            onClick={() => setActiveResponseTab('message')}
                            className={`pb-2 px-4 text-sm font-medium transition-colors duration-200 ${
                              activeResponseTab === 'message'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            Message
                          </button>
                        </div>
                      </div>

                      {/* Success Response Tab Content */}
                      {activeResponseTab === 'json' ? (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                            <JsonHighlighter json={apiData[activePath][activeMethod].output} />
                            {/* {JSON.stringify(apiData[activePath][activeMethod].output, null, 2)} */}
                          </pre>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <SchemaViewer schema={apiData[activePath][activeMethod].output} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Error Responses Tab */}
                  {activeTab === 'error-responses' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Error Responses</h3>
                      {[
                        { code: '400', title: 'Bad Request' },
                        { code: '401', title: 'Unauthorized' },
                        { code: '403', title: 'Forbidden' },
                        { code: '404', title: 'Not Found' },
                        { code: '500', title: 'Internal Server Error' },
                        { code: '503', title: 'Service Unavailable' }
                      ].map((error) => (
                        <div key={error.code} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">
                            {error.code} - {error.title}
                          </h4>
                          <pre className="text-sm bg-gray-100 p-3 rounded">
{`{
  "status": "error",
  "code": "${error.code}",
  "message": "${error.title}"
}`}
                          </pre>
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

// Exporting the component as default for ease of use
export default ApiViewer;

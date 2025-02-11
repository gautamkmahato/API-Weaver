'use client'

import { useState } from 'react';
import SchemaViewer from './SchemaViewer'
import InputSchemaViewer from './InputSchemaViewer'
import Sandbox from './Sandbox';

export default function SchemaGenerator({ apiData }) {

  console.log(apiData)
  // Get first path and its first method for initialization
  const firstPath = Object.keys(apiData)[0];
  const firstMethod = Object.keys(apiData[firstPath])[0];
  
  // State management
  const [activePath, setActivePath] = useState(firstPath);
  const [activeMethod, setActiveMethod] = useState(firstMethod);
  const [activeName, setActiveName] = useState('');
  const [activeTab, setActiveTab] = useState('parameters');
  const [activeBodyTab, setActiveBodyTab] = useState('json');
  const [activeResponseTab, setActiveResponseTab] = useState('json');
  const [documentationView, setDocumentationView] = useState('This is Documentation View');
  const [loading, setLoading] = useState(false);
  const [checkDocIdStatus, setCheckDocIdStatus] = useState(false);
  const [apiGroupName, setApiGroupName] = useState(apiData[0]?.title || 'API Group Name');
  const [url, setUrl] = useState(apiData[0]?.url || 'https://api.sandbox.com');
  const [input, setInput] = useState(apiData[0]?.input || 'Please provide input Data');

  console.log(Object.entries(Object.entries(apiData)[0][1]));

  // Method colors mapping
  const getMethodColor = (method) => {
    const methodColors = {
      GET: 'bg-blue-100 text-blue-600',
      POST: 'bg-green-100 text-green-600',
      PUT: 'bg-purple-100 text-orange-600',
      DELETE: 'bg-red-100 text-red-600'
    };
    return methodColors[method];
  };

  // Available tabs for each method
  const tabs = {
    GET: ['parameters', 'success-response', 'error-responses', 'API Sandbox'],
    POST: ['parameters', 'request-body', 'success-response', 'error-responses', 'API Sandbox'],
    PUT: ['parameters', 'request-body', 'success-response', 'error-responses', 'API Sandbox'],
    DELETE: ['parameters', 'request-body', 'success-response', 'error-responses', 'API Sandbox']
  };

  // Event handlers
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

  console.log(apiData[activePath][activeMethod].summary)

  if(loading){
    return(
        <>
            <h1>Loading...</h1>
        </>
    )
  }


  return (
    <>
        <div className="bg-gray-50 pt-4">
          <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-80 ml-8 rounded-lg shadow-sm bg-white border-r border-gray-200 flex-shrink-0 overflow-auto">
              <div className="p-6">
                <h1 className="text-xl font-bold text-gray-900 mb-6">{apiGroupName}</h1>
                
                {/* Endpoints List */}
                <div className="space-y-2"> {/* Reduced space between buttons */}
                  {Object.entries(apiData).map(([path, methods]) => (
                    <div key={path} className="space-y-1"> {/* Reduced space between groups */}
                      {Object.entries(methods).map(([method, value], index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handlePathChange(path);
                            handleMethodChange(method);
                          }}
                          className={`w-full px-4 py-2 text-left rounded-md text-sm font-medium transition-colors duration-200 ${
                            activePath === path && activeMethod === method
                              ? getMethodColor(method)
                              : ' text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className='text-[13px] font-semibold'>{value.summary}</span>
                            <span
                              className={`font-bold ${
                                method === 'GET'
                                  ? 'text-blue-600 text-[11px]'
                                  : method === 'POST'
                                  ? 'text-green-600 text-[11px] font-bold'
                                  : method === 'PUT'
                                  ? 'text-orange-600 text-[11px]'
                                  : method === 'DELETE'
                                  ? 'text-red-600 text-[11px]'
                                  : 'text-gray-600 text-[11px]'
                              }`}
                            >
                              {method}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto hide-scrollbar">
              <div className="px-8">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    {/* Endpoint Info */}
                    <div className="mb-6">
                      <h1 className='text-left text-gray-700 rounded-md text-xl font-semibold mb-4'>
                          {apiData[activePath][activeMethod].summary}
                      </h1>
                      <div className="flex items-center font-semibold space-x-4 mb-2">
                        <span className={`${getMethodColor(activeMethod)} px-3 py-2`}>
                          {activeMethod}
                        </span>
                        <code className="text-sm bg-gray-100 px-4 py-2 rounded">
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
                                      <code className="bg-gray-100 px-2 py-1 rounded">{param.schema.example}</code>
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
                                {/* <JsonHighlighter json={apiData[activePath][activeMethod].input} /> */}
                                {JSON.stringify(apiData[activePath][activeMethod].input, null, 2)} 
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
                                {/* <JsonHighlighter json={apiData[activePath][activeMethod].output} /> */}
                                {JSON.stringify(apiData[activePath][activeMethod].output[0].content, null, 2)}
                              </pre>
                            </div>
                          ) : (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <SchemaViewer schema={apiData[activePath][activeMethod].output[0].content} />
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

                      {/* http client */}
                      {activeTab === 'API Sandbox' && <Sandbox url={url} activePath={activePath} activeMethod={activeMethod} input={input} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};



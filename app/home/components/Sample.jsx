// src/components/ApiViewer/index.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../ErrorMessage';
import Parameters from '../Parameters';
import RequestBody from '../RequestBody';
import Response from '../Response';
import { validateApiData } from '../../utils/validators';

const ApiViewer = ({ apiData, theme = 'light', onError }) => {
  const [state, setState] = useState(() => {
    try {
      validateApiData(apiData);
      return {
        path: Object.keys(apiData)[0],
        method: Object.keys(apiData[Object.keys(apiData)[0]])[0],
        error: null
      };
    } catch (error) {
      onError?.(error);
      return { path: '', method: '', error };
    }
  });

  const [activeTab, setActiveTab] = useState('parameters');
  const [viewType, setViewType] = useState('json');

  useEffect(() => {
    try {
      validateApiData(apiData);
      setState(prev => ({ ...prev, error: null }));
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      onError?.(error);
    }
  }, [apiData]);

  if (state.error) {
    return <ErrorMessage error={state.error} />;
  }

  const handlePathChange = (path) => {
    try {
      setState({
        path,
        method: Object.keys(apiData[path])[0],
        error: null
      });
      setActiveTab('parameters');
    } catch (error) {
      setState(prev => ({ ...prev, error }));
      onError?.(error);
    }
  };

  const handleMethodChange = (method) => {
    setState(prev => ({ ...prev, method, error: null }));
    setActiveTab('parameters');
  };

  return (
    <div className={`api-viewer ${theme}`}>
      <Sidebar 
        apiData={apiData}
        activePath={state.path}
        activeMethod={state.method}
        onPathChange={handlePathChange}
        onMethodChange={handleMethodChange}
      />
      <MainContent 
        apiData={apiData}
        path={state.path}
        method={state.method}
        activeTab={activeTab}
        viewType={viewType}
        onTabChange={setActiveTab}
        onViewTypeChange={setViewType}
      />
    </div>
  );
};

// src/components/Sidebar/index.js
const Sidebar = ({ apiData, activePath, activeMethod, onPathChange, onMethodChange }) => {
  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800'
    };
    return colors[method] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-bold mb-6">API Documentation</h1>
        {Object.entries(apiData).map(([path, methods]) => (
          <div key={path} className="mb-4">
            <h2 className="text-sm font-medium text-gray-500">{path}</h2>
            <div className="pl-4 mt-2 space-y-2">
              {Object.keys(methods).map(method => (
                <button
                  key={`${path}-${method}`}
                  onClick={() => {
                    onPathChange(path);
                    onMethodChange(method);
                  }}
                  className={`w-full px-4 py-2 text-left rounded-md text-sm font-medium
                    ${activePath === path && activeMethod === method 
                      ? getMethodColor(method)
                      : 'bg-gray-100 hover:bg-gray-200'
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
  );
};






export default ApiViewer;
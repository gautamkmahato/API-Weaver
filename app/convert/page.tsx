'use client'


import React, { useState } from 'react';
import { Settings2, Play, Save, RefreshCw, Plus, X } from 'lucide-react';
import convertToOpenApiSchema from '../actions/convertToOpenApiSchema';

const variants = {
    default: 'bg-white border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    danger: 'bg-red-50 border-red-200',
    ghost: 'border-0 shadow-none bg-transparent'
  };
  
  const Card = ({ 
    className = '', 
    children, 
    variant = 'default',
    hover = false,
    animate = false 
  }) => {
    const baseStyles = 'rounded-lg border shadow-sm transition-all duration-200';
    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
    const animateStyles = animate ? 'animate-fadeIn' : '';
    const variantStyles = variants[variant] || variants.default;
  
    return (
      <div className={`${baseStyles} ${hoverStyles} ${animateStyles} ${variantStyles} ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardHeader = ({ className = '', children, divider = false }) => {
    return (
      <div className={`flex flex-col space-y-1.5 p-6 ${divider ? 'border-b border-gray-100' : ''} ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardTitle = ({ className = '', children, size = 'default' }) => {
    const sizes = {
      small: 'text-lg',
      default: 'text-2xl',
      large: 'text-3xl'
    };
  
    return (
      <h3 className={`${sizes[size]} font-semibold leading-none tracking-tight ${className}`}>
        {children}
      </h3>
    );
  };
  
  const CardDescription = ({ className = '', children }) => {
    return (
      <p className={`text-sm text-gray-500 ${className}`}>
        {children}
      </p>
    );
  };
  
  const CardContent = ({ className = '', children, padding = 'default' }) => {
    const paddings = {
      none: 'p-0',
      small: 'p-3',
      default: 'p-6 pt-0',
      large: 'p-8 pt-0'
    };
  
    return (
      <div className={`${paddings[padding]} ${className}`}>
        {children}
      </div>
    );
  };
  
  const CardFooter = ({ className = '', children, divider = false }) => {
    return (
      <div className={`flex items-center p-6 pt-0 ${divider ? 'border-t border-gray-100 mt-6' : ''} ${className}`}>
        {children}
      </div>
    );
  };
  
  // Add keyframes for animations
  const styles = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out;
    }
  `;
  
  // Add styles to document
  if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }


  const ParameterInput = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Parameters state to store multiple parameters
    const [parameters, setParameters] = useState([{
      name: '',
      in: 'query', // default to query
      description: '',
      required: false,
      schema: {
        type: 'string', // default to string
      }
    }]);
  
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log('Parameters:', parameters);
      
        const inputData = {
          input: input,
          output: output,
          parameters: parameters,
        };
      
        console.log('Input Data:', inputData);
      
        try {
          const result = await convertToOpenApiSchema(inputData);
          console.log('Result:', result);
      
          if (result) {
            setResult(JSON.stringify(result.openapiSchema, null, 2)); // Display the OpenAPI schema
            setLoading(false);
          } else {
            setLoading(false);
          }
        } catch (error) {
          console.error('Error:', error);
          setLoading(false);
        }
    };
  
    const addParameter = () => {
      setParameters([
        ...parameters,
        {
          name: '',
          in: 'query',
          description: '',
          required: false,
          schema: {
            type: 'string',
          },
        },
      ]);
    };
  
    const removeParameter = (index) => {
      setParameters(parameters.filter((_, i) => i !== index));
    };
  
    const updateParameter = (index, field, value) => {
      const newParameters = [...parameters];
      newParameters[index][field] = value; // Only update the specific field
      setParameters(newParameters);
    };

    if(loading){
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }
  
    return (
      <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Settings2 className="w-6 h-6 text-blue-500 mr-2" />
              <h3 className="text-2xl text-white">Input Configuration</h3>
            </div>
            <div className="text-sm text-gray-400">
              Configure your input parameters and values
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Parameters section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  Parameters
                </label>
                <button
                  type="button"
                  onClick={addParameter}
                  className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all duration-200 hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Parameter
                </button>
              </div>
  
              {/* Loop through parameters and render each */}
              <div className="space-y-3">
                {parameters.map((param, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={param.name}
                        onChange={(e) => updateParameter(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300"
                        placeholder="Parameter name"
                      />
                    </div>
  
                    <div className="flex-1">
                      <select
                        value={param.in}
                        onChange={(e) => updateParameter(index, 'in', e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="header">Header</option>
                        <option value="query">Query</option>
                      </select>
                    </div>
  
                    <div className="flex-1">
                      <select
                        value={param.required ? 'Yes' : 'No'}
                        onChange={(e) => updateParameter(index, 'required', e.target.value === 'Yes')}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
  
                    <div className="flex-1">
                      <select
                        value={param.schema.type}
                        onChange={(e) => updateParameter(index, 'schema', { type: e.target.value })}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="string">String</option>
                        <option value="number">Number</option>
                        <option value="boolean">Boolean</option>
                      </select>
                    </div>
  
                    {parameters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParameter(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-all duration-200 hover:scale-110 rounded-full hover:bg-red-50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
  
            {/* Input section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 hover:border-blue-300"
                placeholder="Enter your input here..."
              />
            </div>
  
            {/* Output section */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Output Text</label>
              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 hover:border-blue-300"
                placeholder="Enter your output here..."
              />
            </div>
  
            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
              >
                <Play className="w-4 h-4 mr-2" />
                Process
              </button>
              <button
                type="button"
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 hover:scale-105"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setInput('');
                  setParameters([{ name: '', in: 'query', description: '', required: false, schema: { type: 'string' } }]);
                  setOutput('');
                }}
                className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 hover:scale-105"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </form>
        </div>
  
        {/* Output */}
        <div className="mt-6 p-6 bg-gray-700 text-white rounded-lg shadow-lg">
          <h3 className="text-xl mb-4">Output</h3>
          <pre className="min-h-[100px] p-4 bg-gray-800 rounded-lg whitespace-pre-wrap border border-gray-500">
            {result || 'Output will appear here...'}
          </pre>
        </div>
      </div>
    );
  };
  
  export default ParameterInput;
  

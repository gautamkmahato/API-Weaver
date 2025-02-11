'use client';

import SchemaGenerator from '@/app/_components/SchemaGenerator';
import React, { useState } from 'react';
import { Upload, FileText, ArrowUpCircle, FileJson, RefreshCcw } from 'lucide-react';
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';

export default function ApiDocsGenerator() {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const convertToJson = (input) => {
    try {
      // First try to parse as JSON
      JSON.parse(input);
      return input; // If successful, return as is
    } catch (e) {
      try {
        // If JSON parsing fails, try to parse as YAML
        const jsonData = yaml.load(input);
        return JSON.stringify(jsonData);
      } catch (yamlError) {
        throw new Error('Invalid format. Please provide valid JSON or YAML.');
      }
    }
  };

  const validateOpenAPISchema = async (jsonData) => {
    try {
      // First check if the OpenAPI version is supported
      const version = jsonData.openapi;
      if (!version) {
        throw new Error('OpenAPI version not found in schema');
      }

      // Check for supported versions (3.0.x or 3.1.x)
      if (!version.startsWith('3.0') && !version.startsWith('3.1')) {
        throw new Error('Unsupported OpenAPI version. Only versions 3.0.x and 3.1.x are supported.');
      }

      // For 3.0.x versions, use Swagger Parser validation
      if (version.startsWith('3.0')) {
        await SwaggerParser.validate(jsonData);
      } else {
        // For 3.1.x versions, perform basic structure validation
        // Check for required OpenAPI 3.1 fields
        if (!jsonData.info || !jsonData.paths) {
          throw new Error('Invalid OpenAPI 3.1 schema: Missing required fields (info or paths)');
        }

        // Validate info object
        if (!jsonData.info.title || !jsonData.info.version) {
          throw new Error('Invalid OpenAPI 3.1 schema: Missing required fields in info object (title or version)');
        }

        // Validate paths object
        if (typeof jsonData.paths !== 'object') {
          throw new Error('Invalid OpenAPI 3.1 schema: Paths must be an object');
        }
      }
      
      return true;
    } catch (err) {
      throw new Error(`OpenAPI schema validation failed: ${err.message}`);
    }
  };

  const validateInput = async (text) => {
    try {
      // Step 1: Convert YAML to JSON if needed
      const jsonString = convertToJson(text);
      
      // Step 2: Parse JSON
      const jsonData = JSON.parse(jsonString);

      // Step 3: Validate OpenAPI Schema
      await validateOpenAPISchema(jsonData);
      
      return jsonData;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const text = uploadMethod === 'file' ? await file.text() : inputText;

      // Validate input before sending to backend
      const validatedData = await validateInput(text);
      if (!validatedData) {
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/convert/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.details);
        setLoading(false);
        throw new Error(errorData.details || 'Error processing request');
      }

      const { ans } = await response.json();
      setFileContent(ans);
    } catch (error) {
      console.error('Error processing input:', error);
      setFileContent(null);
      if (!error.message.includes('Invalid')) {
        setError('Error processing request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputData = () => {
    fileContent ? setApiData(fileContent) : alert('Please upload or paste JSON first');
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-12 px-4">
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
            <p className="flex items-center">
              <span className="font-semibold">Error:</span>
              <span className="ml-2">{error}</span>
            </p>
          </div>
        )}

        {/* Rest of your existing JSX remains the same */}
        <div className="max-w-2xl mx-auto mt-12 rounded-xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">API Documentation Generator</h1>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setUploadMethod('file')}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${uploadMethod === 'file'
                    ? 'text-white shadow-md'
                    : 'text-gray-700 bg-opacity-60'
                  }`}
                style={{ backgroundColor: uploadMethod === 'file' ? '#B6A28E' : '#F5F5DC' }}
              >
                <Upload className="mr-2 h-5 w-5" />
                File Upload
              </button>
              <button
                onClick={() => setUploadMethod('text')}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${uploadMethod === 'text'
                    ? 'text-white shadow-md'
                    : 'text-gray-700 bg-opacity-60'
                  }`}
                style={{ backgroundColor: uploadMethod === 'text' ? '#B6A28E' : '#F5F5DC' }}
              >
                <FileText className="mr-2 h-5 w-5" />
                Paste JSON
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <form onSubmit={handleFileUpload} className="space-y-6">
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-opacity-70 transition-all duration-200"
                  style={{ borderColor: '#B6A28E' }}
                >
                  <input
                    type="file"
                    accept=".json,.yaml,.yml"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <FileJson className="h-16 w-16 mb-4" style={{ color: '#B6A28E' }} />
                    <span className="text-sm mb-2">Drag and drop your JSON file here</span>
                    <span className="text-xs opacity-60">or click to browse</span>
                    {file && (
                      <div className="mt-4 p-2 rounded-lg text-sm" style={{ backgroundColor: '#B6A28E', color: '#F5F5DC' }}>
                        {file.name}
                      </div>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!file}
                  className="w-full py-3 rounded-lg text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: '#E07B39' }}
                >
                  <ArrowUpCircle className="mr-2 h-5 w-5" />
                  Upload and Process
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your JSON here..."
                  rows={8}
                  className="w-full p-4 rounded-lg border focus:ring-2 focus:ring-opacity-50 resize-none"
                  style={{ backgroundColor: 'white', borderColor: '#B6A28E' }}
                />
                <button
                  onClick={handleFileUpload}
                  disabled={!inputText}
                  className="w-full py-3 rounded-lg text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                  style={{ backgroundColor: '#E07B39' }}
                >
                  <ArrowUpCircle className="mr-2 h-5 w-5" />
                  Process JSON
                </button>
              </div>
            )}

            <button
              onClick={handleInputData}
              disabled={!fileContent}
              className="w-full mt-6 py-3 rounded-lg text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#E07B39' }}
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              Generate Documentation
            </button>
          </div>
        </div>

        {apiData && (
          <div className="mt-12 w-full mx-auto rounded-xl shadow-xl overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
            <div className="p-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#E07B39' }}></div>
                </div>
              ) : (
                <SchemaGenerator apiData={apiData} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
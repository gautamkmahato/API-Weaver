'use client';

import SchemaGenerator from '@/app/_components/SchemaGenerator';
import React, { useState } from 'react';
import { Upload, FileText, ArrowUpCircle, FileJson, RefreshCcw } from 'lucide-react';
import SwaggerParser from '@apidevtools/swagger-parser';

export default function ApiDocsGenerator() {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateOpenAPISchema = async (jsonData) => {
    try {
      await SwaggerParser.validate(jsonData);
      
      if (!jsonData.openapi?.startsWith('3.0')) {
        throw new Error('Invalid OpenAPI version. Only OpenAPI 3.0.x is supported.');
      }
      
      return true;
    } catch (err) {
      throw new Error(`Invalid OpenAPI 3.0 schema: ${err.message}`);
    }
  };

  const validateInput = async (text) => {
    try {
      let jsonData;
      try {
        jsonData = JSON.parse(text);
      } catch (err) {
        throw new Error('Invalid JSON format. Please check your input.');
      }

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
    try {
      setLoading(true);
      const text = uploadMethod === 'file' ? await file.text() : inputText;
      
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
    <div className="min-h-screen mt-12">
      {error && (
        <div className="max-w-2xl mx-auto p-4 fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-lg">
          <p className="flex items-center font-medium">{error}</p>
        </div>
      )}

      <div className="container mx-auto py-8">
        <div className="max-w-xl mx-auto rounded-2xl shadow-2xl overflow-hidden" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">API Documentation Generator</h1>
            
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setUploadMethod('file')}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 ${
                  uploadMethod === 'file' ? 'text-white' : 'text-gray-700'
                }`}
                style={{ backgroundColor: uploadMethod === 'file' ? '#B6A28E' : '#F5F5DC' }}
              >
                <Upload className="mr-2 h-5 w-5" />
                File Upload
              </button>
              <button
                onClick={() => setUploadMethod('text')}
                className={`flex items-center px-6 py-3 rounded-lg transition-colors duration-200 ${
                  uploadMethod === 'text' ? 'text-white' : 'text-gray-700'
                }`}
                style={{ backgroundColor: uploadMethod === 'text' ? '#B6A28E' : '#F5F5DC' }}
              >
                <FileText className="mr-2 h-5 w-5" />
                Paste JSON
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <form onSubmit={handleFileUpload} className="space-y-6">
                <div className="border-3 border-dashed rounded-xl p-10 text-center transition-all duration-200 hover:opacity-80"
                     style={{ borderColor: '#B6A28E', backgroundColor: 'rgba(182, 162, 142, 0.1)' }}>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                    <FileJson className="h-16 w-16 mb-4" style={{ color: '#B6A28E' }} />
                    <p className="text-lg mb-2">Drop your JSON file here</p>
                    <p className="text-sm opacity-60">or click to browse</p>
                    {file && (
                      <div className="mt-4 px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#B6A28E' }}>
                        {file.name}
                      </div>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!file}
                  className="w-full py-4 rounded-lg text-white flex items-center justify-center transition-opacity duration-200 disabled:opacity-50"
                  style={{ backgroundColor: '#E07B39' }}
                >
                  <ArrowUpCircle className="mr-2 h-5 w-5" />
                  Process File
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your JSON here..."
                  rows={8}
                  className="w-full p-4 rounded-lg border focus:ring-2 focus:ring-opacity-50"
                  style={{ backgroundColor: 'white', borderColor: '#B6A28E' }}
                />
                <button
                  onClick={handleFileUpload}
                  disabled={!inputText}
                  className="w-full py-4 rounded-lg text-white flex items-center justify-center transition-opacity duration-200 disabled:opacity-50"
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
              className="w-full mt-6 py-4 rounded-lg text-white flex items-center justify-center transition-opacity duration-200 disabled:opacity-50"
              style={{ backgroundColor: '#E07B39' }}
            >
              <RefreshCcw className="mr-2 h-5 w-5" />
              Generate Documentation
            </button>
          </div>
        </div>

        {apiData && (
          <div className="mt-8 max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center p-8 rounded-xl" style={{ backgroundColor: '#F5F5DC' }}>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" 
                     style={{ borderColor: '#E07B39', borderTopColor: 'transparent' }} />
              </div>
            ) : (
              <div className="p-8 rounded-xl" style={{ backgroundColor: '#F5F5DC' }}>
                <SchemaGenerator apiData={apiData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
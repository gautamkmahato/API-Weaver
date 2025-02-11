'use client';

import React, { useState } from 'react';
import Test from '../../_components/Test';
import uploadJsonData from '@/app/actions/uploadJsonData';
import { RedirectToSignIn, useAuth, useUser } from '@clerk/nextjs';
import LoadingSpinner from '@/app/_components/LoadingSpinner';
import { Upload, FileText, ArrowUpCircle, FileJson } from 'lucide-react';
import SwaggerParser from '@apidevtools/swagger-parser';
import yaml from 'js-yaml';

export default function UploadSchema({ docId, project_id }) {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file');
  const [apiJson, setApiJson] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();

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
      // Check if the OpenAPI version is supported
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
        if (!jsonData.info || !jsonData.paths) {
          throw new Error('Invalid OpenAPI 3.1 schema: Missing required fields (info or paths)');
        }

        if (!jsonData.info.title || !jsonData.info.version) {
          throw new Error('Invalid OpenAPI 3.1 schema: Missing required fields in info object');
        }

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
    try {
      setLoading(true);
      const text = uploadMethod === 'file' ? await file.text() : inputText;
      
      // Validate and convert input
      const validatedData = await validateInput(text);
      if (!validatedData) {
        setLoading(false);
        return;
      }

      setApiJson(validatedData);

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
    } finally {
      setLoading(false);
    }
  };

  const handleInputData = async () => {
    const token = await getToken();
    setLoading(true);
    const result = await uploadJsonData(fileContent, apiJson, docId, project_id, user?.id, token);
    if (result) {
      fileContent ? setApiData(fileContent) : alert('Please upload or paste JSON first');
    } else {
      console.log(`Something went wrong in uploading apiData to Database:`);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#B6A28E' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if(!isSignedIn){
    return(
      <RedirectToSignIn />
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {error && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-medium">{error}</p>
        </div>
      )}
      
      <div className="max-w-2xl mx-auto rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-8">Upload JSON Schema</h2>
          
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setUploadMethod('file')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                uploadMethod === 'file'
                  ? 'bg-opacity-100 text-white'
                  : 'bg-opacity-60 text-gray-700'
              }`}
              style={{ backgroundColor: uploadMethod === 'file' ? '#B6A28E' : '#F5F5DC' }}
            >
              <Upload className="mr-2 h-5 w-5" />
              File Upload
            </button>
            <button
              onClick={() => setUploadMethod('text')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${
                uploadMethod === 'text'
                  ? 'bg-opacity-100 text-white'
                  : 'bg-opacity-60 text-gray-700'
              }`}
              style={{ backgroundColor: uploadMethod === 'text' ? '#B6A28E' : '#F5F5DC' }}
            >
              <FileText className="mr-2 h-5 w-5" />
              Paste JSON
            </button>
          </div>

          {uploadMethod === 'file' ? (
            <form onSubmit={handleFileUpload} className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: '#B6A28E' }}>
                <input
                  type="file"
                  accept=".json,.yaml,.yml"
                  onChange={(e) => setFile(e.target.files[0])} 
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <FileJson className="h-12 w-12 mb-4" style={{ color: '#B6A28E' }} />
                  <span className="text-sm">Drop your JSON file here or click to browse</span>
                  {file && <span className="mt-2 text-sm font-medium">{file.name}</span>}
                </label>
              </div>
              <button
                type="submit"
                disabled={!file}
                className="w-full py-3 rounded-lg text-white flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                style={{ backgroundColor: '#E07B39' }}
              >
                <ArrowUpCircle className="mr-2 h-5 w-5" />
                Upload JSON File
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your JSON here..."
                rows={8}
                className="w-full p-4 rounded-lg border focus:ring-2 focus:ring-opacity-50"
                style={{ backgroundColor: 'white', borderColor: '#B6A28E', outline: 'none' }}
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
            <FileText className="mr-2 h-5 w-5" />
            Convert to Documentation
          </button>
        </div>
      </div>

      {apiData && (
        <div className="mt-8 mx-auto">
          <Test apiData={apiData} docId={docId} />
        </div>
      )}
    </div>
  )
  
}
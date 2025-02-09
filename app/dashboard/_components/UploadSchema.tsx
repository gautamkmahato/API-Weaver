'use client';

import React, { useState } from 'react';
import Test from '../../_components/Test';
import uploadJsonData from '@/app/actions/uploadJsonData';
import { RedirectToSignIn, useAuth, useUser } from '@clerk/nextjs';
import LoadingSpinner from '@/app/_components/LoadingSpinner';
import { Upload, FileText, ArrowUpCircle, FileJson } from 'lucide-react';

export default function UploadSchema({ docId, project_id }) {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file');
  const [apiJson, setApiJson] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const text = uploadMethod === 'file' ? await file.text() : inputText;
      const data = JSON.parse(text);
      setApiJson(data);

      const response = await fetch('http://localhost:8000/convert/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
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
                  accept=".json"
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
  );
}
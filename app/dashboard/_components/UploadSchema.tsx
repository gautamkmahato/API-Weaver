'use client';

import React, { useState } from 'react';
import Test from '../../_components/Test';
import uploadJsonData from '@/app/actions/uploadJsonData';
import { useAuth, useUser } from '@clerk/nextjs';
import LoadingSpinner from '@/app/_components/LoadingSpinner';

export default function UploadSchema({ docId, project_id }) {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState(''); 
  const [fileContent, setFileContent] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('file');
  const [apiJson, setApiJson] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)

  const { isSignedIn, user, isLoaded } = useUser(); // Get both user and isLoaded status
  const { getToken } = useAuth();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const text = uploadMethod === 'file' ? await file.text() : inputText;
      const data = JSON.parse(text);
      // to set raw JSON data to api_Json field in the DB
      setApiJson(data);

      const response = await fetch('http://localhost:8000/convert/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure this is set
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
      console.log(ans)
    } catch (error) {
      console.error('Error processing input:', error);
      setFileContent(null);
      setLoading(false);
    } finally{
      setLoading(false);
    }
  };

  const handleInputData = async () => { 
    const token = await getToken();
      // upload the openapi json data to postgress DB
      console.log(fileContent);
      setLoading(true);
      const result = await uploadJsonData(fileContent, apiJson, docId, project_id, user?.id, token);
      console.log(result)
      if(result){
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          fileContent ? setApiData(fileContent) : alert('Please upload or paste JSON first');
          setLoading(false);
        } else{
          console.log(`Something went wrong in uploading apiData to Database:`);
          setLoading(false);
        }

  };

  if(loading){
    return(
      <>
        <LoadingSpinner />
      </>
    )
  }


  return (
    <>
      {error && <h1>{error}</h1>}
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setUploadMethod('file')}
              className={`mr-4 px-4 py-2 rounded ${uploadMethod === 'file' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              File Upload
            </button>
            <button
              onClick={() => setUploadMethod('text')}
              className={`px-4 py-2 rounded ${uploadMethod === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Paste JSON
            </button>
          </div>

          {uploadMethod === 'file' ? (
            <form onSubmit={handleFileUpload} className="mb-6">
              <input
                type="file"
                accept=".json"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                type="submit"
                disabled={!file}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Upload JSON File
              </button>
            </form>
          ) : (
            <div className="mb-6">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your JSON here"
                rows={6}
                className="w-full p-2 border rounded mb-4"
              />
              <button
                onClick={handleFileUpload}
                disabled={!inputText}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                Process JSON
              </button>
            </div>
          )}

          <button
            onClick={handleInputData}
            disabled={!fileContent}
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 disabled:opacity-50 mt-4"
          >
            Convert to Documentation
          </button>
        </div>

        {apiData && (
          <div className="mt-8 w-full">
            <Test apiData={apiData} docId={docId} />
          </div>
        )}
      </div>
    </>
  );
}
'use client'

import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import updateProject from '@/app/actions/updateProject';
import fetchDocumentationByDocId from '@/app/actions/fetchDocumentationByDocId';
import DocumentationTabs from '@/app/dashboard/_components/DocumentationTabs';
import updateDocumentation from '@/app/actions/updateDocumentation';
import Link from 'next/link';
import LoadingSpinner from '@/app/_components/LoadingSpinner';

export default function DocumentationUpdatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [openApiSchema, setOpenApiSchema] = useState("");
  const [apiJson, setApiJson] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);  // To handle loading state

  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const params = useParams();
  console.log(params)
  const project_id = params.id;
  const docId = params.docId;


  // Fetch project details
  useEffect(() => {
    async function getProject() {
      setLoading(true);  // Set loading state to true before fetching
      if (isLoaded && user){
        try {
          const token = await getToken(); 
          const result = await fetchDocumentationByDocId(docId, project_id, user?.id, token);
  
          if (result.length > 0) {  
            setTitle(result[0].title);
            setDescription(result[0].description);
            setOpenApiSchema(result[0].openapi_schema);
            setApiJson(result[0].api_Json);
            setUrl(result[0].url);
            setInput(result[0].input);
            setOutput(result[0].output);
  
          } else {
            setErrorMessage('Project not found.');
          }
          console.log(result)
        } catch (error) {
          console.error('Error fetching project:', error);
          setErrorMessage('Failed to fetch project. Please try again.');
        } finally {
          setLoading(false);  // Set loading state to false after fetching is done
        }
      }
    }
    if (user?.id && project_id) {
      getProject();
    }
  }, [docId, getToken, isLoaded, project_id, user, user?.id]);

  // Save function to update project name and description
  const handleSave = async (newTitle, newDescription, newUrl, newInput, newOutput, newOpenApiSchema, newApiJson) => {
    setLoading(true);  // Start loading when saving
    console.log(newTitle, newDescription, newUrl, newInput, newOutput, newOpenApiSchema, newApiJson);
    
    const inputData = {
      user_id: user?.id,
      project_id: project_id,
      docId: docId,
      title: newTitle, 
      description: newDescription,
      openapi_schema: newOpenApiSchema,
      url: newUrl,
      input: newInput,
      output: newOutput,
      api_Json: newApiJson
    };

    try {
      const result = await updateDocumentation(inputData); 
      
      if (result) {
        // Assuming the result has a success field to check if the update was successful
        setTitle(newTitle);
        setDescription(newDescription);
        setUrl(newUrl);
        setInput(newInput);
        setOutput(newOutput);
        setOpenApiSchema(newOpenApiSchema);
        setApiJson(newApiJson);
        setErrorMessage('');  // Clear any previous error messages

      } else {
        setErrorMessage('Failed to update the project. Please try again.');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      setErrorMessage('An error occurred while updating the project.');
    } finally {
      setLoading(false);  // Stop loading once the update is complete
    }
  };

  // If loading, display a loading indicator
  if (loading) {
    return(
      <>
        <LoadingSpinner />
      </>
    )
  }

  // Early exit if user is not signed in or project_id is missing
  if (!isLoaded || !isSignedIn || !user || !project_id) { 
    return(
      <>
        <div>
          <p><span className="text-blue-700 font-semibold"><Link href='/sign-in'>Sign In</Link></span> in to view this page</p>
        </div>
      </>
    )
  }

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}
      <DocumentationTabs
        user_id={user?.id}
        project_id={project_id}
        docId={docId}
        title={title}
        description={description}
        url={url}
        input={input}
        output={output}
        openApiSchema={openApiSchema}
        apiJson={apiJson}
        onSave={handleSave}
      />
    </div>
  );
}

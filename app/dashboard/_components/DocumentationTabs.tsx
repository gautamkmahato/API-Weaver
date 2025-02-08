import { useState } from 'react';
import { useRouter } from 'next/navigation';
import deleteDocumentation from '@/app/actions/deleteDocumentation';
import ConfirmModal from '@/app/_components/ConfirmModal';
import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function DocumentationTabs({
  user_id, 
  project_id, 
  docId, 
  title, 
  description, 
  url, 
  input, 
  output, 
  openApiSchema, 
  apiJson,
  onSave
}) {
  const [activeTab, setActiveTab] = useState(1);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newUrl, setNewUrl] = useState(url);
  const [newInput, setNewInput] = useState(JSON.stringify(input, null, 2)); // Convert to string for editing
  const [newOutput, setNewOutput] = useState(JSON.stringify(output, null, 2)); // Convert to string for editing
  const [newOpenApiSchema, setNewOpenApiSchema] = useState(JSON.stringify(openApiSchema, null, 2)); // Convert to string for editing
  const [newApiJson, setNewApiJson] = useState(JSON.stringify(apiJson, null, 2)); // Convert to string for editing
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const router = useRouter();

  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const handleSave = () => {
    try {
      const parsedInput = JSON.parse(newInput); // Convert string back to JSON
      const parsedOutput = JSON.parse(newOutput); // Convert string back to JSON
      const parsedOpenApiSchema = JSON.parse(newOpenApiSchema); // Convert string back to JSON
      const parsedApiJson = JSON.parse(newApiJson); // Convert string back to JSON
      console.log(parsedInput, parsedOutput, parsedOpenApiSchema, parsedApiJson)
      onSave(newTitle, newDescription, newUrl, parsedInput, parsedOutput, parsedOpenApiSchema, parsedApiJson);  // Call the save function passed from parent
      setIsEditing(false);  // Stop editing after saving
    } catch (error) {
      console.error('Invalid JSON format', error);
      alert('Invalid JSON format. Please fix the input.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);  // Stop editing after saving
  };

  const handleDeleteDocumentation = async () => {
    console.log("checkkkkkkkkkkk", user_id, project_id, docId)
    const inputData = { 
        user_id: user_id,
        project_id: project_id,
        docId: docId
     };
    console.log(inputData);
    if (isLoaded && user){
      try {
        const token = await getToken(); 
        const result = await deleteDocumentation(inputData, token);
        console.log(result);
        if (result) {
          console.log('Documentation deleted successfully');
          router.push(`/dashboard/${project_id}`);
        } else {
          console.error('Failed to delete documentation');
        }
      } catch (error) {
        console.error('Error deleting documentation:', error);
      }
    }
    
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the modal when delete button is clicked
  };

  const handleConfirmDelete = async () => {
    // Handle deletion logic here
    console.log("Deleting documentation...");
    // Call the delete logic here (e.g., calling your API);
    await handleDeleteDocumentation();
    setIsModalOpen(false); // Close the modal after confirming
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal when cancel is clicked
  };

  if (!isSignedIn) {
    return(
      <>
        <div>
          <p><span className="text-blue-700 font-semibold"><Link href='/sign-in'>Sign In</Link></span> in to view this page</p>
        </div>
      </>
    )
  }


  return (
    <>
        <div className="p-8 bg-neutral-50 text-black">
            <div className='mb-4 font-semibold text-xl'>
                <h1>{newTitle}</h1>
            </div>
            <div className="flex border-b border-gray-300">
                <button 
                className={`py-2 px-4 ${activeTab === 1 ? 'border-b-2 border-blue-500' : ''}`} 
                onClick={() => setActiveTab(1)}
                >
                Overview
                </button>
                <button 
                className={`py-2 px-4 ${activeTab === 2 ? 'border-b-2 border-blue-500' : ''}`} 
                onClick={() => setActiveTab(2)}
                >
                Edit Project
                </button>
                <button 
                className={`py-2 px-4 ${activeTab === 3 ? 'border-b-2 border-blue-500' : ''}`} 
                onClick={() => setActiveTab(3)}
                >
                Settings
                </button>
            </div>

            <div className="p-6">

              {activeTab === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Title and Description */}
                    <div className="bento-item bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-2">{newTitle}</h2>
                    <p>{newDescription}</p>
                    </div>

                    {/* Number of Visits */}
                    <div className="bento-item bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-2">Number of Visits</h2>
                    <p>2400</p>
                    </div>

                    {/* Total Number of APIs */}
                    <div className="bento-item bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-2">Total Number of APIs</h2>
                    <p>6</p>
                    </div>
                </div>
              )}

              {activeTab === 2 && (
              <div>
                  <h2 className="text-xl font-bold mb-4">Edit Project</h2>
                  <div className="mb-4">
                  <label htmlFor="project_name" className="block">Project Name:</label>
                  <input
                      type="text"
                      id="project_name"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      value={newTitle}
                      disabled={!isEditing}
                      onChange={(e) => setNewTitle(e.target.value)}
                  />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="project_description" className="block">Project Description:</label>
                  <input
                      id="project_description"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      value={newDescription}
                      disabled={!isEditing}
                      onChange={(e) => setNewDescription(e.target.value)}
                  />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="newUrl" className="block">API Documentation URL:</label>
                  <input
                      id="newUrl"
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      value={newUrl}
                      disabled={!isEditing}
                      onChange={(e) => setNewUrl(e.target.value)}
                  />
                  </div>

                  {/* Editable JSON input, output, and OpenAPI schema */}
                  <div className="mb-4">
                  <label htmlFor="newInput" className="block">API Documentation Input (JSON):</label>
                  <textarea
                      id="newInput"
                      className="w-full px-4 py-2 h-96 border border-gray-300 rounded"
                      value={newInput}
                      disabled={!isEditing}
                      onChange={(e) => setNewInput(e.target.value)}
                  />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="newOutput" className="block">API Documentation Output (JSON):</label>
                  <textarea
                      id="newOutput"
                      className="w-full px-4 py-2 h-96 border border-gray-300 rounded"
                      value={newOutput}
                      disabled={!isEditing}
                      onChange={(e) => setNewOutput(e.target.value)}
                  />
                  </div>
                  <div className="mb-4">
                  <label htmlFor="newOpenApiSchema" className="block">API Documentation OpenApiSchema (JSON):</label>
                  <textarea
                      id="newOpenApiSchema"
                      className="w-full px-4 py-2 h-96 border border-gray-300 rounded"
                      value={newApiJson}
                      disabled={!isEditing}
                      onChange={(e) => setNewApiJson(e.target.value)}
                  />
                  </div>

                  <div className="flex justify-between">
                  <button
                      className="bg-blue-500 text-white px-6 py-2 rounded"
                      onClick={() => setIsEditing(true)}
                      disabled={isEditing}
                  >
                      Edit
                  </button>
                  {isEditing && (
                      <button
                      className="bg-green-500 text-white px-6 py-2 rounded"
                      onClick={handleSave}
                      >
                      Save
                      </button>
                  )}
                  {isEditing && (
                      <button
                      className="bg-red-500 text-white px-6 py-2 rounded"
                      onClick={handleCancel}
                      >
                      Cancel
                      </button>
                  )}
                  </div>
              </div>
              )}

              {activeTab === 3 && (
              <div>
                  <h2 className="text-xl font-bold mb-4">Another Tab</h2>
                  <p>Content for the third tab goes here...</p>
                  <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  onClick={() => handleDeleteClick()} // Call the delete function
                  >
                  Delete Project
                  </button>
              </div>
              )}
            </div>
        </div>
        {/* Modal for confirmation */}
        <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
            text="delete"
        />
    </>
  );
}

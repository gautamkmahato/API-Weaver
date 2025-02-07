import ConfirmModal from '@/app/_components/ConfirmModal';
import deleteProject from '@/app/actions/deleteProject';
import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProjectTabs({ projectName, projectDescription, onSave, project_id, user_id }) {
  const [activeTab, setActiveTab] = useState(1);
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const router = useRouter();

  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const handleSave = () => {
    onSave(name, description);  // Call the save function passed from parent
    setIsEditing(false);  // Stop editing after saving
  };

  const handleCancel = () => {
    setIsEditing(false);  // Stop editing after saving
  };

  const handleDeleteProject = async () => {
    const inputData = {
      user_id: user_id,
      project_id: project_id
    }
    console.log(inputData);
    if (isLoaded && user){
      try {
        const token = await getToken();
        const result = await deleteProject(inputData, token);
        if (result) {
          console.log('Project deleted successfully');
          router.push('/dashboard');
        } else {
          console.error('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
    
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the modal when delete button is clicked
  };

  const handleConfirmDelete = async () => {
    // Handle deletion logic here
    console.log("Deleting documentation...");
    // Call the delete logic here (e.g., calling your API)
    await handleDeleteProject();
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
          <div>
            <h2 className="text-xl font-bold mb-4">View Project</h2>
            <div className="mb-4">
              <label className="block">Project Name:</label>
              <p>{name}</p>
            </div>
            <div className="mb-4">
              <label className="block">Project Description:</label>
              <p>{description}</p>
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
                value={name}
                disabled={!isEditing}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="project_description" className="block">Project Description:</label>
              <textarea
                id="project_description"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={description}
                disabled={!isEditing}
                onChange={(e) => setDescription(e.target.value)}
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
                onClick={handleDeleteClick} // Call the delete function
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

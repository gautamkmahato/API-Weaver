'use client'

import ProjectCard from './_components/ProjectCard';
import ModalBox from '../_components/ModalBox';
import Form from './_components/ProjectForm';
import { useEffect, useState } from 'react';
import fetchProjects from '../actions/fetchProjects';
import { useUser } from '@clerk/nextjs';
import { RedirectToSignIn, useAuth } from '@clerk/clerk-react'
import LoadingSpinner from '../_components/LoadingSpinner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  

  // Ensure user is loaded before accessing user.id
  useEffect(() => {
    if (isLoaded && user) {
      async function getAllProjects() {
        setLoading(true);
        try {
          console.log(user.id);
          const token = await getToken(); 
          console.log(token)
          const result = await fetchProjects(user?.id, token);  // Now it's safe to access user.id
          console.log(result)
          if (result) {
            setProjects(result);
          } else {
            setErrorMessage('Error in fetching Projects');
          }
        } catch (error) {
          setErrorMessage(`Error: ${error.message}`);
        } finally {
          setLoading(false);
        }
      }
      getAllProjects();
    }
  }, [getToken, isLoaded, user]);  // Re-run when user or isLoaded changes

  // Function to refresh the projects list
  const refreshProjects = async () => {
    if (!isLoaded || !user) return;  // Check if user data is loaded

    setLoading(true);
    try {
      const token = await getToken();
      const result = await fetchProjects(user?.id, token);
      if (result) {
        setProjects(result);
      } else {
        setErrorMessage('Error in fetching Projects');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return(
      <>
        <LoadingSpinner />
      </>
    );
  }

  if (!isSignedIn) { 
    return(
      <>
        <RedirectToSignIn />
      </>
    ) 
  }

  return (
    <div className="p-8 bg-gray-50 text-black">
      {errorMessage && <h1>{errorMessage}</h1>}
      <div className="flex justify-between items-center px-8">
        <h1 className="text-2xl font-medium">Projects</h1>
        <ModalBox
          name="New Project"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)} // Toggle modal state
        >
          <Form
            onFormSubmit={() => {
              setIsModalOpen(false); // Close the modal
              refreshProjects(); // Refresh the projects list
            }} 
            userId={user.id}
          />
        </ModalBox>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {projects && projects.map((project, index) => (
            <div key={index}>
                <ProjectCard
                  title={project.project_name}
                  description={project.description}
                  created_at={project.created_at}
                  project_id={project.project_id}
                  user_id={user.id}
                  refreshProjects={refreshProjects}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client'

import { useEffect, useState } from 'react';
import ProjectTabs from '../../_components/ProjectTabs';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation'; 
import fetchProjectById from '@/app/actions/fetchProjectById';
import updateProject from '@/app/actions/updateProject';
import Link from 'next/link';
import LoadingSpinner from '@/app/_components/LoadingSpinner';

export default function ProjectUpdatePage() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);  // To handle loading state

  const { isSignedIn, user, isLoaded } = useUser();
  const params = useParams();
  const project_id = params.id;

  // Fetch project details
  useEffect(() => {
    async function getProject() {
      setLoading(true);  // Set loading state to true before fetching
      try {
        const result = await fetchProjectById(user?.id, project_id);

        if (result && result.project_name) {
          setProjectName(result.project_name);
          setProjectDescription(result.description);
        } else {
          setErrorMessage('Project not found.');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setErrorMessage('Failed to fetch project. Please try again.');
      } finally {
        setLoading(false);  // Set loading state to false after fetching is done
      }
    }
    if (user?.id && project_id) {
      getProject();
    }
  }, [user?.id, project_id]);

  // Save function to update project name and description
  const handleSave = async (newName, newDescription) => {
    setLoading(true);  // Start loading when saving

    const inputData = {
      user_id: user?.id,
      project_id: project_id,
      project_name: newName,
      description: newDescription
    };

    try {
      const result = await updateProject(inputData);
      
      if (result) {
        // Assuming the result has a success field to check if the update was successful
        setProjectName(newName);
        setProjectDescription(newDescription);
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
      <ProjectTabs
        projectName={projectName}
        projectDescription={projectDescription}
        project_id={project_id}
        user_id={user?.id}
        onSave={handleSave}
      />
    </div>
  );
}

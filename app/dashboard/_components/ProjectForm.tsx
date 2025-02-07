'use client';

import { useState } from 'react';
import createNewProject from '@/app/actions/createNewProject';
import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function Form({ onFormSubmit, userId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { isSignedIn, isLoaded } = useUser(); 
  const { getToken } = useAuth();

  const handleFormSubmit = async (e) => { 
    e.preventDefault();
    const inputData = {
      project_name: name,
      description: description,
      userId: userId,
    };

    if (isLoaded && userId){
      try {
        const token = await getToken();
        const result = await createNewProject(inputData, token);
        if (result) {
          onFormSubmit(); // Close the modal and refresh the projects list
        } else {
          console.error('Error creating project');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    
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
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-2xl">
          Create New Project
        </h1>
        <form onSubmit={handleFormSubmit} className="mb-0 space-y-4 rounded-lg sm:p-6 lg:px-0 lg:py-4">
          <div>
            <label htmlFor="text" className="sr-only">
              Project Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Project Name"
                required
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Description"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
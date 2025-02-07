'use client';

import DocumentationCard from '../_components/DocumentationCard'
import ModalBox from '../../_components/ModalBox'
import DocumentationForm from '../_components/DocumentationForm'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import fetchDocumentationByProjectId from '../../actions/fetchDocumentationByProjectId'
import { useAuth, useUser } from '@clerk/nextjs';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import Link from 'next/link';

export default function ApiDocumentation() {
    const [apiDocumentations, setApiDocumentations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState('');

    const { isSignedIn, user, isLoaded } = useUser(); // Get both user and isLoaded status
    const { getToken } = useAuth();

    const params = useParams<{ project_id: string }>();
    console.log(params);

    // Run the effect only when the user is loaded
    useEffect(() => {
        if (!isLoaded || !user) return; // Don't proceed until user data is fully loaded

        async function getApiDocumentation() {
            setLoading(true);
            console.log(params.id);
            const token = await getToken();
            const result = await fetchDocumentationByProjectId(params.id, user?.id, token);
            console.log(result);
            if (result.success) {
                setApiDocumentations(result.data);
                if(result.data.length == 0){
                    setMessage('No API Documentation');
                    toast.info('No API Documentation available for this project.'); // Display info toast if no data
                }
            } else {
                setErrorMessage(result.message || 'Error in fetching Projects');
                toast.error(result.message || 'Error in fetching Projects'); // Display error toast if something goes wrong
            }
            setLoading(false);
        }

        getApiDocumentation();
    }, [params.id, user, isLoaded, getToken]); // Dependencies: reload the effect if user or project_id changes

    useEffect(() => {
        toast.info('This is a test toast!');
    }, []);
    
    // Function to refresh the documentation list
    const refreshProjects = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const result = await fetchDocumentationByProjectId(params.id, user?.id, token);
            if (result.success) {
                setApiDocumentations(result.data);
            } else {
                setErrorMessage(result.error || 'Error in fetching Projects');
                toast.error(result.error || 'Error in fetching Projects'); // Display error toast if fetching fails
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
            toast.error(`Error: ${error.message}`); // Display error toast if an exception is thrown
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <h1>Loading...</h1>
        );
    }

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
            <div className='p-8'>
            {errorMessage && <h1>{errorMessage}</h1>}
            <div className="flex justify-between items-center px-8">
                <h1 className="text-2xl font-medium">API Documentations</h1>
                <ModalBox
                    name="New Project"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(!isModalOpen)} // Toggle modal state
                >
                    <DocumentationForm
                        onFormSubmit={() => {
                            setIsModalOpen(false); // Close the modal
                            refreshProjects(); // Refresh the projects list
                        }}
                        project_id={params.id}
                    />
                </ModalBox>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {apiDocumentations.length === 0 ? 
                        <div>
                            <h1>No API Documentation</h1>
                        </div> : apiDocumentations && apiDocumentations.map((documentation, index) => (
                        <div key={index}>
                            <DocumentationCard id={params.id} docId={documentation.api_id} title={documentation.title} description={documentation.description} />
                        </div>
                    ))}
                </div>
            </div>
            </div>
            {/* Toast Container to display toasts */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    
        </>
    );
}

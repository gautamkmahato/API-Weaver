'use client'

import fetchJsonData from '@/app/actions/fetchJsonData';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react';
import UploadSchema from '@/app/dashboard/_components/UploadSchema';
import Test from '@/app/_components/Test';
import Link from 'next/link';
import { RedirectToSignIn, useAuth, useUser } from '@clerk/nextjs';
import LoadingSpinner from '@/app/_components/LoadingSpinner';

 
export default function DocumentationPage() {

    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [apiData, setApiData] = useState('');

    const params = useParams();
    const docId = params.docId;
    const project_id = params.id;
    console.log(params);

    const { isSignedIn, user, isLoaded } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        if (isLoaded && user){
            async function checkJsonData() {
                // call the fetchJsonData function to check if the docId has jsonData or not
                setLoading(true);
                const token = await getToken(); 
                const jsonData = await fetchJsonData(docId, project_id, user?.id, token);
                if(jsonData[0].openapi_schema){
                    setCheckDocIdStatus(true); 
                    setLoading(false);
                    setApiData(jsonData[0].openapi_schema);
                } else{
                    setErrorMessage(`Please upload the JSON data:`)
                    setLoading(false);
    
                }
            }
            checkJsonData();
        }
        
    }, [docId, getToken, isLoaded, project_id, user]);

    if(loading){
        return(
            <>
                <LoadingSpinner />
            </>
        )
    }

    if (!isLoaded || !isSignedIn || !user) { 
        return(
            <>
                <div>
                    <p><span className="text-blue-700 font-semibold"><Link href='/sign-in'>Sign In</Link></span> in to view this page</p>
                </div>
            </>
        )
    }

    if (!isSignedIn) { 
        return(
          <>
            <RedirectToSignIn />
          </>
        ) 
    }

    return (
        <> 
            {errorMessage && <h1>{errorMessage}</h1>}
            {checkDocIdStatus ? <>
                <div className='bg-neutral-50'> 
                    {/* Base */}
                    <div className="flex justify-end mr-12 pt-8">
                        <Link
                            className="inline-block rounded border border-orange-600 bg-buttonBackground px-12 py-3 text-sm font-medium text-white hover:bg-orange-600 hover:text-white focus:outline-none focus:ring active:text-orange-500"
                            href={`/documentation/${project_id}/${docId}`} target='_blank'
                            
                        >
                            Open in New Window
                        </Link>
                    </div>
                    <Test apiData={apiData} docId={docId} />
                </div>

            </> : 
                <>
                    <UploadSchema docId={docId} project_id={project_id} /> 
                </>
            }
        </>
    )
}

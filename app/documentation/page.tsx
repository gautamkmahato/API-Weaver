'use client'

import Test from '@/app/_components/Test';
import fetchJsonData from '@/app/actions/fetchJsonData';
import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NewWindowDocumentationPage() {
    const [checkDocIdStatus, setCheckDocIdStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [apiData, setApiData] = useState('');

    const { isSignedIn, user, isLoaded } = useUser();
    const { getToken } = useAuth();


    useEffect(() => {

        if (isLoaded && user) {
            async function getJsonData() {
                // Call the fetchJsonData function to check if the docId has jsonData or not
                setLoading(true);
                const token = await getToken();
                const jsonData = await fetchJsonData("19", "31", user?.id, token);
                console.log(jsonData);
                if (jsonData[0].openapi_schema) {
                    setCheckDocIdStatus(true);
                    setLoading(false);
                    setApiData(jsonData[0].openapi_schema);
                } else {
                    setErrorMessage(`Please upload the JSON data:`);
                    setLoading(false);
                }
            }
            getJsonData();
        }
    }, [ getToken, isLoaded, user]); // Add router.isReady to dependencies

    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        );
    }

    if (!isLoaded || !isSignedIn || !user) {
        return (
            <>
                <div>
                    <p>
                        <span className="text-blue-700 font-semibold">
                            <Link href='/sign-in'>Sign In</Link>
                        </span> to view this page
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            {errorMessage && <h1>{errorMessage}</h1>}
            {checkDocIdStatus ? (
                <Test apiData={apiData} docId={docId} />
            ) : (
                <>
                    <h1>No Data available</h1>
                </>
            )}
        </>
    );
}
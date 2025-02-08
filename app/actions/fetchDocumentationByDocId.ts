'use server'

export default async function fetchDocumentationByDocId(docid, projectId, userId, token){
    const inputData = {
        project_id: projectId, 
        userId: userId 
    }
    const response = await fetch(`http://localhost:8000/api/v1/documentation/${docid}/test`, {
        method: 'POST',
        headers: { 
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        }, 
        body: JSON.stringify(inputData)
    });

    const result = await response.json();

    if(!response.ok){
        return {
            message: "Error in fetching Request in fetchDocumentationByDocId"
        }
    }
    return result;
}
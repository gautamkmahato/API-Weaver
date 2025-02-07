'use server'

export default async function fetchDocumentationByProjectId(projectId, userId, token){
    console.log("projectId, userId: ", projectId, userId);

    const inputData = {
        userId: userId
    }
    
    const response = await fetch(`http://localhost:8000/api/v1/documentations/${projectId}/test`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
        body: JSON.stringify(inputData)
    });

    const result = await response.json();

    console.log(result)

    if(!response.ok){
        return {
            error: "Error in fetching Request in fetchDocumentationByProjectId",
            message: "Project not found",
            success: false
        }
    }
    return result;
}
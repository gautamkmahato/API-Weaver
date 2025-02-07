 
'use server'

export default async function fetchProjectById(userId: unknown, projectId: unknown){
    const inputData = {
        userId: userId
    }
    const response = await fetch(`http://localhost:8000/api/v1/project/${projectId}/test`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in fetching Request in Project by projectId"
        }
    }
    return result;
}
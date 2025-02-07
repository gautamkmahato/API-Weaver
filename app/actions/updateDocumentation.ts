'use server'

export default async function updateDocumentation(inputData: unknown){
    
    const response = await fetch('http:localhost:8000/api/v1/documentation/update/test', {
        method: 'PUT',
        headers: { 
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in Updating API Documentation"
        }
    }
    return result;
}
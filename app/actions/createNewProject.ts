'use server'

export default async function createNewProject(inputData: unknown, token){
    const response = await fetch('http:localhost:8000/api/v1/projects/add/test', {
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
            message: "Error in Inserting Data in createNewProject"
        }
    }
    return result;
}
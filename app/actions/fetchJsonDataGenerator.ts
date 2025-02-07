'use server'

export default async function fetchJsonDataGenerator(docId: string){
    const inputData = {
        userId: userId,
        project_id: project_id
    }

    const response = await fetch(`http://localhost:8000/api/v1/documentation/${docId}/schema/test`, {
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
            message: "Error in fetching Request in fetchJsonData"
        }
    }
    return result;
}
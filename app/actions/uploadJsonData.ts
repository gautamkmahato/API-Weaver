'use server'

export default async function uploadJsonData(apiData: unknown, apiJson, docId, project_id, userId, token){
    console.log(apiData);
    const inputData = {
        apiData: apiData,
        apiJson: apiJson,
        project_id: project_id,
        userId: userId
    }
    const response = await fetch(`http://localhost:8000/api/v1/documentations/${docId}/add/schema/test`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 
    console.log("uploadJsonData", result)

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewProject"
        }
    }
    return result;
}
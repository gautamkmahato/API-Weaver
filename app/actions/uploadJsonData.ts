'use server'

export default async function uploadJsonData(apiData: unknown, docId){
    console.log(apiData)
    const response = await fetch(`http://localhost:8000/api/v1/documentations/${docId}/add/schema/test`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(apiData)
    });
    const result = await response.json(); 

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewProject"
        }
    }
    return result;
}
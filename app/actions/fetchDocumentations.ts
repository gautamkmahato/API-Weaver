'use server'

export default async function fetchDocumentations(){
    const response = await fetch('http://localhost:8000/api/v1/documentations/test');
    const result = await response.json();

    if(!response.ok){
        return {
            message: "Error in fetching Request in getAllDocumentations"
        }
    }
    return result;
}
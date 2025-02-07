'use server'

export default async function convertToOpenApiSchema(inputData: unknown){
    const response = await fetch('http://localhost:8000/convert/openapi/test', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    const result = await response.json(); 
    console.log(result)

    if(!response.ok){
        return {
            message: "Error in Inserting Data in createNewDocumentation"
        }
    }
    return result;
}
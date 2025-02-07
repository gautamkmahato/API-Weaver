'use server'

export default async function deleteDocumentation(inputData: unknown, token){
    const response = await fetch('http://localhost:8000/api/test', {
        method: 'POST',
        headers: { 
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include the token in Authorization header
        },
        body: JSON.stringify(inputData), 
      });
      
      const result = await response.json();
      
      // Check the response status code
      if (!response.ok) {
        console.error('Delete request failed:', result); // Log the error response
        return {
          message: result?.error || 'Error in Deleting API Documentation',
        };
      }
      
      console.log('Delete result:', result); // Success log
      return result;
      
}
export const deleteData = async(data,url) =>{

    if(!data){
        return;
    }
    try {
        const response = await fetch(url, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
    
        const responseData = await response.json();
        console.log('Success:', responseData);
        return responseData;
    
      } catch (error) {
        console.error('Error:', error);
      }
    
    } 
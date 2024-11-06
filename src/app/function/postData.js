export const postData = async(data,url,headerData) =>{

    if(!data){
        return;
    }
     let header = 'application/json';
     if(headerData) header = headerData
    try {
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': {header},
            
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
    
        const responseData = await response.json();
        console.log('Success:', responseData);
        return responseData
    
      } catch (error) {
        console.error('Error:', error);
      }
    
    } 
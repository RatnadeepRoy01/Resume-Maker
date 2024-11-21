export const postData = async(data,url) =>{

    if(!data){
        return;
    }
    
    try {
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type':'application/json',
            
          },
          body: JSON.stringify(data),
        });
    
        
    
        const responseData = await response.json();
        console.log('Success:', responseData);
        return responseData
    
      } catch (error) {
        console.error('Error:', error);
      }
    
    } 
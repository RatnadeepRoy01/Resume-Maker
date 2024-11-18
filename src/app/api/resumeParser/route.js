import { NextResponse } from "next/server";
import { postData } from "@/app/function/postData";
import { getUserData } from "@/app/function/matching";

export async function POST(request) {   

    if(request.headers.get("content-type").includes("multipart/form-data")){         
       
      console.log("inside1")
      
      const data=await request.formData();
      console.log(data)
      console.log(data.get("file"))

    try {

        const response = await fetch(process.env.RESUME_PARSER,{

          method:"POST",
          body:data
          }); 
       
        if(!response.ok){
          throw new Error(`Error: ${response.status}`);
        }
        const response1 = await response.json();  
        console.log(response1,"response")
        return NextResponse.json(response1,{status:200})
        
      
      } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({state:"Failed"},{status:504})
      }
    }else{
         
       
        const data=await request.json();
        console.log("inside server", data)
        try {
          const url = `${process.env.LINKEDIN_PARSER}=${encodeURIComponent(data.urlData)}`;

          const response = await fetch(url, {
            method:"GET",
              headers: {
             'Authorization': `Bearer ${process.env.LINKEDIN_BEARER_TOKEN}`
              }
            });
          if(response.ok){

            const responseJSON = await response.json()
            
            const responseData = await getUserData(responseJSON,"linkedin")
            return NextResponse.json(responseData,{status:200})
          }
          console.log(response)
          return NextResponse.json({state:"Failed"},{status:500})
        } catch (error) {
         return NextResponse.json({ message: 'Failed to fetch LinkedIn data', error: error.message } , {status:200});
        }

    }
  } 
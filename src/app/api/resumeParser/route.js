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
        const response = await fetch(process.env.RESUME_PARSER, {
            method: "POST",
            body: data,
        });
    
        console.log("Response Status:", response);
    
        if (response.ok) { 
            const response1 = await response.json();
            console.log("Parsed Response:", response1);
            return NextResponse.json(response1, { status: 200 });
        } else {
           
            const errorData = await response.json();
            console.log("Error Response Data:",response.status);
            return NextResponse.json({ status1: response.status }, { status:response.status});
        }
    } catch (err) {
        
        console.error("Fetch Error:", err);
        return NextResponse.json({ status1: 500 }, { status:500 });
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
            console.log("Data",response)
          if(response.ok){

            const responseJSON = await response.json()
            
            const responseData = await getUserData(responseJSON,"linkedin")
            return NextResponse.json(responseData,{status:200},{state:"success"})
          }
          
          return NextResponse.json({state:"Failed"},{status:500})
        } catch (error) {
          console.log("Error",error)
         return NextResponse.json({ message: 'Failed to fetch LinkedIn data', error: error.message } , {status:500});
        }

    }
  } 
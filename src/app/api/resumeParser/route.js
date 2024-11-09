import { NextResponse } from "next/server";
import { postData } from "@/app/function/postData";
import { getUserData } from "@/app/function/matching";

export async function POST(request) {   

    if(request.headers.get("content-type").includes("multipart/form-data")){         
       
      const data=await request.formData();
      console.log(data.get("file"))

    try {

        const response = await postData("http://parser.api.mybizzz.com/upload",data); 
       
        if(response.status == 200){
        return NextResponse.json(response,{status:200})
        }
        else
        return NextResponse.json({state:"Failed"},{status:404})

      } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({state:"Failed"},{status:404})
      }
    }else{
         
       
        const data=await request.json();
        console.log("inside server", data)
        try {
          const url = `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(data.urlData)}`;

          const response = await fetch(url, {
            method:"GET",
              headers: {
             'Authorization': `Bearer FNEfptqVbGd1-B-CkjXEFA`
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
import { NextResponse } from "next/server";


export async function POST(request) {

    const data=await request.formData();

    console.log(data.get("file"))
    try {
        const response = await fetch("http://parser.api.mybizzz.com/upload", {
          method: 'POST', 
          body:data,
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error:",errorText)
          return NextResponse.json({errorText},{status:404})
        }
       const response1 = await response.json();
       console.log(response1)
        
       return NextResponse.json(response1,{status:200})
    
      } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({state:"Failed"},{status:404})
      }
    
    } 
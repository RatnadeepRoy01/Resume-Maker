import { getCollection } from "@/app/function/Mongodb";
import { NextResponse } from "next/server";
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request){

   
    let data = await request.json();
    let collection;

    if(data.URL.includes("User"))
     collection = await getCollection("General");
    else
     collection = await getCollection("UserProfile")
     
         
    const result = await collection.findOne(
        {
          "resumeArray.resumeURL": data.URL
        },
        {
          projection: {
            "resumeArray": { $elemMatch: { resumeURL: data.URL } }
          }
        }
      );
           
      const parsedUrl = new URL(result?.resumeArray[0].origURL);
      const path = parsedUrl.pathname; 
      const key = path.split("/").slice(2).join("/");
    
      console.log(result?.resumeArray[0].origURL)

      if(!result){
        return NextResponse.json( {state:"Failed" , message:"NO resume at this URL" } , { status:404 } )
      }

      if( result?.resumeArray[0].resumaPASS == data.password ){

        return NextResponse.json({origURL:result?.resumeArray[0].origURL , state:"success"} , { status:200 } )
      }
      else{
        return NextResponse.json( {state:"Failed" , message:"Invalid Password" } , { status:401 } )
      }
      
}
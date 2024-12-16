import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
      return NextResponse.json({ error: "Missing fileName or fileType" }, { status: 400 });
    }
    console.log(fileName , fileType)
    const randomNum = Math.floor(1000 + Math.random() * 9000) ;
    let key = fileName + randomNum

  
    if(body?.dataID){
        
      key = body.dataID
     
    } 

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `resume/${key}`,
      ContentType: fileType,
    });
 
    const uploadUrl = await getSignedUrl(s3Client, command,{expiresIn:900 } );
   console.log({uploadUrl})

    const viewUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/resume/${key}`;
  
    return NextResponse.json({ uploadUrl, viewUrl });
  } catch (error) {
    console.error("Error generating pre-signed URL", error);
    return NextResponse.json({ error: "Could not generate URL" }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "POST",
    },
  });
}

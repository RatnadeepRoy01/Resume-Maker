import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";

export async function POST(request){

    const data = await request.json();
    const collection = await getCollection("userData");

  
     if(data.keyId ){

    try{
        
        const response =  await collection.findOne({key:data.keyId});
        return NextResponse.json(response,{status:200})
       
    }catch(err){

        console.log(err)
        return NextResponse.json({state:"failed"},{status:500})

    }

     }
     else if(data.updateData){

        const response =  await collection.replaceOne({key:data.updateData} , data.data);
        
        return NextResponse.json({state:"success"},{status:200});

     }
     else{

    try{
    
    await collection.insertOne(data);
    return NextResponse.json({state:"success"},{status:200});
    
     }catch(err){

        console.log(err)
        return NextResponse.json({state:"failed"},{status:500})
    
    }

    }
}
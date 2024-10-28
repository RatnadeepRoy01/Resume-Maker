import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";
export async function POST(request){

    const data = await request.json();
    const collection = await getCollection("userCssData");
    const collection1 = await getCollection("userData");

   if(data.id){

    const response =  await collection.replaceOne({key:data.id} , data.savingData);
        
    return NextResponse.json({state:"success"},{status:200});


   }else{

    try{
    
    const response = await collection.insertOne(data.savingData);
    console.log(response,"1111111111111")
    const status = await collection1.findOneAndUpdate({key:data.savingData.key},{$set:{ reference:response.insertedId }})
    if(status)
    return NextResponse.json({state:"success"},{status:200});
    else
    return NextResponse.json({state:"error"},{status:404});
    

   }catch(err){

        console.log(err)
        return NextResponse.json({state:"failed"},{status:500})
    
    }
  }
}
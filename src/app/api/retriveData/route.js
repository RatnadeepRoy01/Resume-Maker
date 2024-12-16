import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";

export async function POST(request){

    const req = await request.json();
    let collection;

    console.log("CALLED")

    if(req.type == "Data")
        collection = await getCollection("userData");
    else
      collection = await getCollection("userCssData")
 
    try{

         const response = await collection.find( {profileID:req.session.user.id} , {projection:{key:1}} ).toArray();
         console.log({response})
         return NextResponse.json(response,{status:200})
         
    }catch(err){
        console.log(err)
        return NextResponse.json({state:"Failed"},{status:500})
    }
}
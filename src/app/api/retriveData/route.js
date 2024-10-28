import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";

export async function GET(request){
 
    try{
         const collection = await getCollection("userData");
         const response = await collection.find( {} , {projection:{key:1}} ).toArray();
         return NextResponse.json(response,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json({state:"Failed"},{status:500})
    }
}
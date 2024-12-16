import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";

export async function POST (request){

    let data = await request.json();
    const User = await getCollection("UserProfile");

    try{
        
       console.log({data})
        const Userdata = await User.findOne(
            {
              "resumeArray.uniqueID": data.uniqueID
            },
            {
              projection: {
                "resumeArray": { $elemMatch: { uniqueID: data.uniqueID } }
              }
            }
          );

        if(Userdata){

          console.log("FOUND:-",Userdata)
        const name = Userdata.resumeArray[0].origURL.split("/").pop();
        return NextResponse.json({state:"same" , text:name , resumeURL:Userdata.resumeArray[0].resumeURL })

        }else{
            return NextResponse.json({state:"unique" , resumeURL:false})
 
        }
    }catch(err){
        console.log("Error:-",err)
        return NextResponse.json({state:"unique" , resumeURL:false})
    }

}
import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";
import { ObjectId } from "mongodb";


export async function POST(request){

    const data = await request.json();
    const collection = await getCollection("UserProfile");
    console.log(data)

    const user = await collection.findOne({ _id: new ObjectId(data.session.user.id) });
    console.log("User:-",user)
    if( user ){

        const proxyURL = data.formData.text + Math.floor(1000 + Math.random() * 9000) ;

        try{

        
            const result = await collection.updateOne(
                { _id: new ObjectId(data.session.user.id) },
                {
                  $push: {
                    resumeArray: { 
                      origURL: data.viewUrl, 
                      resumeURL: proxyURL, 
                      resumaPASS: data.formData.password,
                    }
                  }
                },
                { upsert: true }
              );
              
         return NextResponse.json({ state:"success" , text:proxyURL } , { status:200 } ) 

        }catch(err){
            console.log("Error:-",err);
            throw new Error(err)
        }
    }else{

        return NextResponse.json( {message:"Internal server Error"} , {status:500} )
    }
}
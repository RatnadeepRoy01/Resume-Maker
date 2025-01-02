import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";
import { ObjectId } from "mongodb";


export async function POST(request){

    const data = await request.json();
   
    let proxyURL = data.formData.text +"_User"+ Math.floor(1000 + Math.random() * 9000) ;
    console.log(data)

    if(data.session != "undefined"){

    const collection = await getCollection("UserProfile");
    const user = await collection.findOne({ _id: new ObjectId(data.session.user.id) });
    console.log("User:-",user)
    if( user ){

    

    if (data.resumeURL ) {
      
      proxyURL = data.resumeURL
      const result = await collection.updateOne(
        { email:data.session.user.email },
        { $pull: { resumeArray: { uniqueID:data.uniqueID } } }
    );
      console.log('Delete result:', result);

    }
        try{

        
            const result = await collection.updateOne(
                { _id: new ObjectId(data.session.user.id) },
                {
                  $push: {
                    resumeArray: { 
                      origURL: data.viewUrl, 
                      resumeURL: proxyURL, 
                      resumaPASS: data.formData.password,
                      uniqueID: data.uniqueID
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
        return NextResponse.json({ state:"Failed"} , { status:500 } ) 

      }
      
    }else{

      const collection1 = await getCollection("General");
      const result = await collection1.updateOne(
      
        { _id: new ObjectId("66d4c7f3806721e4984b3125") },
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
     
    }
}
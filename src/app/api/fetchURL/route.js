import { NextResponse } from "next/server";
import { getCollection } from "@/app/function/Mongodb";


export async function POST (request){

   console.log("inside")
     let data = await request.json();
     const User = await getCollection("UserProfile");
     console.log("data:-",data)

     try{

        let Userdata = await User.findOne({ email: data.session.user.email });
        console.log(Userdata)
        return NextResponse.json(Userdata,{status:200})


     }catch(err){
        throw new Error("Error:-",err)
     }

}
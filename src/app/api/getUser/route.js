import { getCollection } from "@/app/function/Mongodb";
import { NextResponse } from "next/server";

export async function POST(request){

    console.log("inside the server")
    let credentials = await request.json();
    const User = await getCollection("UserProfile");
    
    let Userdata = await User.findOne({email:credentials.email})
    console.log(Userdata,"userdata")


if(credentials.image ){

  if(!Userdata){

  try{
  
  let userInsert =  await User.insertOne({
    email: credentials.email,
    password: "", 
    image: credentials.image,
  });
  return NextResponse.json({state:"success"} , { Userdata:userInsert} , { status:200 })

}catch(err){

  console.log(err);
  return NextResponse.json({state:"failed"} , { status:500 })

}

}else{

  return NextResponse.json({state:"success"} , Userdata , { status:200 })

}
   
}
else{
  
  if(!Userdata && credentials.type == "signin"){

   const data = await User.insertOne({
    email: credentials.email,
    password: credentials.password, // Hash this password before saving
  });

  const Userdata = { _id:data.insertedId , email:credentials.email }
  return NextResponse.json(  Userdata  , { status:200 })
 
  }else if( Userdata && credentials.type == "login" ){

    const isPasswordValid = Userdata.password === credentials.password; 
    if (!isPasswordValid) {

      return NextResponse.json({state:"Invalid Password"} , { status:401 })
    }
    return NextResponse.json(Userdata , { status:200 })

  }
  else if(Userdata && credentials.type == "signin"){

    return NextResponse.json({state:"User already exist"} , { status:404 })

  }
  else{

    return NextResponse.json({state:"No entry found"} , { status:404 })

  }
}
}
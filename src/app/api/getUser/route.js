import { getCollection } from "@/app/function/Mongodb";
import { NextResponse } from "next/server";

export async function POST(request){

    console.log("inside the server")
    let credentials = await request.json();
    const User = await getCollection("UserProfile");
    
    let Userdata = await User.findOne({email:credentials.email})
    console.log(Userdata,"userdata")

if(credentials.image ){

  try{
   if(!Userdata){

  await User.insertOne({
    email: credentials.email,
    password: "", 
    image: credentials.image,
  });
}
  return NextResponse.json({state:"success"} , { status:200 })
}catch(err){

  console.log(err);
  return NextResponse.json({state:"failed"} , { status:500 })

}
   
}
else{
  if (!Userdata) {
  // If user does not exist, create a new user
   const data = await User.insertOne({
    email: credentials.email,
    password: credentials.password, // Hash this password before saving
  });

  const userData = { id:data.insertedId , email:credentials.email }
  return NextResponse.json( userData , { status:200 })
 
} else {
  // User exists, verify password (should be hashed)
  const isPasswordValid = Userdata.password === credentials.password; // Replace with proper hash check
  if (!isPasswordValid) {
    return NextResponse.json({state:"Invalid Password"} , { status:404 })
  }
  return NextResponse.json(Userdata , { status:200 })
}

}
}
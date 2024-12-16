"use client";

import React, { useCallback, useEffect, useState } from "react";
import { set , keys } from "idb-keyval";
import { useRouter } from "next/navigation";
import { postData } from "../../function/postData";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Footer from "@/components/footer";

const Page = () => {
  const [templatesData1, setTemplatesData] = useState([]);
  const[sessionData , setSessionData] = useState( { user :{email:"" , id: ""} })
  const Router = useRouter();

  const { data: session } = useSession({
    required: true,
    refetchInterval:false,
    refetchOnWindowFocus: false,
    onUnauthenticated() {
      Router.push("/TwoStepSignin")
    }
  });

  useEffect(()=>{ 
  if( session?.user?.email && ( session?.user?.email != sessionData.user.email ) )
  {
    console.log("working:-",session.user.id)
     setSessionData( { user:{email:session?.user?.email ,id:session?.user?.id }} ) }
  },[session , sessionData])
  
  

  useEffect(() => {

    
    if (typeof window !== "undefined" && sessionData?.user?.email ) {
      console.log("working2:-",sessionData.user.email)

      let allKeys = [] ;
      let allKeysCss = [];
      
      
      const fetchData = async () => {

        console.log("111111111111")
         const tempKeys = await keys();

         allKeys = tempKeys.filter((key)=>{

          return !key.includes("Css");
          
         })
        
        const fetchedTemplates = [];

        const url ="../api/fetchURL"
        let template;

        const resumeURL = await postData({session:sessionData},url)
        console.log({resumeURL})

        for (let i = 0; i < allKeys.length; i++) {
         
          if(resumeURL?.resumeArray[i]?.uniqueID){
          const key = resumeURL?.resumeArray[i]?.uniqueID;
          template = key.split("@")[0];   
          fetchedTemplates.push({ template , key , ProxyURL:resumeURL.resumeArray[i].origURL });
             
        } 
        setTemplatesData(fetchedTemplates);
        }
     };

      fetchData();

      const getMissingData=async()=>{


      const url="../api/retriveData"

        const response = await postData({ session:sessionData , type:"Data"},url)
        if(response.length >= allKeys.length) 
        {
        response.map( async(element) => {
           
          console.log(element);

             if(!allKeys.includes(element.key)){

              console.log("geeting element")
                  const url="../api/insertData"
                 const response = await postData({keyId:element.key},url)
                 if(response.personalInfo){
                   
                     await set(element.key,response)

                 }

             }

            })};


            const tempKeys = await keys();
            allKeysCss = tempKeys.filter((key)=>{

              return key.includes("Css");
              
             })
 
             
            const response1 = await postData({session:sessionData , type:"css"},url)
            if(response1.length == allKeysCss.length) return;
            else {
            response1.map( async(element) => {
               
              console.log(element);
    
                 if(!allKeys.includes(`${element.key}Css`)){
    
                  console.log("geeting element")
                      const url="../api/insertData"
                     const response = await postData({keyId:element.key , type:"css" },url)
                     if(response.format){
                       
                         await set(`${element.key}Css`,response)
                         
                       
                     }
    
                 }
    
                })};




            console.log("doneeeeeee")
          }

          
          getMissingData();
  
    }
  }, [sessionData]);


  return (
    <div >
      <div className="mt-16 md:px-20 px-8">
      <p className="font-bold text-4xl text-gray-800 leading-tight">
    Your Collection Of Professional Resume 
  </p>
  <p className="text-lg mt-4 text-gray-500 max-w-lg my-4 ">
  Choose from your professionally designed templates to update or view your resume with ease and creativity.
  </p>
  </div>
    <div className='flex md:flex-wrap flex-col md:grid md:grid-cols-3 md:space-x-6 min-w-screen md:px-20 px-8'>
      { templatesData1.map((data, index) => {
            return (  
          <div key={index}> 
          <div onClick={()=>{ Router.push(`./ResumaForm?id=${data.key}&template=${data.template}`) }}>
          <Image 
           src={data.ProxyURL} 
           alt="Description of the image" 
           width={500}
           height={500}
           className=" w-[400px] h-[500px] rounded-lg shadow-lg mx-2 my-6 hover:cursor-pointer" 
          />
          </div> 
          </div> 
       )})}       
    </div>
    <div ><Footer/></div>
    </div>
  );
};

export default Page;


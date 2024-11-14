"use client";

import React, { useEffect, useState } from "react";
import { get, set , keys } from "idb-keyval";
import { useRouter } from "next/navigation";
import { getData } from "../function/getData";
import { postData } from "../function/postData";

import Template1 from "../Templates/Template1/template1";
import Template2 from "../Templates/Template2/template2"
import Template3 from "../Templates/Template3/template3"

const Page = () => {
  const [templatesData1, setTemplatesData] = useState([]); // State to hold fetched templates and data
  const Router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {

      let allKeys = [] ;

      const fetchData = async () => {

        console.log("111111111111")
         const tempKeys = await keys();

         allKeys = tempKeys.filter((key)=>{

          return !key.includes("Css");
          
         })
         console.log(allKeys,"1111111111111111111111111113344")
        const fetchedTemplates = [];

        for (let i = 0; i < allKeys.length; i++) {
          const key = allKeys[i];

          const template = key.split("@")[0];

        
          const savedData = await get(key);

          
          fetchedTemplates.push({ template , savedData ,key});
        
        
        } 
        setTemplatesData(fetchedTemplates);
     };
      fetchData();

      const getMissingData=async()=>{


      const url="../api/retriveData"
        const response = await getData(url)
       console.log(response,"responseeeeeeeeeee")
        if(response.length >= allKeys.length) return;
        response.map( async(element) => {
           
          console.log(element);

             if(!allKeys.includes(element.key)){

              console.log("geeting element")
                  const url="../api/insertData"
                 const response = await postData({keyId:element.key},url)
                 if(response.personalInfo){
                   
                     await set(element.key,response)
                     
                     fetchData();
                 }

             }

            });

            console.log("doneeeeeee")
          }

          // getValues={data.savedData} preview={true}
          getMissingData();
    }
  }, []);


  return (
    <div>
      { templatesData1.map((data, index) => {

             
        if (data.template === "Template1") {
           const save = { IdData:data.savedData.key , dataType:"oldData" } 
            return (  
          <div key={index}> 
          <div onClick={()=>{ Router.push(`./ResumaForm?id=${data.key}&template=${data.template}`) }}>  <Template1 getValues={data.savedData}  /> </div> 
          
          </div> 
       
          
           ) 
        } 

        else if (data.template === "Template2") {
          const save = { IdData:data.savedData.key , dataType:"oldData" } 
           return (  
         <div key={index}> 
         <div onClick={()=>{ Router.push(`./ResumaForm?id=${data.key}&template=${data.template}`) }}>  <Template2 getValues={data.savedData}  /> </div> 
         
         </div> 
      
         
          ) 
       } 

        
         return null; 
       })} 

       


    </div>
  );
};

export default Page;



"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import Template1 from "../Templates/Template1/page";
//import Template2 from "../Templates/Template2/page";

const SelectTemplate = () => {

  const TemplateData = [ "Template1" , "Template2" ];
  const Router = useRouter();

  return (
    <>
    <div className='flex flex-col items-center'>
       <p className='font-bold text-2xl mt-8'>Select from templates </p>
    <div className='flex md:flex-wrap flex-col md:grid md:grid-cols-6 md:space-x-6 md:grid-rows-4 '>
      {
    TemplateData.map((template,index)=>{ 

      return (

    <img key={index} src={`/${template}.webp`} 
    alt="Resume builder illustration" 
    className=" w-auto h-auto rounded-lg shadow-lg mx-2 my-6 hover:cursor-pointer" 
    onClick={ ()=>{ Router.push(`./ResumaForm?template=${template}`) } }
    />
    )})}
    </div>
    </div>
    </>
  )
}

export default SelectTemplate;

"use client"

import React, { useContext, useState } from 'react'
import Image from 'next/image';
import MyContext from '@/app/Context/MyContext';
const SelectTemplate = () => {

  const { setSelectTemplate } = useContext(MyContext) 
  const TemplateData = [ "Template1" , "Template2" , "Template3" , "Template4" ];
  

  return (
    <>
    <div className='flex flex-col p-6 border-b overflow-hidden ' >
    
  <p className="text-lg ">
   Select template
  </p>

    <div className='grid grid-cols-2 space-x-2  '>
      {
    TemplateData.map((template,index)=>{ 

      return (
    
    <div  key={index}>    
    <Image  src={`/${template}.webp`} 
    alt="Resume builder illustration"
    width={500}
    height={500}
    className="   rounded-lg shadow-lg  my-6 md:w-[150px] md:h-[200px] w-[120px] h-[160px]" 
    onClick={ ()=>{ 
      
      setSelectTemplate(template)
  } }
    />
    </div>
    )})}
    </div>
    
  



    </div>
   
    </>
  )
}

export default SelectTemplate;

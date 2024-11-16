"use client"

import React, { useState } from 'react'
import Name from '../Features/ResumeName/Name';
import Image from 'next/image';
import Footer from '@/components/footer';

const SelectTemplate = () => {

  const[ displayName  , setDisplayName ] = useState(null)
  const TemplateData = [ "Template1" , "Template2" , "Template3" , "Template4" ];
  

  return (
    <>
    { displayName && <div className='flex w-screen justify-center h-screen  items-center fixed ' > <Name name={displayName} /> </div>}
    <div className='flex flex-col md:px-20 px-8 bg-gray-100 ' >
    <div className="mt-8">
    <div className="mt-8">
  <p className="font-bold text-4xl text-gray-800 leading-tight">
    Browse Through Our Template Collection
  </p>
  <p className="text-lg mt-4 text-gray-500 max-w-lg my-4 ">
    Choose from a variety of professionally designed templates to kickstart your project with ease and creativity.
  </p>
</div>

</div>

    <div className='flex md:flex-wrap flex-col md:grid md:grid-cols-3 md:space-x-6  '>
      {
    TemplateData.map((template,index)=>{ 

      return (
    
    <div  key={index}>    
    <Image  src={`/${template}.webp`} 
    alt="Resume builder illustration"
    width={500}
    height={500}
    className="  w-[400px] h-[500px] rounded-lg shadow-lg mx-2 my-6 hover:cursor-pointer" 
    onClick={ ()=>{ 
      
      setDisplayName(template)
  } }
    />
    </div>
    )})}
    </div>
    
  



    </div>
    <Footer/>
    </>
  )
}

export default SelectTemplate;

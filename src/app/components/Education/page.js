
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa'; 
import 'react-quill/dist/quill.snow.css'; 
import { Editor } from '@/app/function/Editor/editor';

const EducationComponent = ({ register, index, removeEducation, setValue, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false); 
  
  
  useEffect(() => {
   
    if (errors.education?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.education, index]); // Dependencies include errors.education and index

  const institutionName = getValues(`education.${index}.institution`) || "Unnamed Institution"; // Default to unnamed if no value

  const handleSummaryChange = (value) => {
    setValue(`education.${index}.summary`, value); // Update the form state
  };

  return (
    <div className="space-y-2 mt-4 shadow-sm bg-white">
      {/* Clickable Div to Show Institution Name */}
      <div
        className="border p-4 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center"
        onClick={() => { setIsVisible(!isVisible) }} // Toggle form visibility on click
      >
        {/* Professional icon (bars) before Institution Name */}
        <FaBars size={20} className="mr-2 text-gray-800" /> {/* Simple icon without color */}

        {/* Institution Name */}
        <h3 className="text-lg font-semibold">{institutionName}</h3>
      </div>

      {/* Education Form, only visible when `isVisible` is true */}
      {isVisible && (
        <div className="border p-4 rounded-md mt-2 shadow-sm bg-white">
          <h3 className="text-lg font-semibold">Education Entry</h3>
          
          <div>
            <label className="block text-sm font-medium">Institution</label>
            <input
              {...register(`education.${index}.institution`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Institution"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Degree</label>
            <input
              {...register(`education.${index}.degree`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Degree"
            />
          </div>

          {/* Flexbox layout for Start Year and End Year */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Start Year</label>
              <input
                type="text"
                {...register(`education.${index}.startYear`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Start Year"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">End Year</label>
              <input
                type="text"
                {...register(`education.${index}.endYear`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="End Year"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Score</label>
            <input
              type="text"
              {...register(`education.${index}.score`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Score (if applicable)"
            />
          </div>

          {/* Summary with Editor */}
          <div>
            <label className="block text-sm font-medium">Summary</label>
            <Editor
              value={getValues(`education.${index}.summary`) ?? ""} // Use nullish coalescing operator
              onChange={handleSummaryChange}
            />
          </div>

          <button
            type="button"
            onClick={() => removeEducation(index)}
            className="flex text-sm items-center justify-center md:w-[20%] w-[70%] py-2 mt-2 border border-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            <span className="ml-2">Remove Education</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationComponent;

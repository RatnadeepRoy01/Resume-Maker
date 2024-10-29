"use client"

import React, { useState,useEffect } from "react";
import { FaBars } from "react-icons/fa"; 
import { Editor } from "@/app/function/Editor/editor"; 

const WorkExperienceComponent = ({ register, index, removeWorkExperience, setValue, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false); // State to toggle visibility of the form
  const companyName = getValues(`workExperience.${index}.company`) || "Unnamed Company"; 

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.workExperience?.[index]) {
      setIsVisible(true);
    }
  }, [errors.workExperience, index]);

  const handleSummaryChange = (value) => {
    setValue(`workExperience.${index}.summary`, value); // Update the form state
  };

  return (
    <div className="space-y-2 mt-4 shadow-sm bg-white">
     
      <div
        className="border p-4 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 flex items-center"
        onClick={() => setIsVisible(!isVisible)} 
      >
       
        <FaBars size={20} className="mr-2 text-gray-800" />

       
        <h3 className="text-lg font-semibold">{companyName}</h3>
      </div>

      {/* Work Experience Form, only visible when `isVisible` is true */}
      {isVisible && (
        <div className="border p-4 rounded-md mt-2 shadow-sm bg-white">
          <h3 className="text-lg font-semibold">Work Experience Entry</h3>

          <div>
            <label className="block text-sm font-medium">Company</label>
            <input
              {...register(`workExperience.${index}.company`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              {...register(`workExperience.${index}.role`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Role"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              {...register(`workExperience.${index}.location`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              {...register(`workExperience.${index}.website`)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Company Website"
            />
          </div>

          {/* Flexbox layout for Start Date and End Date */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="text"
                {...register(`workExperience.${index}.startDate`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Start Date"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="text"
                {...register(`workExperience.${index}.endDate`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="End Date"
              />
            </div>
          </div>

          {/* Summary with Editor */}
          <div>
            <label className="block text-sm font-medium">Summary</label>
            <Editor
              value={getValues(`workExperience.${index}.summary`) ?? ""} // Use nullish coalescing operator
              onChange={handleSummaryChange}
            />
          </div>

          <button
            type="button"
            onClick={() => removeWorkExperience(index)}
            className="bg-red-500 text-sm text-white py-2 rounded-md mt-2 hover:bg-red-600 transition md:w-[20%] w-[70%]"
          >
            Remove Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceComponent;

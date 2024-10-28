
"use client";

import React, { useState,useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the icons
import { Editor } from '@/app/function/Editor/editor'; // Adjust the import path if necessary

const AwardsComponent = ({ register, index, removeAward, setValue, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const awardTitle = getValues(`awards.${index}.award`) || "Unnamed Award";

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.awards?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.awards, index]);

  const handleSummaryChange = (value) => {
    setValue(`awards.${index}.summary`, value);
  };

  return (
    <div className="space-y-4 mt-4 shadow-lg bg-white p-4 rounded-lg transition-shadow hover:shadow-xl border border-gray-400">
      <div 
        className="flex items-center p-3 border-b border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{awardTitle}</h3>

        {/* Close icon inside a circle positioned at the right corner */}
        <div 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent onClick
            removeAward(index);
          }}
          className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 bg-white text-red-500 cursor-pointer hover:bg-red-100"
        >
          <FaTimes size={14} />
        </div>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md bg-white shadow-sm space-y-4">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Award Entry</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Award</label>
            <input
              {...register(`awards.${index}.award`)}
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Award Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Organization</label>
            <input
              {...register(`awards.${index}.organization`)}
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Organization"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              {...register(`awards.${index}.year`)}
              className="w-full mt-1 p-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Date (e.g. YYYY-MM-DD)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <div className='border border-gray-400 rounded-lg'>
            <Editor
              value={getValues(`awards.${index}.summary`) ?? ""}
              onChange={handleSummaryChange}
            />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardsComponent;

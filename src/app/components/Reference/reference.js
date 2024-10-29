"use client"

import React, { useState,useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Editor } from '@/app/function/Editor/editor'; // Adjust the import path as needed

const ReferencesComponent = ({ register, index, removeReference, getValues, setValue, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const referenceName = getValues(`references.${index}.name`) || "Unnamed Reference";

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.references?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.references, index]);

  const handleSummaryChange = (value) => {
    setValue(`references.${index}.summary`, value);
  };

  return (
    <div className="space-y-4 mt-4 shadow-md bg-white p-4 rounded-lg transition-shadow hover:shadow-lg">
      <div 
        className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{referenceName}</h3>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md mt-2 bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Reference Details</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                {...register(`references.${index}.name`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Reference Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register(`references.${index}.email`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Reference Email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                {...register(`references.${index}.position`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Reference Position"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <Editor
                value={getValues(`references.${index}.summary`) ?? ""}
                onChange={handleSummaryChange}
              />
            </div>

            <button
              type="button"
              onClick={() => removeReference(index)}
              className="mt-4 flex items-center justify-center w-full py-2 border border-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              <span className="ml-2">Remove Reference</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferencesComponent;

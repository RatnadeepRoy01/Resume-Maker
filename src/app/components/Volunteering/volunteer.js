"use client"

import React, { useState,useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Editor } from '@/app/function/Editor/editor';

const VolunteeringComponent = ({ register, index, removeVolunteering, setValue, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const volunteeringTitle = getValues(`volunteering.${index}.title`) || "Unnamed Volunteering";

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.volunteering?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.volunteering, index]);

  const handleSummaryChange = (value) => {
    setValue(`volunteering.${index}.summary`, value);
  };

  return (
    <div className="space-y-4 mt-4 shadow-md bg-white p-4 rounded-lg transition-shadow hover:shadow-lg">
      <div 
        className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{volunteeringTitle}</h3>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md mt-2 bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Volunteering Details</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                {...register(`volunteering.${index}.title`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Volunteering Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Organization</label>
              <input
                {...register(`volunteering.${index}.organization`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Organization Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                {...register(`volunteering.${index}.role`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Role"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                {...register(`volunteering.${index}.date`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Date (e.g. YYYY-MM-DD)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                {...register(`volunteering.${index}.website`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Website URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <Editor
                value={getValues(`volunteering.${index}.summary`) ?? ""}
                onChange={handleSummaryChange}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeVolunteering(index)}
            className="mt-4 flex items-center justify-center w-full py-2 border border-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            <span className="ml-2">Remove Volunteering</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default VolunteeringComponent;

"use client"

import React, { useState,useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

const InterestsComponent = ({ register, index, removeInterest, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const interestTitle = getValues(`interests.${index}.title`) || "Unnamed Interest";

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.interests?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.interests, index]);

  return (
    <div className="space-y-4 mt-4 shadow-md bg-white p-4 rounded-lg transition-shadow hover:shadow-lg">
      <div 
        className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{interestTitle}</h3>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md mt-2 bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Interest Entry</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Interest</label>
              <input
                {...register(`interests.${index}.title`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Interest Title"
              />
            </div>

            <button
              type="button"
              onClick={() => removeInterest(index)}
              className="flex text-sm items-center justify-center w-full py-2 mt-2 border border-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              <span className="ml-2">Remove Interest</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestsComponent;

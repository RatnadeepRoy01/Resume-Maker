
"use client";

import React, { useState,useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

const LanguagesComponent = ({ register, index, removeLanguage, setValue, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const languageName = getValues(`languages.${index}.name`) || "Unnamed Language";

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.languages?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.languages, index]);

  return (
    <div className="space-y-4 mt-4 shadow-md bg-white p-4 rounded-lg transition-shadow hover:shadow-lg">
      <div 
        className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{languageName}</h3>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md mt-2 bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Language Entry</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <input
                {...register(`languages.${index}.name`)}
                className="w-full mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Language Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <select
                defaultValue="Beginner"
                {...register(`languages.${index}.level`)}
                className="w-full mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advance">Advance</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="flex text-sm items-center justify-center w-full py-2 mt-2 border border-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              <span className="ml-2">Remove Language</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguagesComponent;

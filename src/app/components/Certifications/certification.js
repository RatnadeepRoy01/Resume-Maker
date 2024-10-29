"use client"

import React, { useState,useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import the icons

const CertificationsComponent = ({ register, index, removeCertification, setValue, getValues,errors }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.certifications?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.certifications, index]);

  const certificationName = getValues(`certifications.${index}.name`) || "Unnamed Certification";

  return (
    <div className="space-y-4 mt-4 shadow-lg bg-white p-4 rounded-lg transition-shadow hover:shadow-xl border border-gray-400">
      <div 
        className="flex items-center p-3 border-b border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{certificationName}</h3>

        {/* Close icon inside a circle positioned at the right corner */}
        <div 
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the parent onClick
            removeCertification(index);
          }}
          className="absolute right-4 flex items-center justify-center w-8 h-8 rounded-full border-2 border-red-500 bg-white text-red-500 cursor-pointer hover:bg-red-100"
        >
          <FaTimes size={14} />
        </div>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md bg-white shadow-sm space-y-4">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Certification Entry</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Certification Name</label>
            <input
              {...register(`certifications.${index}.certification`)}
              className="w-full mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Certification Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Issuer</label>
            <input
              {...register(`certifications.${index}.issuer`)}
              className="w-full mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Issuer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Date</label>
            <input
              type="text"
              {...register(`certifications.${index}.issueDate`)}
              className="w-full mt-1 p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Enter Date (e.g. YYYY-MM-DD)'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificationsComponent;

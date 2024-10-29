"use client"

import React, { useState,useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { Editor } from '@/app/function/Editor/editor';

const ProjectsComponent = ({ register, index, removeProject, setValue, getValues, errors }) => {
  const [isVisible, setIsVisible] = useState(false);
  const projectTitle = getValues(`projects.${index}.title`) || "Unnamed Project";

  useEffect(() => {
    // Check for errors and set visibility accordingly
    if (errors.projects?.[index]) {
      setIsVisible(true);
    } 
  }, [errors.projects, index]);

  const handleSummaryChange = (value) => {
    setValue(`projects.${index}.summary`, value);
  };

  return (
    <div className="space-y-4 mt-4 shadow-md bg-white p-4 rounded-lg transition-shadow hover:shadow-lg">
      <div 
        className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaBars size={20} className="mr-2 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-800">{projectTitle}</h3>
      </div>

      {isVisible && (
        <div className="border border-gray-200 p-4 rounded-md mt-2 bg-white shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Project Details</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Title</label>
              <input
                {...register(`projects.${index}.title`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Project Title"
              />
            </div>

            <div className="flex md:space-x-4 flex-col md:flex-row ">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="text"
                  {...register(`projects.${index}.startDate`)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Start Date (e.g. YYYY-MM-DD)"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="text"
                  {...register(`projects.${index}.endDate`)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter End Date (e.g. YYYY-MM-DD)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website/Repository</label>
              <input
                {...register(`projects.${index}.website`)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Project Website or Repository"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Summary</label>
              <Editor
                value={getValues(`projects.${index}.summary`) ?? ""}
                onChange={handleSummaryChange}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => removeProject(index)}
            className="mt-4 flex items-center justify-center w-full py-2 border border-red-500 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          >
            <span className="ml-2">Remove Project</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsComponent;

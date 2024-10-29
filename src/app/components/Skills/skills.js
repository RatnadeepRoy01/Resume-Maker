"use client"

import React from "react";

const SkillsComponent = ({ register, index, removeSkill }) => (
  <div className="space-y-4 border p-4 rounded-md mt-4 shadow-md bg-white">
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Skill</label>
      <input
        {...register(`skills.${index}.name`)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your skill"
      />
    </div>

    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Proficiency Level</label>
      <select
        {...register(`skills.${index}.level`)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled selected>Select proficiency level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="expert">Expert</option>
      </select>
    </div>

    <div className="flex mt-4">
      <button
        type="button"
        onClick={() => removeSkill(index)}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 md:w-[20%] text-sm w-[70%] rounded-md transition duration-300 ease-in-out"
      >
        Remove Skill
      </button>
    </div>
  </div>
);

export default SkillsComponent;

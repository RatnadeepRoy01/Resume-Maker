"use client"

import React, { useContext, useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineHome, AiOutlineLink, AiOutlineGithub, AiOutlineGlobal } from "react-icons/ai";
import { BsCardText } from "react-icons/bs"; // For headline icon
import { Editor } from "@/app/function/Editor/editor"; // Import the Editor component
import MyContext from "../Context/MyContext";
import Image from "next/image";

const PersonalInfoComponent = ({ register, setValue, getValues,errors }) => {
  const {profilePic , setProfilePic} = useContext(MyContext);
  

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleaddressChange = (content) => {
    setValue("personalInfo.summary", content); // Update the address in form state
  };

  return (
    <div className="space-y-6 border p-6 rounded-md bg-white shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Personal Information</h2>

      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <label className="w-32 md:h-32 h-20  bg-gray-200 border border-gray-300 rounded-full overflow-hidden cursor-pointer">
          {profilePic ? (
          <Image 
           src={profilePic} 
           alt="Profile"
           width={500}
           height={500}  
           objectFit="cover"
           className="rounded-lg" 
       />
          ) : (
            <div className="flex items-center justify-center h-full">
              <AiOutlineUser className="text-6xl text-gray-400" />
            </div>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </label>
        <p className="text-gray-600">Click to upload a profile picture</p>
      </div>

      {/* Full Name */}
      <div>
        <label className="text-sm font-medium flex items-center space-x-2">
          <AiOutlineUser className="text-gray-500" />
          <span>Full Name</span>
        </label>
        <input
          {...register("personalInfo.fullName")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="John Doe"
        />
      </div>

      <div className="text-red-500">
        {errors.personalInfo?.fullName&& (
          <p>{errors.personalInfo.fullName.message}</p>
        )} </div>

      {/* Headline */}
      <div>
        <label className=" text-sm font-medium flex items-center space-x-2">
          <BsCardText className="text-gray-500" />
          <span>Headline</span>
        </label>
        <input
          {...register("personalInfo.headline")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="Full Stack Developer | React | Node.js"
        />
      </div>

      {errors.personalInfo?.headline && <p className="text-red-500">{errors.personalInfo.headline.message}</p>}

      {/* Email */}
      <div>
        <label className=" text-sm font-medium flex items-center space-x-2">
          <AiOutlineMail className="text-gray-500" />
          <span>Email</span>
        </label>
        <input
          type="email"
          {...register("personalInfo.email")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="email@example.com"
        />
      </div>

      {errors.personalInfo?.email && <p className="text-red-500" >{errors.personalInfo.email.message}</p>}

      {/* Phone Number */}
      <div>
        <label className=" text-sm font-medium flex items-center space-x-2">
          <AiOutlinePhone className="text-gray-500" />
          <span>Phone Number</span>
        </label>
        <input
          type="tel"
          {...register("personalInfo.phoneNumber")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="+123456789"
        />
      </div>

      {errors.personalInfo?.phoneNumber && <p className="text-red-500">{errors.personalInfo.phoneNumber.message}</p>}

      {/* Website */}
      <div>
        <label className="text-sm font-medium flex items-center space-x-2">
          <AiOutlineGlobal className="text-gray-500" />
          <span>Website</span>
        </label>
        <input
          type="url"
          {...register("personalInfo.website")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="https://yourwebsite.com"
        />
      </div>

      {errors.personalInfo?.website && <p className="text-red-500">{errors.personalInfo.website.message}</p>}

      {/* Location */}
      <div>
        <label className=" text-sm font-medium flex items-center space-x-2">
          <AiOutlineHome className="text-gray-500" />
          <span>Location</span>
        </label>
        <input
          {...register("personalInfo.address")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="City, Country"
        />
      </div>

      {errors.personalInfo?.address && <p className="text-red-500">{errors.personalInfo.address.message}</p>}

      {/* LinkedIn */}
      <div>
        <label className=" text-sm font-medium flex items-center space-x-2">
          <AiOutlineLink className="text-gray-500" />
          <span>LinkedIn</span>
        </label>
        <input
          type="url"
          {...register("personalInfo.linkedIn")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      {errors.personalInfo?.linkedIn && <p className="text-red-500">{errors.personalInfo.linkedIn.message}</p>}

      {/* GitHub */}
      <div>
        <label className=" text-sm font-medium flex items-center space-x-2">
          <AiOutlineGithub className="text-gray-500" />
          <span>GitHub</span>
        </label>
        <input
          type="url"
          {...register("personalInfo.github")}
          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          placeholder="https://github.com/username"
        />
      </div>

      {errors.personalInfo?.github && <p className="text-red-500">{errors.personalInfo.github.message}</p>}

      {/* summary with Editor */}
      <div>
        <label className="block text-sm font-medium">summary</label>
        <Editor
         value={getValues("personalInfo.summary") ?? ""} // Use nullish coalescing operator
         onChange={handleaddressChange}
         />
      </div>
      {errors.personalInfo?.summary && <p className="text-red-500">{errors.personalInfo.summary.message}</p>}
    </div>
  );
};

export default PersonalInfoComponent;


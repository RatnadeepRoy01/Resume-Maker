"use client";
import React, { useContext } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa"; // Import icons from react-icons
import MyContext from "@/app/Context/MyContext";

export default function PersonalInfo1({ personalInfo, styles , fontSubset , stylesExtra }) {
  const { profilePic } = useContext(MyContext);
   console.log({stylesExtra})
  return (
    <div className="flex items-start gap-4 p-4  rounded-lg items-center bg-white w-[100%] " style={stylesExtra} >
      {/* Left: Profile Image */}
      {profilePic && (
        <div
          className={`w-[150px] h-[150px] rounded-full shadow-md overflow-hidden bg-cover bg-center ${fontSubset} `}
           style={{
            backgroundImage: `url(${profilePic})`, // Dynamically set the background image
          }}
        ></div>
      )}

      <div className="w-[80%]">
        <div className=" break-words mb-2 ">
          <p className={styles.name.name} style={{ fontSize: styles.name.nameStyle }}>{personalInfo.fullName}</p>
          <p className={styles.title.title} style={{ fontSize: styles.title.tileStyle }}>{personalInfo.headline}</p>
          <div className={styles.text.text} style={{fontSize:styles.text.textStyle}} dangerouslySetInnerHTML={{ __html:personalInfo.summary }}></div>
        </div>
       
        {/* Right: Contact Information */}
        <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-gray-600 w-4 h-4" />
            <p className="text-gray-600" style={{color:stylesExtra.color }}>{personalInfo.phoneNumber}</p>
          </div>

          <div className="flex items-center gap-1">
            <FaEnvelope className="text-gray-600 w-4 h-4" />
            <p className="text-gray-600"style={{color:stylesExtra.color }} >{personalInfo.email}</p>
          </div>

          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-gray-600 w-4 h-4" />
            <p className="text-gray-600"style={{color:stylesExtra.color }}>{personalInfo.address}</p>
          </div>

          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <FaGlobe className="text-gray-600 w-4 h-4" />
              <p className="text-blue-600 underline cursor-pointer"style={{color:stylesExtra.color }}>{personalInfo.website}</p>
            </div>
          )}

          {personalInfo.linkedIn && (
            <div className="flex items-center gap-1">
              <FaLinkedin className="text-gray-600 w-4 h-4" />
              <p className="text-blue-600 underline cursor-pointer"style={{color:stylesExtra.color }}>{personalInfo.linkedIn}</p>
            </div>
          )}

          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <FaGithub className="text-gray-600 w-4 h-4" />
              <p className="text-blue-600 underline cursor-pointer"style={{color:stylesExtra.color }}>{personalInfo.github}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

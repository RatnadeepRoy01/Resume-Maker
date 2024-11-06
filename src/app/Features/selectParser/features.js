"use client";
import React, { useState,useRef , useContext,useEffect} from "react";
import { Upload, PlusCircle } from "lucide-react";
import Image from "next/image";
import { getUserData } from "@/app/function/matching";
import MyContext from "@/app/components/Context/MyContext";
import { useRouter } from "next/navigation";

const SelectParser = () => {
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const { userData1 , setUserData1 }= useContext(MyContext);
  const Router = useRouter();
  const ref = useRef();

  const options = [
    {
      icon: <Upload className="w-8 h-8 text-blue-500" />,
      title: "Import my resume",
      description: "We will reformat and fill in your information to save your time.",
    },
    {
      icon: (
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          width={40} // Adjusted width for better visibility
          height={40} // Adjusted height for better visibility
          alt="LinkedIn logo"
          className="w-8 h-8"
        />
      ),
      title: "Import resume from LinkedIn",
      description: "We will reformat and fill in your information to save your time.",
    },
    {
      icon: <PlusCircle className="w-8 h-8 text-blue-500" />,
      title: "Create a new resume",
      description: "We will help you build a resume step-by-step.",
    },
  ];

  // Handle file input change

  const handleFileChange = async (event) => {
    
     Router.push("./SelectTemplate")

    const selectedFile = event.target.files[0];

    console.log("selectedFile",selectedFile)
    
    if (selectedFile) {

      const formData = new FormData();
      formData.append("file",selectedFile)  
  
      try {
        
          const response = await fetch("../../api/resumeParser",{
          method:"POST",
          body:formData
        })
        
        const response1 = await response.json();
       
        const data = await getUserData(response1);

        function collectPersonalInfo(obj) {
          const personalInfo = {};
        
          for (const key in obj) {
            if (typeof obj[key] !== 'object' || obj[key] === null) {
              personalInfo[key] = obj[key];
              delete obj[key];
            }
          }
        
          obj.personalInfo = personalInfo;
          return obj;
        }

        const filteredData = await collectPersonalInfo(data)
        setUserData1(filteredData);
        console.log("Uploaded file:", selectedFile); // Handle the file as needed
      
      } catch (error) {
        console.error("Error:", error);
      }
    
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 md:bg-transparent ">
      {/* Centered Card Container with shadow */}
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-8 max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">How do you want to start?</h1>
          <p className="text-gray-600">
            Build a free resume that gets you interviewed by employers
          </p>
        </div>

        {/* Options as grid on mobile, single column on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <div
              key={index}
              className="group relative bg-gray-50 rounded-lg p-6 flex flex-col items-center 
                         border border-gray-200 hover:shadow-lg transition-all duration-300 
                         ease-in-out transform hover:-translate-y-1 cursor-pointer"
              onClick={() => (option.title === "Import resume from LinkedIn" || option.title === "Import my resume") && ref.current.click()} // Click to upload
            >
              {/* Icon Container */}
              <div
                className="p-4 bg-blue-50 rounded-full group-hover:bg-blue-100
                              transition-colors duration-300"
              >
                {option.icon}
              </div>

              {/* Text Content */}
              <div className="text-center space-y-3 mt-4">
                <h3 className="text-xl font-medium">{option.title}</h3>
                <p className="text-gray-500 text-sm">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* File Input (hidden) */}
        <input
          type="file"
          accept=".pdf,.doc,.docx" // Specify accepted file types
          onChange={handleFileChange}
          ref={ref}
          className="hidden" // Hide the input element
        />

        {/* Display the uploaded file name */}
        {file && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Uploaded file: {file.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectParser;

"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../style.css"
import {
  Diamond,
  Star,
  Rocket,
  Sparkles,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

const decorativeIcons = [Diamond, Star, Rocket, Sparkles];
const animatedTexts = [
   
        "Scanning resume for essential data...",
        "Extracting personal details from the document...",
        "Parsing work experience and job titles...",
        "Analyzing skills and qualifications for relevant matches...",
        "Identifying key achievements and job responsibilities...",
        "Extracting educational background information...",
        "Parsing certifications and specialized training...",
        "Identifying contact details and relevant social links...",
        "Cross-checking data against resume formatting...",
        "Finalizing extraction process, preparing data for analysis..."
      
      
];

const LoadingProgress = ({loaded}) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("loading");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [ warningTime , setWarningTime ] = useState(20000)
  const [  retryTime , setRetryTime ] = useState(25000)   
  const Router = useRouter();
  useEffect(()=>{ if(loaded?.personalInfo ) { setWarningTime(35000) ; setRetryTime(35000) ; setProgress(100) } },[loaded])

  useEffect(() => {
    const maxDuration = 30000; // 30 seconds

    // Progress Interval
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / (maxDuration / 50)), 100));
    }, 50);
  
    // Cleanup for Progress Interval
    return () => clearInterval(progressInterval);
  }, []); // Only run once on mount
  
  useEffect(() => {
   
    const textIconInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) );
      setCurrentIconIndex((prev) => (prev + 1) % decorativeIcons.length);
     
    }, 3000);
  
    
    return () => clearInterval(textIconInterval);
  }, [ setCurrentTextIndex , setCurrentIconIndex ]); 
  
  useEffect(() => {
    
  
    if (progress >= warningTime / 300) {
      setStatus("warning");
    }
  
    if (progress >= retryTime / 300) {
      setStatus("timeout");
    }
  }, [progress , retryTime , warningTime ]); // Re-run only when progress changes
  

  const handleRetry = () => {
    setProgress(0);
    setStatus("loading");
  };

  const handleBack = () => {
    console.log("Navigate back");
     Router.push("/")
  };

  if (status === "timeout") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 text-center w-full max-w-xl">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <h2 className="text-lg font-bold text-red-600 mb-4">
            Loading Timeout
          </h2>
          <p className="text-gray-700 mb-6">The process is taking too long.</p>
          <div className="flex justify-center space-x-4">
            {/* <button
              onClick={handleRetry}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              <RefreshCw className="mr-2" size={20} />
              Retry
            </button> */}
            <button
              onClick={handleBack}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full flex items-center"
            >
              <ChevronLeft className="mr-2" size={20} />
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const CurrentIcon = decorativeIcons[currentIconIndex];

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-white rounded-2xl p-4 flex flex-col items-center w-full max-w-4xl ">
        {/* Image at the top */}
        <div className="mb-6 w-[60%] md:w-[30%]  ">
          
           <div className="wrapper">
    <div className="box-wrap">
        <div className="box one"></div>
        <div className="box two"></div>
        <div className="box three"></div>
        <div className="box four"></div>
        <div className="box five"></div>
        <div className="box six"></div>
    </div>
</div>

        </div>

        {/* Icon and Progress Bar */}
        <div className="flex w-full relative top-28">
          {/* Icon at the left */}
          <div className="mr-4 ">
            <CurrentIcon className="text-purple-600" size={32} />
          </div>

          {/* Progress Bar and Text */}
          <div className="w-full">
            <div className="bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  ease: "linear",
                }}
              />
            </div>

            <div className="text-center text-gray-700 font-medium">
             
           

              <motion.p
                key={currentTextIndex}
                className="text-lg "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {animatedTexts[currentTextIndex]}
              </motion.p>
             
              <p className="text-sm text-gray-500 mt-2">
                {Math.floor(progress)}% Completed
              </p>

            </div>

            {status === "warning" && (
              <div className="text-center text-yellow-600 font-bold mt-4">
                  This is taking longer than expected...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProgress;
